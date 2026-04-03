import { useState } from "react";

export function Contact() {
    const [copiedItem, setCopiedItem] = useState(null);

    const handleCopy = (text: any) => {
        // Copy to clipboard
        navigator.clipboard.writeText(text);

        // Show tooltip feedback
        setCopiedItem(text);

        // Hide tooltip after 2 seconds
        setTimeout(() => {
            setCopiedItem(null);
        }, 2000);
    };

    return (
        <div className="card w-full max-w-lg bg-base-100 mx-auto mb-10">
            <div className="card-body items-center text-center text-lg">
                <h2 className="card-title text-2xl mb-4">Може да се свържете с нас на:</h2>

                <div className="flex flex-col gap-4 w-full">
                    {/* Email */}
                    <div className="flex justify-between items-center p-3 bg-base-200 rounded-box">
                        <span className="font-semibold">Email:</span>
                        <a
                            href="mailto:natalia.zhivko@gmail.com"
                            className="text-base-content font-bold link link-hover link-primary"
                        >
                            natalia.zhivko@gmail.com
                        </a>
                    </div>

                    {/* Phone 1: Natalia */}
                    <div className="flex justify-between items-center p-3 bg-base-200 rounded-box">
                        <span className="font-semibold">Наталия:</span>
                        <div
                            className={`tooltip bg-base-200 ${
                                copiedItem === "0876594590" ? "tooltip-open tooltip-success" : ""
                            }`}
                            data-tip={copiedItem === "0876594590" ? "Копирано!" : "Копирай"}
                        >
                            <button
                                onClick={() => handleCopy("0876594590")}
                                className="btn btn-sm btn-ghost font-mono text-lg"
                            >
                                0876594590
                            </button>
                        </div>
                    </div>

                    {/* Phone 2: Zhivko */}
                    <div className="flex justify-between items-center p-3 bg-base-200 rounded-box">
                        <span className="font-semibold">Живко:</span>
                        <div
                            className={`tooltip ${
                                copiedItem === "0895264804" ? "tooltip-open tooltip-success" : ""
                            }`}
                            data-tip={copiedItem === "0895264804" ? "Копирано!" : "Копирай"}
                        >
                            <button
                                onClick={() => handleCopy("0895264804")}
                                className="btn btn-sm btn-ghost font-mono text-lg"
                            >
                                0895264804
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}