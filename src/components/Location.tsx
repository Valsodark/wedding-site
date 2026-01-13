export function Location() {
    return (
        <>

            <div className="flex w-full flex-col lg:flex-row items-center lg:items-start h-fit">
                <div className="card bg-base-300 rounded-box grid lg:h-32 w-90 grow place-items-center">
                    <h2 className="sm:text-2xl">ЛОКАЦИЯ</h2>
                    <h2 className="sm:text-3xl">FIRST LINE Restaurant & Bar, Kranevo</h2>
                    <img className="w-130" src="restorant.png"/>
                    <p className="text-lg text-center">Като комплимент на желаещите предоставяме нощувкa в хотел AquaLife – 23.08.2026 - 24.08.2026</p>
                    <a
                        className="btn btn-primary mt-5"
                        href="https://www.google.com/maps/place/First+Line/@43.3431436,28.0705318,17z/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Open in Google Maps
                    </a>
                </div>
                <div className="divider lg:divider-horizontal lg:h-130"></div>
                <div className="card bg-base-300 rounded-box grid lg:h-32 w-90 grow place-items-center">
                    <h2 className="sm:text-2xl">НАСТАНЯВАНЕ</h2>
                    <h2 className="sm:text-3xl">AquaLife Hotel, Kranevo</h2>
                    <img className="w-130" src="hotel.png"/>
                    <p className="text-lg text-center">Като комплимент на желаещите предоставяме нощувкa в хотел AquaLife – 23.08.2026 - 24.08.2026</p>
                    <a
                        className="btn btn-primary mt-5"
                        href="https://maps.app.goo.gl/TsdwT1Jec38KnqJp9"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Open in Google Maps
                    </a>
                </div>
            </div>
        </>
    )
}