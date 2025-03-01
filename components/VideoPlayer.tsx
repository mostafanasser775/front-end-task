'use client';

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Maximize, Minimize, Expand } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@heroui/button";
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { useExpandStore } from "@/store/useExpandStore";

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-full bg-gray-100">
            <div className="text-gray-500 animate-pulse">Loading player...</div>
        </div>
    )
});

export function VideoPlayer({ url, nextUrl, privousLesson }: { url: string, nextUrl: string | null, privousLesson: string | null }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const playerRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [, startTransition] = useTransition();
    const { toggleExpand } = useExpandStore();

    // Handle client-side rendering
    useEffect(() => { setIsClient(true) }, []);

    // Reset player state when URL changes
    useEffect(() => {
        setPlayerReady(false);
        setProgress(0);
        setIsBuffering(false);
    }, [url]);

    const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
        setProgress(state.played * 100);

        // Check if buffering
        if (state.loaded < 1 && isPlaying) {
            setIsBuffering(true);
        } else {
            setIsBuffering(false);
        }
    };

    const handleDuration = (duration: number) => { setDuration(duration); };

    const togglePlay = () => { setIsPlaying(!isPlaying) };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(e.target.value);

        setProgress(newProgress);

        if (playerRef.current) {
            // @ts-ignore - ReactPlayer doesn't have proper TypeScript definitions for seekTo
            playerRef.current.seekTo(newProgress / 100, 'fraction');
        }
    };

    const handleNextLessonClick = () => {
        if (nextUrl) {
            router.push(nextUrl);
        }
    };

    const onVideoEnd = () => {
        startTransition(async () => {
            if (nextUrl) router.push(nextUrl);
        });
    };

    const toggleFullscreen = () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else {
            if (containerRef.current) {
                containerRef.current.requestFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    const handleDoubleClick = () => {
        toggleFullscreen();
    };
    

    return (
        <div ref={containerRef} className="relative overflow-hidden bg-black rounded-lg shadow-lg aspect-video" onDoubleClick={handleDoubleClick}>
            {isClient && (
                <ReactPlayer
                    ref={playerRef}
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload',
                                disablePictureInPicture: true,
                            },
                        },
                    }}
                    controls={false}
                    height="100%"
                    muted={isMuted}
                    playIcon={
                        <Button isIconOnly className="w-16 h-16 text-red-500 bg-white rounded-full hover:bg-white/90">
                            <Play className="w-8 h-8" />
                        </Button>
                    }
                    playing={isPlaying} url={url} volume={volume} width="100%"
                    onBuffer={() => setIsBuffering(true)}
                    onBufferEnd={() => setIsBuffering(false)}
                    onDuration={handleDuration} onEnded={onVideoEnd} onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)} onProgress={handleProgress} onReady={() => setPlayerReady(true)}
                />
            )}

            {playerReady && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-white">
                            {formatTime(duration * progress / 100)} / {formatTime(duration)}
                        </div>
                    </div>

                    <div className="relative w-full h-2 mb-3 rounded-full bg-gray-600/50">
                        <input
                            className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                            max="100"
                            min="0"
                            step="0.1"
                            type="range"
                            value={progress}
                            onChange={handleSeek}
                        />
                        <div
                            className="relative h-2 bg-red-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 w-3 h-3 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Button
                                isIconOnly
                                className="text-white hover:bg-white/20" variant="ghost"
                                onClick={togglePlay}
                            >
                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            </Button>

                            <div className="flex items-center space-x-1">
                                <Button
                                    isIconOnly
                                    className="text-white hover:bg-white/20" variant="ghost"
                                    onClick={toggleMute}
                                >
                                    {isMuted || volume === 0 ? (
                                        <VolumeX className="w-5 h-5" />
                                    ) : (
                                        <Volume2 className="w-5 h-5" />
                                    )}
                                </Button>

                                <input
                                    className="w-16 accent-red-500"
                                    max="1"
                                    min="0"
                                    step="0.1"
                                    type="range"
                                    value={isMuted ? 0 : volume}
                                    onChange={(e) => {
                                        const newVolume = parseFloat(e.target.value);

                                        setVolume(newVolume);
                                        setIsMuted(newVolume === 0);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <Button
                                isIconOnly
                                className={`text-white hover:bg-white/20 `}
                                isDisabled={!privousLesson} variant="ghost"
                                onPress={() => privousLesson && router.push(privousLesson)}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>

                            <Button
                                isIconOnly
                                className={`text-white hover:bg-white/20 `}
                                isDisabled={!nextUrl} variant="ghost"
                                onPress={handleNextLessonClick}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>

                            {/*expand Btn*/}
                            <Button
                                isIconOnly
                                className="text-white hover:bg-white/20" variant="ghost"
                                onClick={toggleExpand}
                            >
                                < Expand className="w-5 h-5" />
                            </Button>

                            <Button
                                isIconOnly
                                className="text-white hover:bg-white/20" variant="ghost"
                                onClick={toggleFullscreen}
                            >
                                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

            )}

            {isBuffering && (
                <><div className="absolute inset-0 flex items-center justify-center bg-black/30" /><div className="w-12 h-12 border-t-2 border-b-2 border-white rounded-full animate-spin" /></>
            )}
        </div>
    );
}
