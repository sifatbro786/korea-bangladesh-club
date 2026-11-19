import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import SectionLabel from "@/components/ui/SectionLabel";
import { getDictionary } from "@/lib/i18n/server";

/** Membership categories as editorial rows (deliberately not a 3-up card grid). */
export default async function Tiers({ data }) {
    const dict = await getDictionary();
    return (
        <section aria-labelledby="tiers-title" className="border-t border-line bg-surface">
            <div className="container-club section-y">
                <SectionLabel>{data.label}</SectionLabel>
                <SplitHeading id="tiers-title" className="mt-8 text-display-md font-light">
                    {data.title}
                </SplitHeading>

                <div className="mt-16 border-t border-line md:mt-20">
                    {data.items.map((t, i) => (
                        <Reveal
                            as="article"
                            key={t.key}
                            delay={i * 80}
                            aria-labelledby={`tier-${t.key}`}
                            className="group grid gap-8 border-b border-line py-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8"
                        >
                            <div className="md:col-span-2 lg:col-span-4">
                                <span className="text-label uppercase tracking-label text-muted">0{i + 1}</span>
                                <h3 id={`tier-${t.key}`} className="mt-3 text-display-md font-light transition-colors duration-500 group-hover:text-accent">
                                    {t.name}
                                </h3>
                            </div>
                            <p className="text-lg text-heading/85 lg:col-span-3">{t.for}</p>
                            <ul className="space-y-3 lg:col-span-3">
                                {t.includes.map((line) => (
                                    <li key={line} className="flex gap-3 text-sm">
                                        <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" />
                                        {line}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col justify-between gap-6 md:col-span-2 md:flex-row md:items-end lg:col-span-2 lg:flex-col lg:items-end lg:text-right">
                                <p>
                                    <span className="block text-label uppercase tracking-label text-muted">{dict.membership.annualFee}</span>
                                    <span className="mt-1 block text-heading">{t.fee}</span>
                                </p>
                                <ArrowLink href="#apply">{dict.common.apply}</ArrowLink>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
