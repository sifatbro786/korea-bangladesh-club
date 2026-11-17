import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
    ...nextVitals,
    // next/og (satori) renders social images from plain <img>; next/image cannot be used there.
    {
        files: ["**/opengraph-image.js", "**/twitter-image.js"],
        rules: { "@next/next/no-img-element": "off" },
    },
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
]);

export default eslintConfig;
