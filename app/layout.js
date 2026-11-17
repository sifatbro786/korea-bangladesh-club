import { Google_Sans, Hahmlet } from "next/font/google";
import InitialLoader from "@/components/loader/InitialLoader";
import { loaderScript } from "@/components/loader/loaderScript";
import SmoothScroll from "@/components/motion/SmoothScroll";
import InlineScript from "@/components/ui/InlineScript";
import "./globals.css";

// Display serif — headings only, used at >= 32px. Hahmlet (Korean foundry, variable 100–900) has no
// italic: accents are carried by colour, and faux italics are disabled in globals.css.
const hahmlet = Hahmlet({
    variable: "--font-hahmlet",
    subsets: ["latin"],
    display: "swap",
});

// UI / body sans.
const googleSans = Google_Sans({
    variable: "--font-google-sans",
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    // Set SITE_URL in the deployment env (e.g. https://kbbcc.org). Used for OG/Twitter image URLs.
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
    title: {
        default: "KBBCC — Korea Bangladesh Business & Cultural Club",
        template: "%s — KBBCC",
    },
    description:
        "A private members' club in Dhaka for business leaders, diplomats and families building lasting ties between Korea and Bangladesh.",
    applicationName: "KBBCC",
    openGraph: {
        type: "website",
        siteName: "KBBCC — Korea Bangladesh Business & Cultural Club",
        locale: "en_US",
    },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false, email: false, address: false },
};

export const viewport = {
    themeColor: "#0B0C0E",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${hahmlet.variable} ${googleSans.variable} antialiased`}
            // data-loader is set by the inline script before hydration
            suppressHydrationWarning
        >
            <head>
                <InlineScript html={loaderScript} />
            </head>
            <body className="min-h-dvh flex flex-col" suppressHydrationWarning>
                <InitialLoader />
                <SmoothScroll />
                {children}
            </body>
        </html>
    );
}
