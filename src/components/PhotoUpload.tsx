import { memo, useCallback, useEffect, useRef, useState } from "react";

// Cloudflare Worker that streams each file straight into the R2 bucket.
// Source lives in worker/ — deploy it with `wrangler deploy` from there.
const UPLOAD_URL = "https://wedding-photos-natalia-zhivko.valsodark.workers.dev";

// Workers cap a request body at 100MB. Files go up as-is — no base64 —
// so this is the real file size.
const MAX_MB = 95;
// One at a time. Two was no faster on venue wifi and doubled peak memory.
const CONCURRENCY = 1;
// Give up on a file only when the bytes actually stop moving.
const STALL_MS = 90000;
// Tile thumbnails are drawn this wide, never at the photo's real size.
const THUMB_PX = 220;

type Status = "queued" | "sending" | "done" | "failed";

type Item = {
    id: number;
    uploadId: string;
    file: File;
    mime: string;
    status: Status;
    progress: number;
    tries: number;
    thumbUrl: string | null;
    thumbFailed: boolean;
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const uid = () =>
    crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// Bulgarian counts a masculine noun with its own count form: 1 файл, 2 файла
const files = (n: number) => (n === 1 ? "1 файл" : `${n} файла`);

const size = (b: number) =>
    b < 1048576
        ? `${Math.max(1, Math.round(b / 1024))} KB`
        : `${(b / 1048576).toFixed(1)} MB`;

// Some Android pickers hand back a File with an empty type, and a dragged file
// often has none either. Guessing from the extension keeps those uploads alive;
// without it the Worker answers 415 and the guest watches three doomed retries.
const EXT_TYPES: Record<string, string> = {
    jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif",
    webp: "image/webp", heic: "image/heic", heif: "image/heif", avif: "image/avif",
    mp4: "video/mp4", mov: "video/quicktime", m4v: "video/x-m4v",
    "3gp": "video/3gpp", avi: "video/x-msvideo", mkv: "video/x-matroska", webm: "video/webm",
};

function mimeOf(file: File) {
    if (file.type) return file.type;
    const ext = (file.name.split(".").pop() || "").toLowerCase();
    return EXT_TYPES[ext] || "";
}

// Shrink before the picture ever reaches the DOM. Handing an <img> the original
// file means a dozen 12-megapixel photos sit in memory fully decoded, which is
// hundreds of megabytes on a phone and enough to lose the tab.
async function imageThumb(file: File): Promise<string | null> {
    try {
        const bmp = await createImageBitmap(file, {
            resizeWidth: THUMB_PX,
            resizeQuality: "low",
            // an <img> applies EXIF rotation on its own; a canvas does not, and
            // iPhone portraits would come out sideways without this
            imageOrientation: "from-image",
        });
        const c = document.createElement("canvas");
        c.width = bmp.width;
        c.height = bmp.height;
        c.getContext("2d")?.drawImage(bmp, 0, 0);
        bmp.close();
        return await new Promise<string | null>((done) =>
            c.toBlob((b) => done(b ? URL.createObjectURL(b) : null), "image/jpeg", 0.72)
        );
    } catch {
        // older Safari lacks the resize options — full size, but still a picture
        return URL.createObjectURL(file);
    }
}

// grab a frame a moment in, so the poster isn't a black first frame
function videoThumb(file: File): Promise<string | null> {
    return new Promise((resolve) => {
        const src = URL.createObjectURL(file);
        const v = document.createElement("video");
        let settled = false;
        const done = (url: string | null) => {
            if (settled) return;
            settled = true;
            URL.revokeObjectURL(src);
            resolve(url);
        };

        v.preload = "metadata";
        v.muted = true;
        v.playsInline = true;
        v.src = src;
        v.addEventListener("loadeddata", () => {
            v.currentTime = Math.min(0.5, (v.duration || 2) / 4);
        });
        v.addEventListener("seeked", () => {
            try {
                const c = document.createElement("canvas");
                c.width = 200;
                c.height = Math.round(200 * (v.videoHeight / v.videoWidth)) || 200;
                c.getContext("2d")?.drawImage(v, 0, 0, c.width, c.height);
                c.toBlob((b) => done(b ? URL.createObjectURL(b) : null), "image/jpeg", 0.8);
            } catch {
                done(null);
            }
        });
        v.addEventListener("error", () => done(null));
        setTimeout(() => done(null), 5000);
    });
}

function makeThumb(file: File, mime: string) {
    if (mime.startsWith("image/")) return imageThumb(file);
    if (mime.startsWith("video/")) return videoThumb(file);
    return Promise.resolve(null);
}

type TileProps = {
    index: number;
    name: string;
    mime: string;
    status: Status;
    progress: number;
    thumbUrl: string | null;
    thumbFailed: boolean;
    onRemove: () => void;
    onRetry: () => void;
};

// Primitive props only, so a progress tick re-renders one tile and not the sheet.
const Tile = memo(function Tile({
    index, name, mime, status, progress, thumbUrl, thumbFailed, onRemove, onRetry,
}: TileProps) {
    const pct = Math.round(progress * 100);
    // a failed photo goes back to undeveloped, so half-filled never reads as half-sent
    const shown = status === "failed" ? 0 : pct;

    const state =
        status === "done" ? "изпратена"
            : status === "failed" ? "не се изпрати"
                : status === "sending" ? `изпратени ${pct} процента`
                    : "готова за изпращане";

    return (
        <li
            className={`relative aspect-square overflow-hidden rounded-box bg-base-300 border ${
                status === "failed" ? "border-error" : "border-base-300"
            }`}
            aria-label={`${name}, ${state}`}
        >
            {thumbUrl && !thumbFailed ? (
                <>
                    {/* undeveloped */}
                    <img
                        src={thumbUrl}
                        alt=""
                        className={`absolute inset-0 h-full w-full object-cover grayscale ${
                            status === "failed" ? "opacity-15" : "opacity-25"
                        }`}
                    />
                    {/* developed layer, revealed bottom-up as the file goes up */}
                    <img
                        src={thumbUrl}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-[clip-path] duration-200 ease-linear"
                        style={{ clipPath: `inset(${100 - shown}% 0 0 0)` }}
                    />
                </>
            ) : (
                <span className="absolute inset-0 grid place-items-center text-2xl text-base-content/40">
                    {mime.startsWith("video") ? "▶" : "▨"}
                </span>
            )}

            {/* the number sits on its own chip so it reads on a pale tile and on a
                finished photo alike */}
            <span className="absolute top-1 left-1 rounded px-1.5 py-px text-[0.6rem] bg-base-200/90 text-base-content">
                {String(index + 1).padStart(2, "0")}
            </span>

            {status !== "done" && (
                <div
                    className="absolute inset-x-0 bottom-0 h-1 bg-base-200/80"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                >
                    <i
                        className="block h-full bg-primary-content transition-[width] duration-200 ease-linear"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            )}

            {status === "done" && (
                <span
                    className="absolute right-1 bottom-1 grid h-5 w-5 place-items-center rounded-full bg-neutral text-[11px] text-neutral-content"
                    aria-hidden="true"
                >
                    ✓
                </span>
            )}

            {status === "queued" && (
                <button
                    type="button"
                    onClick={onRemove}
                    aria-label={`Премахнете ${name}`}
                    className="btn btn-circle btn-xs absolute top-1 right-1 border-none bg-base-200/90 text-base-content hover:bg-error hover:text-error-content"
                >
                    ×
                </button>
            )}

            {status === "failed" && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="btn btn-xs btn-error absolute inset-x-0 bottom-0 w-full rounded-none"
                >
                    Отново
                </button>
            )}
        </li>
    );
});

