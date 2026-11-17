import { Cormorant_Garamond, Jost } from "next/font/google";
import InitialLoader from "@/components/loader/InitialLoader";
import { loaderScript } from "@/components/loader/loaderScript";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";

// Display serif — headings only, used at >= 32px.
const cormorant = Cormorant_Garamond({
    variable: "--font-cormorant",
    subsets: ["latin"],
    style: ["normal", "italic"],
    display: "swap",
});

// UI / body sans.
const jost = Jost({
    variable: "--font-jost",
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: {
        default: "KBBCC — Korea Bangladesh Business & Cultural Club",
        template: "%s — KBBCC",
    },
    description:
        "A private members' club in Dhaka for business leaders, diplomats and families building lasting ties between Korea and Bangladesh.",
};

export const viewport = {
    themeColor: "#0B0C0E",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${cormorant.variable} ${jost.variable} antialiased`}
            // data-loader is set by the inline script before hydration
            suppressHydrationWarning
        >
            <head>
                <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
            </head>
            <body className="min-h-dvh flex flex-col" suppressHydrationWarning>
                <InitialLoader />
                <SmoothScroll />
                {children}
            </body>
        </html>
    );
}
