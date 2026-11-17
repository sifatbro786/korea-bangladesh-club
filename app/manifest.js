/** @returns {import("next").MetadataRoute.Manifest} */
export default function manifest() {
    return {
        name: "Korea Bangladesh Business & Cultural Club",
        short_name: "KBBCC",
        description: "A private members' club in Dhaka for business and cultural ties between Korea and Bangladesh.",
        start_url: "/",
        display: "standalone",
        background_color: "#0B0C0E",
        theme_color: "#0B0C0E",
        icons: [
            { src: "/icon.png", sizes: "192x192", type: "image/png" },
            { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
        ],
    };
}
