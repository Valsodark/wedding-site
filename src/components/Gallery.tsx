import { useState } from "react";
import image1 from "../assets/NataliaZhivko_0049.jpg"
import image2 from "../assets/NataliaZhivko_0045.jpg"
import image3 from "../assets/NataliaZhivko_0009.jpg"
import image4 from "../assets/NataliaZhivko_0154.jpg"
import image5 from "../assets/NataliaZhivko_0103.jpg"
import image6 from "../assets/NataliaZhivko_0126.jpg"
import image7 from "../assets/NataliaZhivko_140.jpg"

const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
];

export function Gallery() {
    const [index, setIndex] = useState(0);

    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
    const next = () => setIndex((i) => (i + 1) % images.length);
    const getImage = (offset: number) => images[(index + offset + images.length) % images.length];

    return (
        <div>
            <h2 className="text-4xl font-bold mb-2">СНИМКИ</h2>
            <h3 className="text-3xl text-primary-content mb-8">Вечните спомени</h3>
            <p>Нашият сватбен ден ще бъде изпълнен с много незабравими моменти, които искаме да споделим с вас! След събитието ще можете да разгледате и изтеглите всички снимки
                <br/>
                Може да ги изтеглите от ТУК.
                <br/>
                ( линкът ще бъде активен най-рано 1 месец след сватбеното събитие )</p>
            <div className="w-full h-full">
                <h2 className="card-title text-4xl justify-center">СНИМКИ</h2>
                <h2 className="card-title text-3xl text-primary-content justify-center mt-5 mb-25">
                    Вечните спомени
                </h2>

                <div className="flex items-center justify-center gap-6">
                    {/* Left button */}
                    <button
                        onClick={prev}
                        className="text-4xl font-bold select-none hover:scale-110 transition-transform duration-300"
                    >
                        ‹
                    </button>

                    {/* Images */}
                    <div className="flex items-center gap-6">
                        {[ -1, 0, 1 ].map((offset) => {
                            const isCenter = offset === 0;
                            return (
                                <img
                                    key={offset}
                                    src={getImage(offset)}
                                    style={{
                                        width: isCenter ? 360 : 280,  // pixels
                                        height: isCenter ? 540 : 420, // pixels
                                    }}
                                    className={`object-cover rounded-xl transition-all duration-500 ${isCenter ? "scale-110 shadow-xl z-10" : "opacity-60 scale-90"}`}
                                />
                            );
                        })}
                    </div>

                    {/* Right button */}
                    <button
                        onClick={next}
                        className="text-4xl font-bold select-none hover:scale-110 transition-transform duration-300"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}