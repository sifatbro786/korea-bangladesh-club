import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import SectionLabel from "@/components/ui/SectionLabel";

/** Native <details> accordion: keyboard + screen-reader support for free; CSS animates height where supported. */
export default function Faq({ data }) {
    return (
        <section aria-labelledby="faq-title" className="border-t border-line bg-bg-warm">
            <div className="container-club section-y grid gap-12 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-4">
                    <SectionLabel>{data.label}</SectionLabel>
                    <SplitHeading id="faq-title" className="mt-8 text-display-md font-light">
                        {data.title}
                    </SplitHeading>
                </div>

                <div className="border-t border-line md:col-span-7 md:col-start-6">
                    {data.items.map((item, i) => (
                        <Reveal key={item.q} delay={i * 60}>
                            <details name="membership-faq" className="faq group border-b border-line">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-heading transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                                    <span className="font-display text-[2rem] font-light leading-tight">{item.q}</span>
                                    <span aria-hidden="true" className="relative size-4 shrink-0">
                                        <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                                        <span className="absolute left-0 top-1/2 h-px w-4 rotate-90 bg-current transition-transform duration-500 ease-club group-open:rotate-0" />
                                    </span>
                                </summary>
                                <p className="max-w-[56ch] pb-8">{item.a}</p>
                            </details>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
