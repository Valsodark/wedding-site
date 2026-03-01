import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const VISIBLE = 3;

export function Carousel({
                             autoSlide = false,
                             autoSlideInterval = 3000,
                             slides,
                         }: {
    autoSlide?: boolean;
    autoSlideInterval?: number;
    slides: string[];
}) {
    const extendedSlides = [
        ...slides.slice(-VISIBLE),
        ...slides,
        ...slides.slice(0, VISIBLE),
    ];

    const [curr, setCurr] = useState(VISIBLE);
    const [animate, setAnimate] = useState(true);

    const next = () => setCurr((c) => c + 1);
    const prev = () => setCurr((c) => c - 1);

    useEffect(() => {
        if (!autoSlide) return;
        const id = setInterval(next, autoSlideInterval);
        return () => clearInterval(id);
    }, [autoSlide, autoSlideInterval]);

    useEffect(() => {
        if (curr === slides.length + VISIBLE) {
            setTimeout(() => {
                setAnimate(false);
                setCurr(VISIBLE);
            }, 500);
        }

        if (curr === 0) {
            setTimeout(() => {
                setAnimate(false);
                setCurr(slides.length);
            }, 500);
        }
    }, [curr, slides.length]);

    useEffect(() => {
        if (!animate) {
            requestAnimationFrame(() => setAnimate(true));
        }
    }, [animate]);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-2 text-center">СНИМКИ</h2>
            <h3 className="text-3xl text-primary-content mb-8 text-center">Вечните спомени</h3>
            <p className="text-lg mb-20 text-center p-5 md:w-180">Нашият сватбен ден ще бъде изпълнен с много незабравими моменти, които искаме да споделим с вас! След събитието ще можете да разгледате и изтеглите всички снимки
                <br/>
                Може да ги изтеглите от <a className="underline" href="#">ТУК</a>.
                <br/>
                (линкът ще бъде активен най-рано 3 месеца след сватбеното събитие)</p>
            <div className="relative overflow-hidden w-full max-w-6xl mx-auto">
                <div
                    className={`flex ${
                        animate ? "transition-transform duration-500 ease-out" : ""
                    }`}
                    style={{
                        transform: `translateX(-${curr * (100 / VISIBLE)}%)`,
                    }}
                >
                    {extendedSlides.map((img, i) => {
                        const centerIndex = curr + 1;
                        const isCenter = i === centerIndex;

                        return (
                            <div
                                key={i}
                                className={`w-1/3 flex-shrink-0 px-2 transition-all duration-500
                ${
                                    isCenter
                                        ? "scale-110 opacity-100 z-10"
                                        : "scale-90 opacity-60"
                                }
              `}
                            >
                                <img
                                    src={img}
                                    alt=""
                                    className="w-full rounded-xl shadow-lg"
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <button
                        onClick={prev}
                        className="p-2 rounded-full bg-white/80 shadow hover:bg-white"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={next}
                        className="p-2 rounded-full bg-white/80 shadow hover:bg-white"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
}