import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import ArrowLink from "@/components/ui/ArrowLink";

/** Closing call-to-action band used at the end of inner pages. */
export default function CtaBand({ title, body, link, image }) {
    return (
        <section aria-labelledby="cta-title" className="grain relative overflow-hidden border-t border-line bg-surface">
            <div className="container-club section-y relative grid items-center gap-12 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-7">
                    <SplitHeading id="cta-title" className="text-display-md font-light">
                        {title}
                    </SplitHeading>
                    {body ? (
                        <Reveal delay={100}>
                            <p className="mt-8 max-w-[48ch]">{body}</p>
                        </Reveal>
                    ) : null}
                    <div className="mt-10">
                        <ArrowLink href={link.href}>{link.label}</ArrowLink>
                    </div>
                </div>
                {image ? (
                    <Reveal variant="clip" className="md:col-span-4 md:col-start-9">
                        <div className="frame-lattice aspect-[4/5]">
                            <ClubImage media={image} sizes="(min-width: 768px) 30vw, 100vw" />
                        </div>
                    </Reveal>
                ) : null}
            </div>
        </section>
    );
}
