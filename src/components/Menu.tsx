import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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
    const [direction, setDirection] = useState(1);

    const changePage = (newPage: number) => {
        if (newPage < 0 || newPage >= pages.length || newPage === page) return;
        setDirection(newPage > page ? 1 : -1);
        setPage(newPage);
    };

    const nextPage = () => changePage(page + 1);
    const prevPage = () => changePage(page - 1);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    };

    const variantTitles = ["Пилешко меню", "Свинско меню", "Вегетарианско меню"];

    return (
        <div className="w-full flex flex-col items-center gap-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-2">Меню</h1>

            <div className="flex w-full max-w-6xl mx-auto relative">
                {/* Left Arrow */}
                <div className="w-14 md:w-24 flex-shrink-0 relative z-20 py-40 lg:py-0">
                    <div className="sticky top-1/2 -translate-y-1/2 flex justify-center lg:static lg:h-full lg:items-center lg:translate-y-0">
                        <button
                            onClick={prevPage}
                            disabled={page === 0}
                            className="p-2 md:p-4 rounded-full bg-gray-900/10 hover:bg-gray-900/30 backdrop-blur-md text-gray-800 hover:text-white transition-all disabled:cursor-not-allowed disabled:opacity-30 shadow-sm"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 px-2 md:px-4 overflow-x-hidden py-4 -my-4">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex flex-col gap-6 md:gap-8"
                        >
                            <h2 className="text-2xl md:text-3xl font-medium text-center text-gray-500 mb-2">
                                {variantTitles[page]}
                            </h2>

                            {pages[page].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-transform hover:scale-[1.02]"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full md:w-80 h-64 md:h-80 object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="p-6 flex flex-col justify-center flex-1">
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Arrow */}
                <div className="w-14 md:w-24 flex-shrink-0 relative z-20 py-40 lg:py-0">
                    <div className="sticky top-1/2 -translate-y-1/2 flex justify-center lg:static lg:h-full lg:items-center lg:translate-y-0">
                        <button
                            onClick={nextPage}
                            disabled={page === pages.length - 1}
                            className="p-2 md:p-4 rounded-full bg-gray-900/10 hover:bg-gray-900/30 backdrop-blur-md text-gray-800 hover:text-white transition-all disabled:cursor-not-allowed disabled:opacity-30 shadow-sm"
                            aria-label="Next page"
                        >
                            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-8">
                {pages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => changePage(index)}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full font-medium text-base md:text-lg transition-colors ${
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
