import ClubImage from "@/components/media/ClubImage";
import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Clubhouse({ data }) {
    return (
        <section aria-labelledby="clubhouse-title" className="border-t border-line bg-bg-warm">
            <div className="container-club section-y">
                <SectionLabel index="03">{data.label}</SectionLabel>

                <div className="relative mt-12">
                    <Reveal variant="clip">
                        <Parallax amount={8} className="aspect-[4/3] md:aspect-[21/9]">
                            <ClubImage media={data.image} fade sizes="(min-width: 1440px) 1360px, 100vw" />
                        </Parallax>
                    </Reveal>

                    <Reveal
                        delay={250}
                        className="relative z-10 -mt-20 ml-auto w-2/3 max-w-sm md:absolute md:-bottom-16 md:right-10 md:mt-0 md:w-[30%]"
                    >
                        <div className="frame-lattice aspect-[4/3] bg-surface p-1.5">
                            <div className="frame-lattice h-full">
                                <ClubImage media={data.inset.image} sizes="(min-width: 768px) 28vw, 66vw" />
                            </div>
                        </div>
                        <p className="mt-3 text-label uppercase tracking-label text-muted">{data.inset.caption}</p>
                    </Reveal>
                </div>

                <div className="mt-20 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-5">
                        <SplitHeading id="clubhouse-title" className="max-w-[14ch] text-display-md font-light">
                            {data.title}
                        </SplitHeading>
                    </div>

                    <ul className="border-t border-line md:col-span-6 md:col-start-7">
                        {data.spaces.map((space, i) => (
                            <Reveal as="li" key={space.name} delay={i * 90} className="border-b border-line py-7">
                                <h3 className="font-display text-display-sm font-light">{space.name}</h3>
                                <p className="mt-3 max-w-[46ch]">{space.body}</p>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
