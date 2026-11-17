import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Story({ data }) {
    return (
        <section aria-labelledby="story-title" className="bg-bg-warm">
            <div className="container-club section-y">
            <div className="grid gap-14 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-5">
                    <div>
                        <SectionLabel>{data.label}</SectionLabel>
                        <SplitHeading id="story-title" className="mt-8 text-display-md font-light">
                            {data.title}
                        </SplitHeading>
                    </div>
                </div>

                <div className="md:col-span-6 md:col-start-7">
                    <div className="space-y-6 text-lg">
                        {data.body.map((p, i) => (
                            <Reveal key={p.slice(0, 24)} delay={i * 80}>
                                <p className={i === 0 ? "text-heading/90" : ""}>{p}</p>
                            </Reveal>
                        ))}
                    </div>

                    <div className="relative mt-16">
                        <Reveal variant="clip">
                            <div className="aspect-[4/3]">
                                <ClubImage media={data.image} sizes="(min-width: 768px) 48vw, 100vw" />
                            </div>
                        </Reveal>
                        <Reveal delay={200} className="relative -mt-16 ml-auto w-3/5 md:-ml-24 md:mr-0 md:w-1/2">
                            <div className="frame-lattice aspect-[4/3] bg-bg p-1.5">
                                <div className="frame-lattice h-full">
                                    <ClubImage media={data.inset.image} sizes="(min-width: 768px) 24vw, 60vw" />
                                </div>
                            </div>
                            <p className="mt-3 text-label uppercase tracking-label text-muted">{data.inset.caption}</p>
                        </Reveal>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}
