import localFont from "next/font/local";

// Fonts are self-hosted (app/fonts, latin subset, OFL — licences alongside) so dev and production
// builds never depend on reaching Google's font servers.

// Display serif — headings only, used at >= 28px. Hahmlet (Korean foundry) has no italic:
// accents are carried by colour, and faux italics are disabled in globals.css.
const hahmlet = localFont({
    src: "./fonts/hahmlet-latin-wght.woff2",
    variable: "--font-hahmlet",
    weight: "100 900",
    display: "swap",
    adjustFontFallback: "Times New Roman",
});

// UI / body sans.
const googleSans = localFont({
    src: "./fonts/google-sans-latin-wght.woff2",
    variable: "--font-google-sans",
    weight: "400 700",
    display: "swap",
});

/** Class names that expose --font-hahmlet / --font-google-sans; put on <html>. */
export const fontVariables = `${hahmlet.variable} ${googleSans.variable}`;
