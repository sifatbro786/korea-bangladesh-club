import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import Ornament from "@/components/ui/Ornament";
import SectionLabel from "@/components/ui/SectionLabel";
import Country from "./Country";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Member directory grouped by membership category (server-rendered, no JS).
 * Desktop: category title + count on the left, rows on the right; rows read as a ledger.
 */
export default function Directory({ data }) {
    return (
        <section id="directory" aria-labelledby="directory-title" className="grain relative scroll-mt-16 bg-bg-warm">
            <div className="container-club section-y relative">
                <SectionLabel>{data.label}</SectionLabel>
                <SplitHeading id="directory-title" className="mt-8 max-w-[16ch] text-display-md font-light">
                    {data.title}
                </SplitHeading>

                <div className="mt-16 space-y-16 md:mt-24 md:space-y-20">
                    {data.categories.map((cat) => (
                        <section key={cat.key} aria-labelledby={`dir-${cat.key}`} className="grid gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
                            <div className="flex items-baseline justify-between gap-6 lg:col-span-3 lg:block">
                                <h3 id={`dir-${cat.key}`} className="text-lg font-medium text-heading">
                                    {cat.label}
                                </h3>
                                <p className="text-label uppercase tracking-label text-muted lg:mt-3">
                                    {pad(cat.items.length)} {cat.items.length === 1 ? "member" : "members"}
                                </p>
                            </div>

                            <ul className="lg:col-span-9">
                                {cat.items.map((m, i) => (
                                    <Reveal
                                        as="li"
                                        key={m.name}
                                        delay={i * 40}
                                        className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-line py-5 first:pt-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_8rem_6rem] md:items-baseline"
                                    >
                                        <p className="text-heading">{m.name}</p>
                                        <p className="text-right text-label uppercase tracking-label text-muted md:order-last">
                                            {m.since ? <>Since {m.since}</> : null}
                                        </p>
                                        <p className="col-span-2 text-sm md:col-span-1">{m.org}</p>
                                        <Country code={m.country} className="col-span-2 md:col-span-1" />
                                    </Reveal>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>

                {data.note ? (
                    <div className="mt-16 max-w-md">
                        <Ornament align="start" />
                        <p className="mt-4 text-sm text-muted">{data.note}</p>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
