export function Hero() {
    return (
        <>
            {/*<div className="hero bg-base-100 min-h-screen">*/}
            {/*    <div className="hero-content flex-col lg:flex-row">*/}
            {/*        <img*/}
            {/*            src="beach-arc2.png"*/}
            {/*            className="absolute top-25 w-70 sm:w-225 z-0"*/}
            {/*        />*/}
            {/*        <div className="sm:relative  z-1 sm:w-140 sm:h-139 text-center flex items-center justify-center flex-col">*/}
            {/*            <h1 className="sm:text-5xl font-bold text-center w-20 sm:w-60">Наталия и Живко</h1>*/}
            {/*            <p className="py-2 sm:py-6 sm:text-2xl text-center font-bold text-primary-content">*/}
            {/*                23.08.2026*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}


            <div className="hero bg-base-100 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src="beach-arc2.png"
                        className="w-70 sm:w-225 z-0 mb-55"
                    />
                    <div className="absolute z-1 sm:w-140 sm:h-139 text-center flex items-center justify-center flex-col">
                        <h1 className="sm:text-5xl font-bold text-center w-20 sm:w-60">Наталия и Живко</h1>
                        <p className="py-2 sm:py-6 sm:text-2xl text-center font-bold text-primary-content">
                            23.08.2026
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}