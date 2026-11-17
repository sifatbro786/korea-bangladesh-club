import DrawLine from "@/components/motion/DrawLine";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Process({ data }) {
    return (
        <section aria-labelledby="process-title" className="container-club section-y" data-process>
            <SectionLabel index="03">{data.label}</SectionLabel>
            <SplitHeading id="process-title" className="mt-8 max-w-[16ch] text-display-md font-light">
                {data.title}
            </SplitHeading>

            <div className="relative mt-16 md:mt-24">
                {/* Track + drawn line: horizontal on desktop, vertical on mobile */}
                <div aria-hidden="true" className="absolute left-[3px] top-0 h-full w-px bg-line lg:left-0 lg:top-[3px] lg:h-px lg:w-full">
                    <DrawLine axis="y" trigger="[data-process]" className="lg:hidden" />
                    <DrawLine axis="x" trigger="[data-process]" className="hidden lg:block" />
                </div>

                <ol className="grid gap-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:gap-8">
                    {data.steps.map((s, i) => (
                        <Reveal as="li" key={s.title} delay={i * 120} className="relative pl-10 lg:pl-0 lg:pt-12">
                            <span
                                aria-hidden="true"
                                className="absolute left-0 top-1 size-[7px] rounded-full border border-accent bg-bg lg:top-0"
                            />
                            <span className="text-label uppercase tracking-label text-accent">Step {i + 1}</span>
                            <h3 className="mt-4 text-display-sm font-light">{s.title}</h3>
                            <p className="mt-4 max-w-[30ch]">{s.body}</p>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}
