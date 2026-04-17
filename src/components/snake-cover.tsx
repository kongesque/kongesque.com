"use client";
import React, { useRef, useEffect, useState } from 'react';
import type p5 from 'p5';
import { Snake, HamiltonianCycle, HamiltonianContext } from '@/lib/snake-game';

let cachedColors: { bg: string; primary: string; secondary: string; accent: string } | null = null;
const getColors = () => {
    if (cachedColors) return cachedColors;
    const style = getComputedStyle(document.documentElement);
    cachedColors = {
        bg: style.getPropertyValue('--color-block-bg'),
        primary: style.getPropertyValue('--color-primary'),
        secondary: style.getPropertyValue('--color-secondary'),
        accent: style.getPropertyValue('--color-accent'),
    };
    return cachedColors;
};

const cycleCache = new Map<string, any[]>();

export default function SnakeCover() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isSpeedUp, setIsSpeedUp] = useState(false);

    useEffect(() => {
        const { primary, accent } = getColors();
        const bg = "#0E1110";
        let p5Instance: p5 | undefined;

        const initGame = async () => {
            if (typeof window === 'undefined' || !canvasRef.current) return;

            const p5Module = await import('p5');
            const p5 = p5Module.default;

            let blocksX = 40, blocksY = 20;
            let blockSize: number, xOffset = 0, yOffset = 0;
            let s: Snake, hc: HamiltonianContext;
            let outlineLength = 3, setup_i = 0;
            let speedMultiplier = 1;

            const setBlocks = (w: number, h: number) => {
                let a = 1;
                const isMobile = window.innerWidth < 768;
                const maxBlocks = isMobile ? 400 : 900;
                for (;;) {
                    if (Math.floor(w / a) * Math.floor(h / a) < maxBlocks) {
                        blockSize = a;
                        blocksX = Math.floor(w / blockSize) - Math.floor(w / blockSize) % 2;
                        blocksY = Math.floor(h / blockSize) - Math.floor(h / blockSize) % 2;
                        break;
                    } else a++;
                }
            };

            const sketch = (p: p5) => {
                let previousWidth = window.innerWidth;

                p.setup = () => {
                    setup_i++;
                    const el = canvasRef.current;
                    if (!el) return;

                    if (setup_i === 1) {
                        setBlocks(el.offsetWidth, el.offsetHeight);
                        p.createCanvas(el.offsetWidth, el.offsetHeight).parent(el);
                        p.pixelDensity(10);
                    }

                    blockSize = Math.min(p.width / blocksX, p.height / blocksY);
                    outlineLength = blockSize / 15;
                    xOffset = (p.width - blockSize * blocksX) / 2;
                    yOffset = (p.height - blockSize * blocksY) / 2;

                    s = new Snake(p, blocksX, blocksY, blockSize, outlineLength);

                    const cacheKey = `cover_${blocksX}x${blocksY}`;
                    if (cycleCache.has(cacheKey)) {
                        const cachedCycle = cycleCache.get(cacheKey)!;
                        hc = {
                            cycle: cachedCycle,
                            getNodeNo: (a: any, b: any) => {
                                for (let c = 0; c < cachedCycle.length; c++)
                                    if (cachedCycle[c].x === a && cachedCycle[c].y === b) return c;
                                return -1;
                            },
                            getPossiblePositionsFrom: (a: any, b: any) => {
                                const nodeNo = hc.getNodeNo(a, b);
                                const node = cachedCycle[nodeNo];
                                const positions: number[] = [];
                                for (const c of node.edges) positions.push(hc.getNodeNo(c.x, c.y));
                                return positions;
                            }
                        };
                    } else {
                        hc = new HamiltonianCycle(blocksX, blocksY, p);
                        cycleCache.set(cacheKey, hc.cycle);
                    }

                    s.resetOnHamiltonian(hc);
                    p.frameRate(30);
                };

                let speedUp = false;
                const el = canvasRef.current;
                if (el) {
                    el.addEventListener('click', () => {
                        speedUp = !speedUp;
                        speedMultiplier = speedUp ? 10 : 1;
                        setIsSpeedUp(speedUp);
                    });
                    el.style.cursor = 'pointer';
                }

                p.windowResized = () => {
                    const el = canvasRef.current;
                    if (!el || window.innerWidth === previousWidth) return;
                    previousWidth = window.innerWidth;
                    p.resizeCanvas(el.offsetWidth, el.offsetHeight);
                    setBlocks(p.width, p.height);
                    blockSize = Math.min(p.width / blocksX, p.height / blocksY);
                    outlineLength = blockSize / 15;
                    xOffset = (p.width - blockSize * blocksX) / 2;
                    yOffset = (p.height - blockSize * blocksY) / 2;
                    p.setup();
                };

                p.draw = () => {
                    p.background(bg);
                    p.fill(bg);
                    p.stroke(bg);
                    p.strokeWeight(1);
                    p.rect(0, 0, p.width, yOffset);
                    p.rect(0, 0, xOffset, p.height);
                    p.rect(p.width, p.height, -p.width, -yOffset);
                    p.rect(p.width, p.height, -xOffset, -p.height);

                    p.push();
                    p.translate(xOffset, yOffset);
                    s.show({ primary, accent });
                    for (let i = 0; i < speedMultiplier; i++) s.update();
                    if (s.weWin) p.setup();
                    p.pop();
                };
            };

            p5Instance = new p5(sketch, canvasRef.current);
        };

        initGame();
        return () => { p5Instance?.remove(); };
    }, []);

    return (
        <div className={`relative w-full h-full transition-all duration-300 ${isSpeedUp ? 'ring-1 ring-accent rounded-lg' : ''}`}>
            <div ref={canvasRef} className="w-full h-full" style={{ userSelect: 'none' }} />
        </div>
    );
}