export function PhotoUpload() {
    // The ref is the source of truth: the send loop runs across awaits and must
    // see removals the guest makes while a file is in flight.
    const itemsRef = useRef<Item[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [sending, setSending] = useState(false);
    const [rejected, setRejected] = useState("");
    const nextId = useRef(1);
    const sendingRef = useRef(false);
    const fileInput = useRef<HTMLInputElement | null>(null);
    const guestName = useRef<HTMLInputElement | null>(null);
    const [dragging, setDragging] = useState(false);

    const sync = useCallback(() => setItems(itemsRef.current.slice()), []);

    // Guests hit send and put the phone in their pocket. The screen locks, the
    // tab is suspended, and the upload stalls with no way for them to know why.
    const wakeLock = useRef<any>(null);
    const wakeLockPending = useRef(false);

    const keepAwake = useCallback(async (on: boolean) => {
        const nav = navigator as any;
        try {
            if (on) {
                // the pending flag matters: run() and visibilitychange can both ask
                // at once, and two awaited requests would leave the first sentinel
                // held for the rest of the visit
                if (!("wakeLock" in nav) || wakeLock.current || wakeLockPending.current) return;
                wakeLockPending.current = true;
                try {
                    wakeLock.current = await nav.wakeLock.request("screen");
                } finally {
                    wakeLockPending.current = false;
                }
                wakeLock.current?.addEventListener("release", () => {
                    wakeLock.current = null;
                });
                // the send may have finished while the request was in flight
                if (!sendingRef.current) await keepAwake(false);
            } else if (wakeLock.current) {
                const held = wakeLock.current;
                wakeLock.current = null;
                await held.release();
            }
        } catch {
            // unsupported or refused — the copy in step 03 is the fallback
        }
    }, []);

    useEffect(() => {
        // the lock is dropped whenever the tab goes to the background, so take it back
        const onVisible = () => {
            if (document.visibilityState === "visible" && sendingRef.current) keepAwake(true);
        };
        const onLeave = (e: BeforeUnloadEvent) => {
            if (sendingRef.current) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        document.addEventListener("visibilitychange", onVisible);
        window.addEventListener("beforeunload", onLeave);
        return () => {
            document.removeEventListener("visibilitychange", onVisible);
            window.removeEventListener("beforeunload", onLeave);
            itemsRef.current.forEach((i) => i.thumbUrl && URL.revokeObjectURL(i.thumbUrl));
            keepAwake(false);
        };
    }, [keepAwake]);

    /* ---------- picking ---------- */

    const addFiles = useCallback(
        (list: FileList | null) => {
            if (!list) return;
            const tooBig: string[] = [];
            const wrongKind: string[] = [];

            for (const file of Array.from(list)) {
                const mime = mimeOf(file);
                // reject here rather than let the Worker refuse it three retries later
                if (!/^(image|video)\//.test(mime)) {
                    wrongKind.push(file.name);
                    continue;
                }
                if (file.size > MAX_MB * 1024 * 1024) {
                    tooBig.push(file.name);
                    continue;
                }
                // same name and size twice means the picker was opened twice
                if (itemsRef.current.some((i) => i.file.name === file.name && i.file.size === file.size))
                    continue;

                // uploadId is minted once and reused on every retry, so a retry
                // overwrites the earlier attempt in R2 instead of duplicating it
                const item: Item = {
                    id: nextId.current++,
                    uploadId: uid(),
                    file,
                    mime,
                    status: "queued",
                    progress: 0,
                    tries: 0,
                    thumbUrl: null,
                    thumbFailed: false,
                };
                itemsRef.current.push(item);

                makeThumb(file, mime).then((url) => {
                    // the guest may have removed this tile while it was being made
                    if (!itemsRef.current.includes(item)) {
                        if (url) URL.revokeObjectURL(url);
                        return;
                    }
                    if (!url) item.thumbFailed = true;
                    else item.thumbUrl = url;
                    sync();
                });
            }

            // rebuilt on every pick, so the notice always describes the latest attempt
            const lines: string[] = [];
            if (tooBig.length) {
                lines.push(
                    tooBig.length === 1
                        ? `„${tooBig[0]}“ е над ${MAX_MB}MB и не може да се изпрати.`
                        : `${files(tooBig.length)} са над ${MAX_MB}MB и не могат да се изпратят.`
                );
            }
            if (wrongKind.length) {
                lines.push(
                    wrongKind.length === 1
                        ? `„${wrongKind[0]}“ не е снимка или видео.`
                        : `${files(wrongKind.length)} не са снимки или видео.`
                );
            }
            setRejected(lines.join(" "));
            sync();
        },
        [sync]
    );

    const removeItem = useCallback(
        (item: Item) => {
            if (item.thumbUrl) URL.revokeObjectURL(item.thumbUrl);
            itemsRef.current = itemsRef.current.filter((i) => i !== item);
            sync();
        },
        [sync]
    );

    /* ---------- sending ---------- */

    const post = useCallback((item: Item, onProgress: (p: number) => void) => {
        return new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            let lastMoved = Date.now();
            let watchdog = 0;
            const stop = () => clearInterval(watchdog);

            xhr.open("PUT", UPLOAD_URL, true);
            xhr.setRequestHeader("Content-Type", item.mime);
            // header values are Latin-1 only, so Cyrillic has to be percent-encoded
            xhr.setRequestHeader(
                "x-guest",
                encodeURIComponent(guestName.current?.value.trim() || "Гост")
            );
            xhr.setRequestHeader("x-filename", encodeURIComponent(item.file.name));
            xhr.setRequestHeader("x-upload-id", item.uploadId);

            xhr.upload.onprogress = (e) => {
                lastMoved = Date.now();
                if (e.lengthComputable) onProgress(e.loaded / e.total);
            };

            xhr.onload = () => {
                stop();
                let json: any;
                try {
                    json = JSON.parse(xhr.responseText);
                } catch {
                    // a captive portal answers with its own login page, not our JSON
                    return reject(
                        new Error(
                            /<html/i.test(xhr.responseText)
                                ? "Мрежата иска вход. Опитайте с мобилни данни."
                                : "Неразбираем отговор от сървъра"
                        )
                    );
                }
                if (json.success) resolve();
                else reject(new Error(json.error || "Файлът беше отказан"));
            };
            xhr.onerror = () => {
                stop();
                reject(new Error("Връзката прекъсна"));
            };
            xhr.onabort = () => {
                stop();
                reject(new Error("Качването спря"));
            };

            // No fixed deadline: a big video on slow wifi is fine as long as bytes
            // keep moving. Only a genuine stall ends it.
            watchdog = setInterval(() => {
                if (Date.now() - lastMoved > STALL_MS) xhr.abort();
            }, 5000);

            xhr.send(item.file);
        });
    }, []);

    const send = useCallback(
        async (item: Item): Promise<void> => {
            // run() took a snapshot of the queue, so a photo the guest removed while
            // it was waiting is still in that snapshot. Without this it uploads anyway.
            if (!itemsRef.current.includes(item)) return;

            item.status = "sending";
            item.progress = 0;
            sync();

            try {
                let shown = -1;
                await post(item, (p) => {
                    item.progress = p;
                    // one repaint per whole percent, not per packet
                    const pct = Math.round(p * 100);
                    if (pct !== shown) {
                        shown = pct;
                        sync();
                    }
                });
                item.status = "done";
                item.progress = 1;
            } catch (err) {
                item.tries++;
                if (item.tries < 3) {
                    // back off before retrying — an instant retry during a burst of
                    // guests just adds to the burst, and venue wifi usually recovers
                    item.status = "queued";
                    item.progress = 0;
                    sync();
                    await wait(1000 * 2 ** item.tries + Math.random() * 800);
                    return send(item);
                }
                item.status = "failed";
                console.error(err);
            }
            sync();
        },
        [post, sync]
    );

    const run = useCallback(async () => {
        if (sendingRef.current) return;
        const queue = itemsRef.current.filter((i) => i.status === "queued");
        if (!queue.length) return;

        sendingRef.current = true;
        setSending(true);
        keepAwake(true);

        let cursor = 0;
        await Promise.all(
            Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
                while (cursor < queue.length) await send(queue[cursor++]);
            })
        );

        sendingRef.current = false;
        setSending(false);
        keepAwake(false);
        sync();
    }, [keepAwake, send, sync]);

    /* ---------- chrome ---------- */

    const total = items.length;
    const queued = items.filter((i) => i.status === "queued").length;
    const done = items.filter((i) => i.status === "done").length;
    const failed = items.filter((i) => i.status === "failed").length;
    const bytes = items.reduce((n, i) => n + i.file.size, 0);

    // one button, always showing the next thing worth doing
    const mode: "busy" | "send" | "more" = sending
        ? "busy"
        : failed || queued
            ? "send"
            : done
                ? "more"
                : "busy";

    const label = sending
        ? `Изпращане… ${done} от ${total}`
        : failed
            ? "Опитайте отново"
            : queued
                ? `Изпратете ${files(queued)}`
                : done
                    ? "Добавете още снимки"
                    : "Първо изберете снимки";

    const onSend = () => {
        if (mode === "more") {
            fileInput.current?.click();
            return;
        }
        itemsRef.current
            .filter((i) => i.status === "failed")
            .forEach((i) => {
                i.status = "queued";
                i.tries = 0;
                i.progress = 0;
            });
        sync();
        run();
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="fieldset w-full max-w-lg bg-base-200 border border-base-300 rounded-lg p-6 lg:text-2xl">
                <h2 className="text-lg lg:text-3xl font-bold mb-4">Вашите снимки от сватбата</h2>

                <span className="text-[19px] text-left block mb-4">
                    Изпратете ни снимките и клиповете от телефона си – те отиват директно в общия ни албум.
                </span>

                <ol className="mb-6 flex flex-col gap-2 text-[17px]">
                    <li><span className="font-bold text-primary-content">01</span> Напишете името си</li>
                    <li><span className="font-bold text-primary-content">02</span> Изберете снимките от телефона си</li>
                    <li>
                        <span className="font-bold text-primary-content">03</span> Натиснете „Изпратете“ и изчакайте
                        снимките да се оцветят. Не заключвайте телефона.
                    </li>
                </ol>

                <label className="label font-bold">Вашето име</label>
                <input
                    ref={guestName}
                    className="input lg:input-xl mb-1 w-full"
                    type="text"
                    placeholder="Мария"
                    autoComplete="name"
                />
                <span className="text-[16px] mb-4 block">За да знаем на кого да благодарим.</span>

                <label className="label font-bold">Снимки и видео</label>
                <button
                    type="button"
                    onClick={() => fileInput.current?.click()}
                    onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        addFiles(e.dataTransfer.files);
                    }}
                    className={`w-full rounded-box border border-dashed text-center transition-colors cursor-pointer px-5 ${
                        dragging ? "border-secondary bg-base-300" : "border-neutral bg-base-100 hover:bg-base-300"
                    } ${total ? "py-3" : "py-8"}`}
                >
                    {!total && (
                        <span className="mx-auto mb-3 block h-8 w-8 rounded-full border-2 border-primary-content" />
                    )}
                    <b className="block">
                        {total ? "Добавете още снимки или видео" : "Изберете снимки или видео"}
                    </b>
                    {!total && (
                        <span className="block text-[16px] mt-1">
                            Натиснете тук, за да ги изберете от телефона си
                        </span>
                    )}
                </button>
                <input
                    ref={fileInput}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                        addFiles(e.target.files);
                        e.target.value = "";
                    }}
                />

                {rejected && <p className="mt-3 text-[17px] text-error">{rejected}</p>}

                {total > 0 && (
                    <section className="mt-6" aria-label="Избрани кадри">
                        <div className="flex items-baseline justify-between border-b border-base-300 pb-2 mb-3 text-[17px]">
                            <span>Кадри</span>
                            <span className="font-bold">{String(total).padStart(2, "0")}</span>
                        </div>

                        <ul className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2 list-none p-0 m-0">
                            {items.map((item, i) => (
                                <Tile
                                    key={item.id}
                                    index={i}
                                    name={item.file.name}
                                    mime={item.mime}
                                    status={item.status}
                                    progress={item.progress}
                                    thumbUrl={item.thumbUrl}
                                    thumbFailed={item.thumbFailed}
                                    onRemove={() => removeItem(item)}
                                    onRetry={() => {
                                        item.status = "queued";
                                        item.tries = 0;
                                        item.progress = 0;
                                        sync();
                                        run();
                                    }}
                                />
                            ))}
                        </ul>
                    </section>
                )}

                {total > 0 && (
                    <>
                        <div className="mt-5 flex justify-between gap-3 text-[16px] min-h-6">
                            <span>{`${files(total)} · ${size(bytes)}`}</span>
                            <span
                                role="status"
                                aria-live="polite"
                                className={
                                    failed && !sending ? "text-error"
                                        : done && !queued && !sending ? "text-primary-content font-bold"
                                            : ""
                                }
                            >
                                {sending
                                    ? `${done} от ${total} готови`
                                    : failed
                                        ? failed === 1 ? "1 не се изпрати" : `${failed} не се изпратиха`
                                        : done && !queued
                                            ? "Готово — благодарим ви!"
                                            : ""}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={onSend}
                            disabled={mode === "busy"}
                            className="btn btn-primary w-full text-lg mt-3"
                        >
                            {sending && <span className="loading loading-spinner loading-sm" />}
                            {label}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
