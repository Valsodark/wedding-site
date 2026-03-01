import arc from "../assets/beach-arc2.webp"

export function Hero() {
    return (
        <div className="hero bg-base-100 min-h-screen">
            <div className="relative flex items-center justify-center
                            scale-75 sm:scale-90 md:scale-100 transition-transform">

                {/* Image */}
                <img
                    src={arc}
                    alt=""
                    className="sm:w-225 z-0 mb-20 md:mb-55"
                />

                {/* Text */}
                <div className="absolute z-10 w-20 flex md:w-65 flex-col items-center text-center">
                    <h1 className="font-bold text-lg md:text-5xl">
                        Наталия и Живко
                    </h1>
                    <p className="mt-2 font-bold text-primary-content text-base sm:text-xl md:text-2xl">
                        23.08.2026
                    </p>
                </div>
            </div>
        </div>
    )
}