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
    return (
        <div className="flex w-fit flex-col p-2 bg-primary-content rounded-box text-neutral-content">
      <span className="countdown font-mono text-7xl">
        <span
            style={{ "--value": value } as React.CSSProperties}
            aria-live="polite"
            aria-label={label}
        >
          {value}
        </span>
      </span>
            {label}
        </div>
    );
}
