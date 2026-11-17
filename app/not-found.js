import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ArrowLink from "@/components/ui/ArrowLink";
import LineArt from "@/components/ui/LineArt";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata = {
    title: "Page not found",
    robots: { index: false },
};

/** Global 404 (unmatched URLs and notFound()). Renders the site chrome itself. */
export default function NotFound() {
    return (
        <div id="top" className="flex min-h-dvh flex-1 flex-col">
            <Header />
            <main id="main" className="relative flex flex-1 items-center overflow-hidden pb-24 pt-36">
                <div
                    aria-hidden="true"
                    className="glow-lamp absolute inset-0"
                    style={{ "--gx": "70%", "--gy": "45%", "--gs": "50%", "--ga": 0.12 }}
                />
                <LineArt
                    variant="lattice"
                    className="absolute right-[-6rem] top-1/2 size-[28rem] -translate-y-1/2 text-accent opacity-[0.12] md:right-[6%] md:size-[34rem]"
                />
                <div className="container-club relative">
                    <SectionLabel>Error 404</SectionLabel>
                    {/* Decorative numeral drawn via ::before so it is not treated as text content. */}
                    <span
                        aria-hidden="true"
                        data-text="404"
                        className="mt-8 block font-display text-[clamp(5.5rem,2.5rem+14vw,14rem)] font-light leading-[0.8] text-heading/10 before:content-[attr(data-text)]"
                    />
                    <h1 className="-mt-6 max-w-[14ch] text-display-md font-light md:-mt-12">
                        This room is not on the <span className="text-accent">floor plan.</span>
                    </h1>
                    <p className="mt-8 max-w-[44ch]">
                        The page you were looking for has moved, or never existed. These are the rooms people usually look for.
                    </p>
                    <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
                        <ArrowLink href="/">Home</ArrowLink>
                        <ArrowLink href="/events">What’s on</ArrowLink>
                        <ArrowLink href="/membership">Membership</ArrowLink>
                        <ArrowLink href="/contact">Contact</ArrowLink>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
