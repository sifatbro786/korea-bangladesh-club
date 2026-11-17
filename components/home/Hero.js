import ClubImage from "@/components/media/ClubImage";
import ArrowLink from "@/components/ui/ArrowLink";
import HeroIntro from "./HeroIntro";

/**
 * Diptych hero: Seoul | Dhaka with no divider. Desktop: both panes are 70% wide and overlap; the Dhaka pane
 * dissolves in at `--split`, which follows the cursor (HeroIntro) — hover a city and it opens up. The two city
 * names sit large on their own sides, fixed (desktop); on mobile a corner caption labels Seoul.
 * The h1 is the LCP element — it is never hidden or masked; only decoration animates.
 */
export default function Hero({ data }) {
    const [seoul, dhaka] = data.panes;

    return (
        <section id="hero" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
            <div className="absolute inset-0 -z-10 grid grid-rows-2 md:block">
                {[seoul, dhaka].map((pane, i) => (
                    <figure
                        key={pane.city}
                        className={`hero-pane relative overflow-hidden md:absolute md:inset-y-0 md:w-[70%] ${i === 0 ? "md:left-0" : "md:right-0"}`}
                    >
                        <ClubImage media={pane.image} preload={i === 0} eager quality={60} sizes="(min-width: 768px) 70vw, 100vw" />
                        {/* Top scrim: keeps the header and city caption legible over bright skies. */}
                        <div aria-hidden="true" className="absolute inset-x-0 top-0 z-[5] h-72 bg-[linear-gradient(to_bottom,rgb(11_12_14/0.6),rgb(11_12_14/0.25)_55%,transparent)]" />
                        <figcaption
                            className={`hero-fade absolute top-24 z-10 text-label uppercase tracking-label text-heading [text-shadow:0_1px_10px_rgb(11_12_14/0.7)] md:top-28 ${
                                i === 0 ? "left-5 md:sr-only" : "sr-only"
                            }`}
                            style={{ "--d": `${0.5 + i * 0.15}s` }}
                        >
                            <span className="block font-medium">{pane.city}</span>
                            <span className="mt-1 block text-heading/75">{pane.coords}</span>
                        </figcaption>
                    </figure>
                ))}
            </div>

            {/* Legibility scrim */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-bg)_8%,rgb(11_12_14/0.55)_45%,rgb(11_12_14/0.15)_75%)]" />
            <div
                aria-hidden="true"
                className="glow-lamp absolute inset-0 -z-10"
                style={{ "--gx": "16%", "--gy": "78%", "--gs": "62%", "--ga": 0.16 }}
            />

            {/* Desktop: each city name sits large on its own side, fixed. Decorative (figcaptions carry the names). */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[22%] -z-10 hidden md:block">
                <div className="container-club flex items-start justify-between">
                    {[seoul, dhaka].map((pane, i) => (
                        <div
                            key={pane.city}
                            className={`hero-fade whitespace-nowrap [text-shadow:0_2px_18px_rgb(11_12_14/0.6)] ${i === 1 ? "text-right" : ""}`}
                            style={{ "--d": `${0.55 + i * 0.15}s` }}
                        >
                            <p className="font-display text-display-sm font-light text-heading">{pane.city}</p>
                            <p className="mt-2 text-label uppercase tracking-label text-heading/75">{pane.coords}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hero-content container-club pb-14 pt-40 md:pb-20">
                {data.kicker ? (
                    <p className="hero-fade eyebrow mb-6 text-accent" style={{ "--d": "0.1s" }}>
                        {data.kicker}
                    </p>
                ) : null}
                <h1 id="hero-title" className="text-display-lg font-light">
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
