"use client";

import { useCallback, useState } from "react";
import dynamic from 'next/dynamic';
import { MapPin, GraduationCap } from 'lucide-react';

const SnakeGame = dynamic(() => import('@/components/snake'), { ssr: false });

export function Header() {
    const [snakeReady, setSnakeReady] = useState(false);

    const handleSnakeReady = useCallback(() => {
        setSnakeReady(true);
    }, []);

    return (
        <header className="space-y-4">
            <div className="relative w-full h-48">
                <div
                    className={`absolute inset-0 transition-opacity duration-200 ease-out ${snakeReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                    aria-hidden="true"
                >
                    <div className="w-full h-full bg-blockBg rounded-lg border border-blockBorder p-2" />
                </div>
                <div className={`h-full transition-opacity duration-200 ease-out ${snakeReady ? "opacity-100" : "opacity-0"}`}>
                    <SnakeGame text={false} height="12rem" onReady={handleSnakeReady} />
                </div>
            </div>

            <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 animate-fade-in text-primary">
                    Kongphob (Kong) 
                </h1>

                <p className="leading-relaxed animate-fade-in-up text-primary mb-2">
                    builds things, mostly computer vision and offline edge AI. Likes problems harder than they look and terminals darker than they need to be. 𖥔
                </p>

                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-secondary text-sm">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Taipei, Taiwan
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>
                            <a
                                href="https://www.csie.ndhu.edu.tw/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-accent transition-colors duration-300"
                            >
                                CSIE
                            </a>
                            {" @ "}
                            <a
                                href="https://www.ndhu.edu.tw/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-accent transition-colors duration-300"
                            >
                                NDHU
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
