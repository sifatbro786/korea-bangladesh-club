import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import Ornament from "@/components/ui/Ornament";
import SectionLabel from "@/components/ui/SectionLabel";
import { getDictionary } from "@/lib/i18n/server";

export default async function Leadership({ data }) {
    const dict = await getDictionary();
    return (
        <section aria-labelledby="leadership-title" className="container-club section-y">
            <div className="grid gap-14 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-4">
                    <SectionLabel>{data.label}</SectionLabel>
                    <h2 id="leadership-title" className="sr-only">
                        {dict.home.presidentHeading}
                    </h2>
                    <Reveal className="mt-12 w-48 sm:w-56">
                        {/* Source portrait is small (276px): keep it displayed small and framed. */}
                        <div className="frame-lattice aspect-[276/283]">
                            <ClubImage media={data.image} sizes="224px" />
                        </div>
                    </Reveal>
                </div>

                <figure className="md:col-span-8 md:pt-6">
                    <Reveal>
                        <span aria-hidden="true" className="block font-display text-[6rem] leading-[0.5] text-accent">
                            &ldquo;
                        </span>
                        <blockquote className="mt-6 font-display text-[clamp(1.6rem,1.2rem+1.9vw,2.75rem)] font-light leading-[1.15] text-heading">
                            {data.quote}
                        </blockquote>
                    </Reveal>
                    <Reveal delay={120}>
                        <figcaption className="mt-12 max-w-md">
                            <Ornament align="start" />
                            <p className="mt-5 text-label uppercase tracking-label text-heading">{data.name ?? data.role}</p>
                            {data.name ? <p className="mt-1 text-label uppercase tracking-label text-muted">{data.role}</p> : null}
                        </figcaption>
                        <div className="mt-12">
                            <ArrowLink href={data.link.href}>{data.link.label}</ArrowLink>
                        </div>
                    </Reveal>
                </figure>
            </div>
        </section>
    );
}
