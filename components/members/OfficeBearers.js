import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import Ornament from "@/components/ui/Ornament";
import SectionLabel from "@/components/ui/SectionLabel";
import Country from "./Country";

/**
 * President (large, with a short message) + the other office bearers in a staggered
 * portrait run (alternate items drop down — never a flat card grid). Order = `rank`.
 */
export default function OfficeBearers({ data }) {
    const { president, officers } = data;

    return (
        <section id="office-bearers" aria-labelledby="office-bearers-title" className="container-club section-y scroll-mt-20">
            <div className="flex flex-wrap items-end justify-between gap-8">
                <div>
                    <SectionLabel>{data.label}</SectionLabel>
                    <SplitHeading id="office-bearers-title" className="mt-8 max-w-[22ch] text-display-md font-light">
                        {data.title}
                    </SplitHeading>
                </div>
                {data.term ? <p className="text-label uppercase tracking-label text-muted">{data.term}</p> : null}
            </div>

            {/* President */}
            <article aria-labelledby="president-name" className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
                <Reveal variant="clip" className="md:col-span-5">
                    <div className="frame-lattice aspect-[4/5]">
                        <ClubImage media={president.image} sizes="(min-width: 768px) 40vw, 100vw" />
                    </div>
                </Reveal>

                <div className="flex flex-col justify-end md:col-span-6 md:col-start-7 md:pb-4">
                    <Reveal>
                        <p className="text-label uppercase tracking-label text-accent">{president.role}</p>
                        <h3 id="president-name" className="mt-4 font-display text-display-md font-light">
                            {president.name}
                        </h3>
                        <p className="mt-4 text-heading/80">{president.org}</p>
                        <Country code={president.country} className="mt-4" />
                    </Reveal>
                    {president.message ? (
                        <Reveal delay={120}>
                            <figure className="mt-14 border-t border-line pt-10">
                                <blockquote className="font-display text-[clamp(1.6rem,1.25rem+1.4vw,2.4rem)] font-light leading-[1.2] text-heading">
                                    <span aria-hidden="true" className="text-accent">&ldquo;</span>
                                    {president.message}
                                    <span aria-hidden="true" className="text-accent">&rdquo;</span>
                                </blockquote>
                                <figcaption className="sr-only">{president.name}, {president.role}</figcaption>
                            </figure>
                            <Ornament align="start" className="mt-10 max-w-40" />
                        </Reveal>
                    ) : null}
                </div>
            </article>

            {/* Other office bearers */}
            <ul className="mt-24 grid grid-cols-2 gap-x-5 gap-y-14 md:mt-32 lg:grid-cols-4 lg:gap-x-8">
                {officers.map((m, i) => (
                    <Reveal as="li" key={m.name} delay={(i % 4) * 70} className={i % 2 === 1 ? "mt-12 lg:mt-24" : ""}>
                        <article aria-labelledby={`officer-${i}`} className="group">
                            <div className="aspect-[4/5] overflow-hidden">
                                <ClubImage
                                    media={m.image}
                                    sizes="(min-width: 1024px) 22vw, 46vw"
                                    imgClassName="transition-transform duration-[1.2s] ease-club group-hover:scale-[1.04]"
                                />
                            </div>
                            <p className="mt-5 text-label uppercase tracking-label text-accent">{m.role}</p>
                            <h3 id={`officer-${i}`} className="mt-2 text-lg font-medium leading-snug text-heading">
                                {m.name}
                            </h3>
                            <p className="mt-1 text-sm text-body">{m.org}</p>
                            <Country code={m.country} className="mt-3" />
                        </article>
                    </Reveal>
                ))}
            </ul>
        </section>
    );
}
