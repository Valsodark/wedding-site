import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Spacer } from "./Spacer.tsx";

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
    const currentStr = value.toString().padStart(2, "0");

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-fit min-w-[7rem] px-4 h-28 bg-primary-content rounded-box shadow-xl flex items-center justify-center overflow-hidden">
                {/* INVISIBLE SPAN TRICK: Props the container open to the exact width of the numbers (supports 3+ digits) */}
                <div className="invisible flex h-full items-center justify-center">
                    <span className="font-mono text-5xl md:text-6xl font-bold">{currentStr}</span>
                </div>

                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={currentStr}
                        initial={{ y: 40, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -40, opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="text-neutral-content font-mono text-5xl md:text-6xl font-bold absolute"
                    >
                        {currentStr}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="mt-4 text-lg font-semibold">{label}</span>
        </div>
    );
}
