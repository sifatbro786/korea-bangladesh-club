import ClubImage from "@/components/media/ClubImage";
import SplitHeading from "@/components/motion/SplitHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import LineArt from "@/components/ui/LineArt";
import SectionLabel from "@/components/ui/SectionLabel";
import MomentsTrack from "./MomentsTrack";
import { getDictionary } from "@/lib/i18n/server";

// Varied widths/heights keep the strip editorial rather than a uniform carousel.
const SHAPES = [
    "w-[78vw] aspect-[4/5] lg:w-[26vw]",
    "w-[86vw] aspect-[16/10] self-end lg:w-[38vw]",
    "w-[70vw] aspect-[3/4] lg:w-[22vw]",
    "w-[86vw] aspect-[4/3] self-center lg:w-[32vw]",
    "w-[78vw] aspect-[4/5] self-end lg:w-[24vw]",
    "w-[86vw] aspect-[16/10] lg:w-[36vw]",
];

export default async function Moments({ data }) {
    const dict = await getDictionary();
    const header = (
        <div className="container-club relative flex flex-wrap items-end justify-between gap-8">
            <LineArt
                variant="lattice"
                className="absolute -left-10 -top-24 size-72 text-accent opacity-[0.1] md:-left-24 md:-top-40 md:size-[30rem]"
            />
            <div className="relative">
                <SectionLabel>{data.label}</SectionLabel>
                <SplitHeading id="moments-title" className="mt-8 text-display-md font-light">
                    {data.title}
                </SplitHeading>
            </div>
            <ArrowLink href={data.link.href} className="relative">
                {data.link.label}
            </ArrowLink>
        </div>
    );

    return (
        <section aria-labelledby="moments-title" className="overflow-hidden border-t border-line">
            <MomentsTrack header={header} label={dict.home.momentsTrack}>
                {data.images.map((image, i) => (
                    <figure key={image.id} className={`relative shrink-0 snap-start ${SHAPES[i % SHAPES.length]}`}>
                        <ClubImage media={image} sizes="(min-width: 1024px) 38vw, 86vw" />
                    </figure>
                ))}
            </MomentsTrack>
        </section>
    );
}
