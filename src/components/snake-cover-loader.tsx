"use client";
import dynamic from "next/dynamic";

const SnakeSkeleton = () => (
    <div
        className="w-full h-full"
        style={{ backgroundColor: '#0E1110' }}
        aria-hidden="true"
    />
);

const SnakeCover = dynamic(() => import("@/components/snake-cover"), {
    ssr: false,
    loading: () => <SnakeSkeleton />,
});

export default function SnakeCoverLoader() {
    return <SnakeCover />;
}
