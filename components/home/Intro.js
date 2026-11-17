import Reveal from "@/components/motion/Reveal";
import ScrubText from "@/components/motion/ScrubText";
import Ornament from "@/components/ui/Ornament";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Intro({ data }) {
    return (
        <section id="intro" aria-labelledby="intro-title" className="theme-ivory grain relative scroll-mt-16">
            <div className="container-club section-y relative">
            <SectionLabel index="01">{data.label}</SectionLabel>

            <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-8 lg:col-span-7">
                    <ScrubText id="intro-title" className="text-display-md font-light">
                        {data.title}
                    </ScrubText>
                </div>

                <Reveal delay={120} className="md:col-span-4 md:col-start-9 md:pt-28 lg:col-span-4 lg:col-start-9">
                    <div className="space-y-6">
                        {data.body.map((p) => (
                            <p key={p.slice(0, 24)}>{p}</p>
                        ))}
                    </div>
                    <Ornament align="start" className="mt-10" />
                    <p className="mt-5 text-label uppercase tracking-label text-muted">{data.address}</p>
                </Reveal>
            </div>
            </div>
        </section>
    );
}
