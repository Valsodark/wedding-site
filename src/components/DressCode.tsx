import {Spacer} from "./Spacer.tsx";
import {Starfish} from "./Starfish.tsx";

export function DressCode() {
    return (
        <div className="flex items-center justify-center">
            <div
                className=" w-full lg:w-240 pt-20 lg:pt-20 lg:rounded-2xl flex flex-col items-center justify-center bg-secondary-content">
                <h1 className="text-5xl font-bold text-base-200">Dress Code</h1>
                <Spacer/>
                <p className="lg:w-180 text-center text-2xl text-base-200">Скъпи гости,<br/> За да улесним избора ви на
                    облекло за големия ден и да създадем хармония в общата визия, моля облеклото да кореспондира с някои
                    от следните цветови гами:</p>
                <div className='flex flex-col w-full'>
                    <div className="w-full mt-10 md:h-10 h-6">
                        <svg viewBox="0 0 1440 100" fill="#2f4f50" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
                                className="fill-current text-[#2f4f50]"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col w-full md:flex-row items-center justify-center gap-6 pb-10 bg-[#2f4f50] lg:rounded-b-2xl">
                        <Starfish color={"#9F8461"}/>
                        <Starfish color={"#E1D8CD"}/>
                        <Starfish color={"#F0EBE7"}/>
                        <Starfish color={"#B4D8D8"}/>
                        <Starfish color={"#3E7E8F"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}