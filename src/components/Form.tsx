import {useState, useRef} from "react";
import emailjs from "@emailjs/browser";


export function Form() {
    const [isGuest, setIsGuest] = useState("Не");
    const [attendance, setAttendance] = useState("Да");
    const [childrenCount, setChildrenCount] = useState(0);

    const form = useRef<HTMLFormElement | null>(null);
    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        emailjs
            .sendForm(
                "service_4nv4paq",
                "template_oac7l5d",
                form.current,
                "mmx_1VSvo3nkBXigu"
            )
            .then(() => {
                form.current?.reset();
                setAttendance("Да");
                setIsGuest("Не");
                setChildrenCount(0);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="flex items-center justify-center p-4">
            <form
                ref={form}
                onSubmit={sendEmail}
                className="fieldset w-full max-w-lg bg-base-200 border border-base-300 rounded-lg p-6 lg:text-2xl"
            >
                <h2 className="text-lg lg:text-3xl font-bold mb-4">Ще присъствате ли?</h2>

                <span className="text-[19px] text-left">Моля, попълнете формата до <span className="font-bold">15.06.2026!</span></span>

                {/* Основен гост */}
                <label className="label font-bold">Име и Фамилия</label>
                <input className="input lg:input-xl mb-2 w-full" type="text" name="name" required />

                <label className="label font-bold">Имейл</label>
                <input className="input lg:input-xl mb-2 w-full" type="email" name="user_email" required />

                <label className="label font-bold">Телефон</label>
                <input
                    className="input lg:input-xl mb-2 w-full"
                    type="tel"
                    name="phone"
                    placeholder="088 123 4567"
                    inputMode="numeric"
                    onKeyDown={(e) => {
                        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                            e.preventDefault();
                        }
                    }}
                    required
                />

                <label className="label font-bold mt-2">Ще присъствате ли?</label>
                <div className="flex gap-4 mb-4">
                    <input
                        type="radio"
                        name="attendance"
                        value="Да"
                        checked={attendance === "Да"}
                        className="radio"
                        onChange={(e) => setAttendance(e.target.value)}
                    />
                    <label>Да</label>

                    <input
                        type="radio"
                        name="attendance"
                        value="Не"
                        checked={attendance === "Не"}
                        className="radio"
                        onChange={(e) => setAttendance(e.target.value)}
                    />
                    <label>Не</label>
                </div>

                {attendance === "Да" && (
                    <>
                        {/* Меню */}
                        <label className="label font-bold">Избрано меню</label>
                        <select
                            name="menu"
                            className="select lg:select-xl mb-4 w-full"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>Изберете меню</option>
                            <option value="Пилешко">Пилешко</option>
                            <option value="Свинско">Свинско</option>
                            <option value="Вегетарианско">Вегетарианско</option>
                        </select>

                        {/* Гост */}
                        <label className="label font-bold">Ще доведете ли гост?</label>
                        <div className="flex gap-4 mb-4">
                            <input
                                type="radio"
                                name="guest"
                                value="Да"
                                checked={isGuest === "Да"}
                                className="radio"
                                onChange={(e) => setIsGuest(e.target.value)}
                            />
                            <label>Да</label>

                            <input
                                type="radio"
                                name="guest"
                                value="Не"
                                checked={isGuest === "Не"}
                                className="radio"
                                onChange={(e) => setIsGuest(e.target.value)}
                            />
                            <label>Не</label>
                        </div>
{/*                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={isGuest}
                                onChange={(e) => setIsGuest(e.target.checked)}
                            />
                            <label className="label font-bold">Ще доведете ли гост?</label>
                        </div>*/}

                        {isGuest === "Да" && (
                            <fieldset className="border p-4 rounded-lg mb-4">
                                <legend className="font-bold">Данни за гост</legend>

                                <label className="label font-bold">Име и Фамилия</label>
                                <input
                                    className="input lg:input-xl mb-2 w-full"
                                    type="text"
                                    name="guest_name"
                                    required
                                />

                                <label className="label font-bold">Имейл</label>
                                <input
                                    className="input lg:input-xl mb-2 w-full"
                                    type="email"
                                    name="guest_email"
                                    required
                                />

                                <label className="label font-bold">Телефон</label>
                                <input
                                    className="input lg:input-xl mb-2 w-full"
                                    type="tel"
                                    name="phone"
                                    placeholder="088 123 4567"
                                    inputMode="numeric"
                                    onKeyDown={(e) => {
                                        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                            e.preventDefault();
                                        }
                                    }}
                                    required
                                />

                                <label className="label font-bold">Избрано меню</label>
                                <select
                                    name="guest_menu"
                                    className="select lg:select-xl w-full"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>Изберете меню</option>
                                    <option value="Пилешко">Пилешко</option>
                                    <option value="Свинско">Свинско</option>
                                    <option value="Вегетарианско">Вегетарианско</option>
                                </select>
                            </fieldset>
                        )}

                        {/* Деца */}
                        <label className="label font-bold">Ще има ли деца?</label>
                        <select
                            name="children_count"
                            className="select lg:select-xl mb-4 w-full"
                            value={childrenCount}
                            onChange={(e) => setChildrenCount(Number(e.target.value))}
                        >
                            <option value={0}>Не</option>
                            <option value={1}>1 дете</option>
                            <option value={2}>2 деца</option>
                        </select>

                        {childrenCount > 0 && (
                            <fieldset className="border p-4 rounded-lg mb-4">
                                <legend className="font-bold">Данни за деца</legend>

                                {Array.from({ length: childrenCount }).map((_, i) => (
                                    <div key={i} className="mb-3">
                                        <label className="label font-bold">
                                            Име на дете {i + 1}
                                        </label>
                                        <input
                                            type="text"
                                            name={`child_${i + 1}_name`}
                                            className="input lg:input-xl w-full"
                                            required
                                        />
                                    </div>
                                ))}
                            </fieldset>
                        )}

                        {/* Настаняване */}
                        <label className="label font-bold">Желаете ли настаняване?</label>
                        <div className="flex gap-4 mb-4">
                            <input
                                type="radio"
                                className="radio"
                                name="accommodation"
                                value="Да"
                                defaultChecked
                            />
                            <label>Да</label>

                            <input
                                type="radio"
                                className="radio"
                                name="accommodation"
                                value="Не"
                            />
                            <label>Не</label>
                        </div>
                    </>
                )}

                {/* Бележка */}
                <label className="label font-bold">Бележка</label>
                <textarea
                    className="textarea lg:textarea-xl mb-4 w-full"
                    name="notes"
                    placeholder="Бележка"
                />

                <button type="submit" className="btn btn-primary w-full text-lg">
                    Изпрати
                </button>
                <span className="text-[20px] text-center">Ще получите имейл с попълнените от вас данни.</span>
            </form>
        </div>
    );
}