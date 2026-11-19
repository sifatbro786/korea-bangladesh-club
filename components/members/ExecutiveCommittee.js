import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import Country from "./Country";

/** Executive committee as a ledger: small portrait, name, company, country. Ivory section for tonal rhythm. */
export default function ExecutiveCommittee({ data }) {
    return (
        <section id="executive-committee" aria-labelledby="executive-title" className="theme-ivory grain relative scroll-mt-16">
            <div className="container-club section-y relative grid gap-14 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-4">
                    <SectionLabel>{data.label}</SectionLabel>
                    <SplitHeading id="executive-title" className="mt-8 text-display-md font-light">
                        {data.title}
                    </SplitHeading>
                    {data.intro ? <p className="mt-8 max-w-[38ch]">{data.intro}</p> : null}
                </div>

                <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
                    {data.items.map((m, i) => (
                        <Reveal as="li" key={m.name} delay={i * 60} className="group flex items-center gap-5 border-b border-line py-5 sm:gap-7">
                            <div className="aspect-[4/5] w-16 shrink-0 overflow-hidden sm:w-20">
                                {m.image ? (
                                    <ClubImage
                                        media={m.image}
                                        sizes="80px"
                                        imgClassName="grayscale-[35%] transition-[filter] duration-500 group-hover:grayscale-0"
                                    />
                                ) : null}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-lg font-medium leading-snug text-heading">{m.name}</p>
                                <p className="mt-1 text-sm">{m.org}</p>
                            </div>
                            <Country code={m.country} className="hidden shrink-0 sm:inline-flex" />
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}
