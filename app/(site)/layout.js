import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

/** Public site chrome. The admin dashboard (Phase 2) gets its own route group/layout. */
export default function SiteLayout({ children }) {
    return (
        <div id="top" className="flex min-h-dvh flex-1 flex-col">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-bg focus:px-4 focus:py-2 focus:text-heading"
            >
                Skip to content
            </a>
            <Header />
            <main id="main" className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
