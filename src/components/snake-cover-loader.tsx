"use client";
import dynamic from "next/dynamic";

const SnakeCover = dynamic(() => import("@/components/snake-cover"), { ssr: false });

export default function SnakeCoverLoader() {
    return <SnakeCover />;
}
