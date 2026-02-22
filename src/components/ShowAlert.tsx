import { useEffect, useState } from "react";
import "../index.css";

export function ShowAlert() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 4000); // 4 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div
            role="alert"
            className="fixed top-1.5 left-1/2 -translate-x-1/2
                 alert alert-success animate-alertFadeOut"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>Your purchase has been confirmed!</span>
        </div>
    );
}