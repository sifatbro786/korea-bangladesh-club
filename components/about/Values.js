import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Values({ data }) {
    return (
        <section aria-labelledby="values-title" className="theme-ivory grain relative">
            <div className="container-club section-y relative">
                <div className="grid gap-8 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <SectionLabel>{data.label}</SectionLabel>
                    </div>
                    <SplitHeading id="values-title" className="max-w-[18ch] text-display-md font-light md:col-span-8">
                        {data.title}
                    </SplitHeading>
                </div>

                <ol className="mt-16 border-t border-line md:mt-24">
                    {data.items.map((v, i) => (
                        <Reveal
                            as="li"
                            key={v.title}
                            delay={i * 70}
                            className="group grid gap-4 border-b border-line py-10 transition-colors duration-500 hover:bg-surface-2 md:grid-cols-12 md:items-baseline md:gap-8 md:px-4"
                        >
                            <span className="font-display text-display-sm text-accent md:col-span-2">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-display-sm font-light transition-transform duration-500 ease-club group-hover:translate-x-2 md:col-span-5">
                                {v.title}
                            </h3>
                            <p className="max-w-[44ch] md:col-span-5">{v.body}</p>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}
