import letter from '../assets/lettar.png'
import flowers from '../assets/flowers.png'
import woman from '../assets/woman.png'

export function Information() {
    return (
        <>
            <div className="flex flex-col max-w-full  lg:flex-row gap-5 justify-center items-center bg-base-content pt-20 pb-20 pl-5 pr-5">
                <div className="card bg-base-100 w-full lg:w-96 shadow-sm lg:p-5">
                    <figure>
                        <img
                            className="h-70"
                            src={letter}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body lg:h-40">
                        <h2 className="card-title">Вашето присъствие е най-големият ни подарък!</h2>
                        <p>Ако все пак желаете да ни зарадвате допълнително, бихме оценили вашия жест под формата на подарък в плик.</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full lg:w-96 shadow-sm lg:p-5">
                    <figure>
                        <img className="h-70"
                            src={flowers}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body lg:h-40">
                        <h2 className="card-title">Цветя</h2>
                        <p>Молим ви да не носите цветя, тъй като ние сме предвидили достатъчно. Благодарим преадвапртелно!</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full lg:w-96 shadow-sm lg:p-5">
                    <figure>
                        <img className="h-70"
                             src={woman}
                             alt="Shoes" />
                    </figure>
                    <div className="card-body lg:h-40">
                        <h2 className="card-title">Рокля</h2>
                        <p>Молим ви да ни помогнете да запазим магията на този ден, като оставите бялата рокля за булката.</p>
                    </div>
                </div>
            </div>
        </>
    )
}