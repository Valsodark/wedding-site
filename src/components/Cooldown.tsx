import { useEffect, useState } from "react";
import {Spacer} from "./Spacer.tsx";

const TARGET_DATE = new Date(2026, 7, 23, 0, 0, 0); // Aug 23, 2026

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function getTimeLeft(): TimeLeft {
    const now = Date.now();
    const diff = TARGET_DATE.getTime() - now;

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

export function Cooldown() {
    const [time, setTime] = useState<TimeLeft>(getTimeLeft());

    useEffect(() => {
        const id = setInterval(() => {
            setTime(getTimeLeft());
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return (
        <>
            <h1 className="text-5xl font-bold text-center">Нямаме търпение да се видим!</h1>
            <Spacer />
            <div className="flex flex-col sm:flex-row gap-5 text-lg text-center justify-center items-center">
                <TimeBox label="Дни" value={time.days} />
                <TimeBox label="Часа" value={time.hours} />
                <TimeBox label="Минути" value={time.minutes} />
                <TimeBox label="Секунди" value={time.seconds} />
            </div>
        </>
    );
}
function TimeBox({ label, value }: { label: string; value: number }) {
    const [prev, setPrev] = useState(value);
    const [current, setCurrent] = useState(value);

    if (value !== current) {
        setPrev(current);
        setCurrent(value);
    }

    const prevStr = prev.toString().padStart(2, "0");
    const currentStr = current.toString().padStart(2, "0");

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-fit min-w-[7rem] px-3 h-28 bg-primary-content rounded-box shadow-xl text-neutral-content font-mono text-6xl font-bold perspective-normal">

                {/* 2. INVISIBLE SPAN TRICK: This physically props the container open to the exact width of the numbers */}
                <div className="invisible flex h-full items-center justify-center">
                    <span>{currentStr}</span>
                </div>

                {/* Static Top: Shows the NEW number */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-primary-content rounded-t-box  border-primary-content overflow-hidden flex justify-center items-end">
                    <span className="translate-y-1/2">{currentStr}</span>
                </div>

                {/* Static Bottom: Shows the OLD number */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary-content rounded-b-box overflow-hidden flex justify-center items-start">
                    <span className="-translate-y-1/2">{prevStr}</span>
                </div>

                {/* Flapping Top: Shows OLD number, falls forward from 0deg to -90deg */}
                <div
                    key={`top-${current}`}
                    className="absolute inset-x-0 top-0 h-1/2 bg-primary-content rounded-t-box  border-primary-content overflow-hidden flex justify-center items-end origin-bottom animate-flip-top z-10 backface-hidden"
                >
                    <span className="translate-y-1/2">{prevStr}</span>
                </div>

                {/* Flapping Bottom: Shows NEW number, waits at 90deg, then falls to 0deg */}
                <div
                    key={`bottom-${current}`}
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-primary-content rounded-b-box overflow-hidden flex justify-center items-start origin-top animate-flip-bottom z-10 backface-hidden"
                    style={{ transform: "rotateX(90deg)" }}
                >
                    <span className="-translate-y-1/2">{currentStr}</span>
                </div>
            </div>
            <span className="mt-4 text-lg font-semibold">{label}</span>
        </div>
    );
}
