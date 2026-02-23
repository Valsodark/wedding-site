import { useRef, useState, useEffect } from "react";
import intro from "../assets/intro.mp4";
import tumbnail from "../assets/image.jpg"

interface IntroVideoProps {
    onFinish?: () => void;
    fadeDuration?: number;       // ms for video fade
    fadeBeforeEnd?: number;      // ms before video ends to start fade
    whiteHoldDuration?: number;  // ms to hold full white before fading to site
    whiteFadeDuration?: number;  // ms for white overlay fade to site
}

export function IntroVideo({
                               onFinish,
                               fadeDuration = 1000,
                               fadeBeforeEnd = 800,
                               whiteHoldDuration = 500,
                               whiteFadeDuration = 1000,
                           }: IntroVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showOverlay, setShowOverlay] = useState(true);
    const [videoFaded, setVideoFaded] = useState(false);
    const [whiteOpacity, setWhiteOpacity] = useState(1);

    // Trigger video fade near the end
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            const timeToFade = video.duration - fadeBeforeEnd / 1000;
            const timer = setTimeout(() => setVideoFaded(true), timeToFade * 1000);
            return () => clearTimeout(timer);
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }, [fadeBeforeEnd]);

    // Hold full white, then fade white overlay
    useEffect(() => {
        if (!videoFaded) return;

        const holdTimer = setTimeout(() => {
            // start fading white overlay
            setWhiteOpacity(0);

            const fadeTimer = setTimeout(() => {
                setShowOverlay(false);
                onFinish?.();
            }, whiteFadeDuration);

            return () => clearTimeout(fadeTimer);
        }, whiteHoldDuration);

        return () => clearTimeout(holdTimer);
    }, [videoFaded, whiteHoldDuration, whiteFadeDuration, onFinish]);

    const handleClick = () => {
        videoRef.current?.play();
    };

    return (
        showOverlay && (
            <div
                className="fixed inset-0 z-[9999] cursor-pointer overflow-hidden flex justify-center items-center"
                onClick={handleClick}
            >
                {/* White overlay behind video */}
                <div
                    className="absolute inset-0 bg-white pointer-events-none"
                    style={{
                        opacity: whiteOpacity,
                        transition: `opacity ${whiteFadeDuration}ms ease-out`,
                    }}
                />

                {/* Video wrapper to center and cover screen */}
                <div className="absolute inset-0 w-full h-full overflow-hidden flex justify-center items-center">
                    <video
                        ref={videoRef}
                        src={intro}
                        playsInline
                        muted
                        preload="none"
                        className="min-w-full min-h-full mb:object-cover object-contain"
                        poster={tumbnail}
                        style={{
                            transition: `opacity ${fadeDuration}ms ease-in`,
                            opacity: videoFaded ? 0 : 1,
                        }}
                    />
                </div>
            </div>
        )
    );
}