import ClubImage from "@/components/media/ClubImage";
import SplitHeading from "@/components/motion/SplitHeading";
import StackPanels from "@/components/motion/StackPanels";
import LineArt from "@/components/ui/LineArt";
import SectionLabel from "@/components/ui/SectionLabel";

// Per-panel tint keeps the three from reading as copies of one template.
const TINT = ["", "bg-navy/40 mix-blend-multiply", "bg-crimson/25 mix-blend-multiply"];

export default function Pillars({ data }) {
    const total = data.items.length;

    return (
        <section aria-labelledby="pillars-title" className="relative border-t border-line">
            <div className="relative overflow-hidden">
                <LineArt
                    variant="ring"
                    className="absolute -right-24 top-1/2 size-[26rem] -translate-y-1/2 text-accent opacity-[0.14] md:-right-16 md:size-[38rem]"
                />
            <div className="container-club relative pb-16 pt-[clamp(5.5rem,11vw,10rem)] md:pb-24">
                <div className="grid gap-8 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <SectionLabel>{data.label}</SectionLabel>
                    </div>
                    <SplitHeading id="pillars-title" className="max-w-[18ch] text-display-md font-light md:col-span-8">
                        {data.title}
                    </SplitHeading>
                </div>
            </div>
            </div>

            <StackPanels>
                {data.items.map((item, i) => (
                    <article
                        key={item.key}
                        data-panel
                        aria-labelledby={`pillar-${item.key}`}
                        className="h-[100svh] min-h-[560px] overflow-hidden"
                    >
                        <div data-panel-inner className="relative h-full w-full origin-top overflow-hidden bg-bg">
                            <div className="absolute inset-0">
                                <ClubImage media={item.image} quality={60} sizes="100vw" />
                            </div>
                            {TINT[i] ? <div aria-hidden="true" className={`absolute inset-0 z-[1] ${TINT[i]}`} /> : null}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 z-[2] bg-[linear-gradient(to_top,var(--color-bg)_6%,rgb(11_12_14/0.6)_42%,rgb(11_12_14/0.1)_80%)]"
                            />

                            <div className="container-club relative z-[3] flex h-full flex-col justify-between pb-12 pt-24 md:pb-16">
                                <div className="flex items-center justify-between text-label uppercase tracking-label text-heading/70">
                                    <span>{data.label}</span>
                                    <span>
                                        {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                                    <div className="lg:col-span-8">
                                        <span className="font-display text-display-sm text-accent">{item.numeral}.</span>
                                        <h3
                                            id={`pillar-${item.key}`}
                                            className="mt-2 font-display text-[clamp(2.75rem,0.75rem+8vw,9rem)] font-light leading-[0.85] tracking-[-0.01em]"
                                        >
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="max-w-[40ch] text-lg text-heading/85 lg:col-span-4">{item.body}</p>
                                </div>
                            </div>

                            <div data-panel-dim aria-hidden="true" className="pointer-events-none absolute inset-0 z-[4] bg-bg opacity-0" />
                        </div>
                    </article>
                ))}
            </StackPanels>
        </section>
    );
}
