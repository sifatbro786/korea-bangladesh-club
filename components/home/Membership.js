import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import Shutters from "@/components/motion/Shutters";
import SplitHeading from "@/components/motion/SplitHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import SectionLabel from "@/components/ui/SectionLabel";

/** The one crimson band on the page (logo red, deepened). */
export default function Membership({ data }) {
    return (
        <section aria-labelledby="membership-title" className="grain relative overflow-hidden bg-crimson">
            <div
                aria-hidden="true"
                className="glow-lamp absolute inset-0"
                style={{ "--gx": "82%", "--gy": "18%", "--gs": "58%", "--ga": 0.14 }}
            />
            <div className="container-club section-y relative">
                <div className="grid items-center gap-14 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-5">
                        <Shutters className="frame-lattice aspect-[3/4] max-md:max-w-sm">
                            <ClubImage media={data.image} sizes="(min-width: 768px) 38vw, 90vw" />
                        </Shutters>
                    </div>

                    <div className="md:col-span-6 md:col-start-7">
                        <SectionLabel tone="light">
                            {data.label}
                        </SectionLabel>
                        <SplitHeading id="membership-title" className="mt-8 text-display-md font-light">
                            {data.title}
                        </SplitHeading>
                        <Reveal delay={100}>
                            <p className="mt-8 max-w-[48ch] text-heading/80">{data.body}</p>
                        </Reveal>

                        <dl className="mt-12 border-t border-heading/20">
                            {data.tiers.map((tier, i) => (
                                <Reveal key={tier.name} delay={120 + i * 80} className="grid gap-2 border-b border-heading/20 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                                    <dt className="text-label uppercase tracking-label text-heading">{tier.name}</dt>
                                    <dd className="text-sm text-heading/75">{tier.body}</dd>
                                </Reveal>
                            ))}
                        </dl>

                        <div className="mt-12">
                            <ArrowLink href={data.cta.href} className="hover:text-heading/70">
                                {data.cta.label}
                            </ArrowLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
