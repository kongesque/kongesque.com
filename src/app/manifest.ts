import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "kongesque",
        short_name: "kongesque",
        description: "Building things with code and curiosity.",
        start_url: "/",
        display: "minimal-ui",
        background_color: "#fff",
        theme_color: "#fff",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    }
}
