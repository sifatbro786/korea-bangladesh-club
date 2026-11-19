import InitialLoader from "@/components/loader/InitialLoader";
import { loaderScript } from "@/components/loader/loaderScript";
import SmoothScroll from "@/components/motion/SmoothScroll";
import InlineScript from "@/components/ui/InlineScript";
import { notFound } from "next/navigation";
import { LOCALES, LOCALE_META } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";
import { fontVariables } from "../font-config";
import "../globals.css";

// Root layout lives in app/[locale] (English is served unprefixed via proxy.js rewrite → /en).
// cacheComponents requires every root param to be listed here; both locales are prerendered.
export function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

const baseMetadata = {
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

export async function generateMetadata() {
    const locale = await getLocale();
    return {
        ...baseMetadata,
        openGraph: {
            ...baseMetadata.openGraph,
            locale: LOCALE_META[locale].ogLocale,
            alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
        },
    };
}

export const viewport = {
    themeColor: "#0B0C0E",
};

export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    if (!LOCALES.includes(locale)) notFound();

    return (
        <html
            lang={LOCALE_META[locale].htmlLang}
            className={`${fontVariables} antialiased`}
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
