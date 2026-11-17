import ClubImage from "@/components/media/ClubImage";
import Parallax from "@/components/motion/Parallax";
import LineArt from "@/components/ui/LineArt";
import SectionLabel from "@/components/ui/SectionLabel";

/**
 * Inner-page hero: label, two-line display title (second line in accent), intro,
 * then a wide image. The h1 is the LCP candidate and is never hidden; the image is
 * preloaded and only gets a parallax drift (no clip reveal above the fold).
 */
export default function PageHero({ label, title, intro, image, children }) {
    const [first, second] = Array.isArray(title) ? title : [title];

    return (
        <section aria-labelledby="page-title" className="relative overflow-hidden pt-36 md:pt-44">
            <div
                aria-hidden="true"
                className="glow-lamp absolute inset-0"
                style={{ "--gx": "12%", "--gy": "30%", "--gs": "55%", "--ga": 0.11 }}
            />
            <LineArt
                variant="ring"
                className="absolute -right-32 top-16 size-[24rem] text-accent opacity-[0.12] md:-right-24 md:top-10 md:size-[36rem]"
            />
            <div className="container-club relative">
                <SectionLabel>{label}</SectionLabel>
                <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
                    <h1 id="page-title" className="text-display-lg font-light md:col-span-8">
                        <span className="block">{first}</span>
                        {second ? <span className="block text-accent">{second}</span> : null}
                    </h1>
                    {intro ? <p className="max-w-[44ch] text-lg text-heading/80 md:col-span-4">{intro}</p> : null}
                </div>
                {children}
            </div>

            {image ? (
                <div className="container-club relative mt-16 md:mt-24">
                    <Parallax amount={6} className="aspect-[4/3] md:aspect-[21/8]">
                        <ClubImage media={image} preload quality={60} fade sizes="(min-width: 1440px) 1360px, 100vw" />
                    </Parallax>
                </div>
            ) : null}
        </section>
    );
}
