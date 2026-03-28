import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import saladChickenBeef from "../assets/salad-chicken-beef.png";
import starterChickenBeef from "../assets/starter-chiken-beef.png";
import mainChicken from "../assets/chicken-main.png";
import mainBeef from "../assets/beef-main.png";
import vegieSalad from "../assets/vegi-salad.png"
import vegieStarter from "../assets/vegie-starter.png"
import vegieMain from "../assets/vegie-main.png"

const pages = [
    [
        {
            title: "Салата",
            desc: "Печен пипер, микс зелени салати, прошуто, червен лук, артишок, сирене ементал и чери\n" +
                "домат.",
            img: saladChickenBeef,
        },
        {
            title: "Предястие",
            desc: "Рулца от прошуто с камембер, карамелизирана круша и пюре от круши.",
            img: starterChickenBeef,
        },
        {
            title: "Основно",
            desc: "Пилешко със спанак и крема сирене върху картофено пюре с трюфел и сос велуте.",
            img: mainChicken,
        },
    ],
    [
        {
            title: "Салата",
            desc: "Печен пипер, микс зелени салати, прошуто, червен лук, артишок, сирене ементал и чери\n" +
                "домат.",
            img: saladChickenBeef,
        },
        {
            title: "Предястие",
            desc: "Рулца от прошуто с камембер, карамелизирана круша и пюре от круши.",
            img: starterChickenBeef,
        },
        {
            title: "Основно",
            desc: "Свинско бон филе с крем от батат, сос демиглас, бейби моркови и зелен боб.",
            img: mainBeef,
        },
    ],
    [
        {
            title: "Салата",
            desc: "Хумус от боб, микс зелени салати, брюкселско зеле, зелен боб, чери домат, рукола и\n" +
                "тиквено семе.",
            img: vegieSalad,
        },
        {
            title: "Предястие",
            desc: "Рулца от патладжан, айвар, крема сирене, магданоз, кора от лимон, орехи, доматена\n" +
                "салса и нар.",
            img: vegieStarter,
        },
        {
            title: "Основно",
            desc: "Розички от карфиол мариновани в паприка и чесън, с пюре от грах и сос ромеско.",
            img: vegieMain,
        },
    ],
];

export function Menu() {
    const [page, setPage] = useState(0);

    const changePage = (newPage: number) => {
        if (newPage < 0 || newPage >= pages.length || newPage === page) return;
        setPage(newPage);
    };

    const nextPage = () => changePage(page + 1);
    const prevPage = () => changePage(page - 1);

    return (
        <div className="w-full flex flex-col items-center gap-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Restaurant Menu</h1>

            <div className="relative w-full max-w-4xl flex items-center justify-center">
                <button
                    onClick={prevPage}
                    disabled={page === 0}
                    className="absolute -left-12 md:left-0 z-20 p-4 rounded-full transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-8 w-8 text-gray-700" />
                </button>

                <div className="w-full px-12 md:px-24">
                    <div className="flex flex-col gap-8">
                        {pages[page].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-transform hover:scale-[1.02]"
                            >
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full md:w-80 h-80 object-cover"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="p-6 flex flex-col justify-center flex-1">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={nextPage}
                    disabled={page === pages.length - 1}
                    className="absolute -right-12 md:right-0 z-20 p-4 rounded-full transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Next page"
                >
                    <ChevronRight className="h-8 w-8 text-gray-700" />
                </button>
            </div>

            <div className="flex gap-3 mt-8">
                {pages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => changePage(index)}
                        className={`w-12 h-12 rounded-full font-medium text-lg transition-colors ${
                            page === index
                                ? "bg-secondary-content text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
