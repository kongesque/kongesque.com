"use client";
import dynamic from "next/dynamic";

const SnakeCover = dynamic(() => import("@/components/snake-cover"), { ssr: false });

export default function SnakeCoverLoader({ hint = false, bgOverride }: { hint?: boolean; bgOverride?: string }) {
    return <SnakeCover hint={hint} bgOverride={bgOverride} />;
}
