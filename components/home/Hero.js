import ClubImage from "@/components/media/ClubImage";
import ArrowLink from "@/components/ui/ArrowLink";
import HeroIntro from "./HeroIntro";

/**
 * Diptych hero: Seoul | Dhaka, joined by a hairline seam.
 * The h1 is the LCP element — it is never hidden or masked; only decoration animates.
 */
export default function Hero({ data }) {
    const [seoul, dhaka] = data.panes;

    return (
        <section id="hero" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
            <div className="absolute inset-0 -z-10 grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">
                {[seoul, dhaka].map((pane, i) => (
                    <figure key={pane.city} className="hero-pane relative overflow-hidden">
                        <ClubImage media={pane.image} preload={i === 0} eager quality={60} sizes="(min-width: 768px) 50vw, 100vw" />
                        <figcaption
                            className={`hero-fade absolute top-24 z-10 text-label uppercase tracking-label text-heading/80 md:top-28 ${
                                i === 0 ? "left-5 md:left-10" : "right-5 text-right md:right-10"
                            }`}
                            style={{ "--d": `${0.5 + i * 0.15}s` }}
                        >
                            <span className="block text-accent">{pane.city}</span>
                            <span className="mt-1 block text-muted">{pane.coords}</span>
                        </figcaption>
                    </figure>
                ))}
            </div>

            {/* Legibility scrim + seam ornament */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-bg)_8%,rgb(11_12_14/0.55)_45%,rgb(11_12_14/0.15)_75%)]" />
            <div
                aria-hidden="true"
                className="glow-lamp absolute inset-0 -z-10"
                style={{ "--gx": "16%", "--gy": "78%", "--gs": "62%", "--ga": 0.16 }}
            />
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 hidden md:block">
                <span className="hero-seam absolute inset-y-0 w-px -translate-x-1/2 bg-line" />
                <span className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-bg" />
            </div>
            <div aria-hidden="true" className="absolute inset-x-0 top-1/2 -z-10 h-px bg-line md:hidden" />

            <div className="hero-content container-club pb-14 pt-40 md:pb-20">
                <p className="hero-fade eyebrow text-accent" style={{ "--d": "0.1s" }}>
                    {data.kicker}
                </p>
                <h1 id="hero-title" className="mt-6 text-display-lg font-light">
                    <span className="block">{data.title[0]}</span>
                    <span className="block text-accent">{data.title[1]}</span>
                </h1>

                <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
                    <p className="hero-fade max-w-[46ch] text-lg text-heading/80 md:col-span-6 lg:col-span-5" style={{ "--d": "0.35s" }}>
                        {data.body}
                    </p>
                    <div className="hero-fade flex items-center justify-between gap-8 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8" style={{ "--d": "0.5s" }}>
                        <ArrowLink href={data.cta.href}>{data.cta.label}</ArrowLink>
                        <span aria-hidden="true" className="flex items-center gap-3 text-label uppercase tracking-label text-muted">
                            Scroll
                            <span className="h-10 w-px bg-line" />
                        </span>
                    </div>
                </div>
            </div>

            <HeroIntro targetId="hero" />
        </section>
    );
}
