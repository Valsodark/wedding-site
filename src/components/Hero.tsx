import arc from "../assets/beach-arc2.png"

export function Hero() {
    return (
        <>
            <div className="hero bg-base-100 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        alt=""
                        src={arc}
                        className="sm:w-225 z-0 mb-20 md:mb-55"
                    />
                    <div className="absolute z-1 sm:w-140 sm:h-139 text-center flex items-center justify-center flex-col">
                        <h1 className="sm:text-2xl md:text-5xl font-bold text-center w-20 sm:w-30 md:w-60">Наталия и Живко</h1>
                        <p className="py-2 sm:py-6 text-lg md:text-2xl text-center font-bold text-primary-content">
                            23.08.2026
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}