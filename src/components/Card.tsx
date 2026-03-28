import {Calendar} from "./Calendar.tsx"
import profile from "../assets/profiple.webp"

export function Card() {
    return (
        <>
            <div className="hero">
                <div className="card pt-5 bg-base-200 md:w-180 shadow-sm">
                    <figure>
                        <div className="avatar">
                            <div className="w-70 rounded-full h-70 overflow-hidden">
                                <img
                                    src={profile}
                                    alt="Profile"
                                    className="w-full h-full object-cover object-[79%_35px] scale-170"
                                />
                            </div>
                        </div>
                    </figure>
                    <div className="card-body gap-6 text-center">
                        <h2 className="card-title m-auto text-3xl">Щe станем семейство</h2>
                        <p className="text-lg">С радост и с трепет в душите, ви каним да споделите с нас един от най-вълнуващите моменти в животa ни,
                            а именно стъпването ни в брак. В този специален момент искаме да споделим
                            любовта, щастието и обещанието си за бъдеще, изпълнено с обич и споделени мигове. Вашето
                            присъствие ще направи празника ни още по-незабравим и светъл.</p>
                        <div className="w-full flex justify-center items-center">
                            <Calendar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}