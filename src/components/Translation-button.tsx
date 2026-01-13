export function TranslationButton() {
    const url = `https://translate.google.com/translate?sl=auto&tl=bg&u=${encodeURIComponent(
        window.location.href
    )}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
        >
            Translate page
        </a>
    );
}