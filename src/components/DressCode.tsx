import {Spacer} from "./Spacer.tsx";
import {Starfish} from "./Starfish.tsx";

export function DressCode() {
    return (
        <div className="flex items-center justify-center">
            <div className=" w-full pt-20 pb-20 lg:w-240 lg:p-20 lg:rounded-2xl flex flex-col items-center justify-center bg-secondary-content">
                <h1 className="text-5xl font-bold text-base-200">Dress Code</h1>
                <Spacer />
                <p className="lg:w-180 text-center text-2xl text-base-200">Скъпи гости,<br /> За да улесним избора ви на облекло за големия ден и да създадем хармония в общата визия, моля облеклото да кореспондира с някои от следните цветови гами:</p>
                <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-10'>
                    <Starfish color={"#9F8461"} />
                    <Starfish color={"#E1D8CD"} />
                    <Starfish color={"#F0EBE7"} />
                    <Starfish color={"#B4D8D8"} />
                    <Starfish color={"#3E7E8F"} />
                </div>
            </div>
        </div>
    )
}