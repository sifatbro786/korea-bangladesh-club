import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Benefits({ data }) {
    return (
        <section aria-labelledby="benefits-title" className="theme-ivory grain relative">
            <div className="container-club section-y relative">
            <div className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-4">
                    <SectionLabel>{data.label}</SectionLabel>
                </div>
                <SplitHeading id="benefits-title" className="max-w-[20ch] text-display-md font-light md:col-span-8">
                    {data.title}
                </SplitHeading>
            </div>

            <ul className="mt-16 grid border-t border-line md:mt-24 md:grid-cols-2 md:gap-x-16">
                {data.items.map((b, i) => (
                    <Reveal as="li" key={b.title} delay={(i % 2) * 90} className="flex gap-6 border-b border-line py-8">
                        <span className="pt-2 text-label tracking-label text-accent">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                            <h3 className="text-display-sm font-light">{b.title}</h3>
                            <p className="mt-3 max-w-[42ch]">{b.body}</p>
                        </div>
                    </Reveal>
                ))}
            </ul>
            </div>
        </section>
    );
}
