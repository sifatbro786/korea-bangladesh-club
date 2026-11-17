import GalleryBrowser from "@/components/gallery/GalleryBrowser";
import SplitHeading from "@/components/motion/SplitHeading";
import PageHero from "@/components/page/PageHero";
import Arrow from "@/components/ui/Arrow";
import SectionLabel from "@/components/ui/SectionLabel";
import { gallery } from "@/content/gallery";
import { getEventCategories, getGallery, getPhotoCredits } from "@/lib/content";

export const metadata = {
    alternates: { canonical: "/gallery" },
    title: gallery.meta.title,
    description: gallery.meta.description,
};

export default async function GalleryPage() {
    const [page, categories, credits] = await Promise.all([getGallery(), getEventCategories(), getPhotoCredits()]);

    return (
        <>
            <PageHero label={page.hero.label} title={page.hero.title} intro={page.hero.intro} />
            <GalleryBrowser items={page.items} categories={categories} />

            {credits.length ? (
                <section aria-labelledby="credits-title" className="theme-ivory grain relative">
                    <div className="container-club section-y relative grid gap-10 md:grid-cols-12 md:gap-8">
                        <div className="md:col-span-4">
                            <SectionLabel>Photography</SectionLabel>
                            <SplitHeading id="credits-title" className="mt-8 text-display-sm font-light">
                                With thanks to the photographers.
                            </SplitHeading>
                            <p className="mt-6 max-w-[36ch] text-sm">
                                Club photographs are by members and guests. Additional photographs are used under the Unsplash License.
                            </p>
                        </div>
                        <ul className="border-t border-line md:col-span-7 md:col-start-6">
                            {credits.map((c) => (
                                <li key={c.url} className="border-b border-line">
                                    <a
                                        href={c.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-baseline justify-between gap-6 py-5"
                                    >
                                        <span className="text-heading transition-colors group-hover:text-accent">{c.name}</span>
                                        <span className="flex items-center gap-3 text-right text-sm text-muted">
                                            <span className="hidden sm:inline">{c.alt}</span>
                                            <Arrow direction="out" />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            ) : null}
        </>
    );
}
