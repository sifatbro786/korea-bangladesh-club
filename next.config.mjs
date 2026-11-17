/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    cacheComponents: true,
    partialPrefetching: true,
    reactCompiler: true,
    images: {
        formats: ["image/avif", "image/webp"],
        // Required since Next 16 — only these qualities can be requested.
        qualities: [60, 75],
        // 31 days; local images are content-addressed by filename, admin uploads get new names.
        minimumCacheTTL: 2678400,
        localPatterns: [{ pathname: "/images/**", search: "" }],
        remotePatterns: [new URL("https://images.unsplash.com/**")],
    },
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
};

export default nextConfig;
