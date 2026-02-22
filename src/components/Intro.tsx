import { useRef, useState, useEffect } from "react";
import intro from "../assets/intro.mp4";

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
                               whiteHoldDuration = 1000,
                               whiteFadeDuration = 1000,
                           }: IntroVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showOverlay, setShowOverlay] = useState(true);
    const [videoFaded, setVideoFaded] = useState(false);
    const [whiteOpacity, setWhiteOpacity] = useState(1); // white overlay starts fully opaque behind video

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
            // start fading white
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
                className="fixed inset-0 flex justify-center items-center z-[9999] cursor-pointer overflow-hidden"
                onClick={handleClick}
            >
                {/* White overlay behind video */}
                <div
                    className="absolute inset-0 pointer-events-none bg-white"
                    style={{
                        transition: `opacity ${whiteFadeDuration}ms ease-out`,
                        opacity: whiteOpacity,
                    }}
                />

                {/* Video fades out on top */}
                <video
                    ref={videoRef}
                    src={intro}
                    autoPlay={false}
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover absolute inset-0"
                    style={{
                        transition: `opacity ${fadeDuration}ms ease-in`,
                        opacity: videoFaded ? 0 : 1,
                    }}
                />
            </div>
        )
    );
}