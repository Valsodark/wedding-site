import { useRef, useState } from "react";
import intro from "../assets/intro.mp4"


interface IntroVideoProps {
    onFinish?: () => void;
}

export function IntroVideo({ onFinish }: IntroVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showOverlay, setShowOverlay] = useState(true);

    const handleClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleVideoEnd = () => {
        setShowOverlay(false);
        if (onFinish) onFinish();
    };

    return (
        showOverlay && (
            <div
                className="fixed inset-0 bg-black flex justify-center items-center z-[9999] cursor-pointer"
                onClick={handleClick}
            >
                <video
                    ref={videoRef}
                    src={intro}
                    muted
                    playsInline
                    preload="auto"
                    onEnded={handleVideoEnd}
                    className="w-full h-full object-cover"
                    poster="/poster.jpg"
                />
                <div className="absolute text-white text-lg md:text-2xl text-center pointer-events-none">
                    Tap to start
                </div>
            </div>
        )
    );
}