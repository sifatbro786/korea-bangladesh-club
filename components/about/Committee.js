import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import Ornament from "@/components/ui/Ornament";
import SectionLabel from "@/components/ui/SectionLabel";
import { getDictionary } from "@/lib/i18n/server";

/** Committee list. Names stay null until the club confirms them — never invented. */
export default async function Committee({ data }) {
    const tbc = (await getDictionary()).common.toBeConfirmed;
    const [lead, ...rest] = data.members;

    return (
        <section id="committee" aria-labelledby="committee-title" className="container-club section-y scroll-mt-20">
            <SectionLabel>{data.label}</SectionLabel>
            <SplitHeading id="committee-title" className="mt-8 max-w-[16ch] text-display-md font-light">
                {data.title}
            </SplitHeading>

            <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
                <Reveal className="md:col-span-4">
                    {lead.image ? (
                        <div className="frame-lattice aspect-[276/283] w-56">
                            <ClubImage media={lead.image} sizes="224px" />
                        </div>
                    ) : null}
                    <p className="mt-6 text-label uppercase tracking-label text-accent">{lead.role}</p>
                    <p className="mt-2 font-display text-display-sm font-light">
                        {lead.name ?? <span className="text-muted">{tbc}</span>}
                    </p>
                </Reveal>

                <ul className="border-t border-line md:col-span-7 md:col-start-6">
                    {rest.map((m, i) => (
                        <Reveal as="li" key={m.role} delay={i * 60} className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-6">
                            <span className="text-label uppercase tracking-label text-heading/80">{m.role}</span>
                            <span className="font-display text-[2rem] font-light leading-none">
                                {m.name ?? <span className="text-muted">{tbc}</span>}
                            </span>
                        </Reveal>
                    ))}
                </ul>
            </div>

            {data.note ? (
                <div className="mt-14 max-w-md">
                    <Ornament align="start" />
                    <p className="mt-4 text-sm text-muted">{data.note}</p>
                </div>
            ) : null}
        </section>
    );
}
