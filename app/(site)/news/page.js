import Link from "next/link";
import NewsList from "@/components/news/NewsList";
import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/page/PageHero";
import ArrowLink from "@/components/ui/ArrowLink";
import { getPostTypes, getPosts } from "@/lib/content";

export const metadata = {
    alternates: { canonical: "/news" },
    title: "News & notices",
    description: "Club news, stories from events and official notices from the Korea Bangladesh Business & Cultural Club.",
};

export default async function NewsPage() {
    const [posts, types] = await Promise.all([getPosts(), getPostTypes()]);
    const featured = posts.find((p) => p.type === "news" && p.image);

    return (
        <>
            <PageHero
                label="News & notices"
                title={["From the", "secretariat."]}
                intro="Stories from the club’s evenings and the official notices members need — meetings, renewals and opening hours."
            />

            {featured ? (
                <section aria-label="Featured story" className="container-club mt-16 md:mt-24">
                    <article className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
                        <Reveal variant="clip" className="lg:col-span-7">
                            <Link href={`/news/${featured.slug}`} tabIndex={-1} aria-hidden="true" className="block aspect-[16/10]">
                                <ClubImage media={featured.image} sizes="(min-width: 768px) 58vw, 100vw" />
                            </Link>
                        </Reveal>
                        <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
                            <p className="eyebrow text-accent">
                                Latest story · {featured.dateLabel}
                            </p>
                            <h2 className="mt-6 text-display-md font-light">
                                <Link href={`/news/${featured.slug}`} className="transition-colors hover:text-accent">
                                    {featured.title}
                                </Link>
                            </h2>
                            <p className="mt-6">{featured.excerpt}</p>
                            <div className="mt-10">
                                <ArrowLink href={`/news/${featured.slug}`}>Read the story</ArrowLink>
                            </div>
                        </Reveal>
                    </article>
                </section>
            ) : null}

            <section aria-label="All posts" className="theme-ivory grain relative mt-[clamp(5.5rem,11vw,10rem)]">
                <div className="container-club section-y relative">
                    <NewsList posts={posts} types={types} />
                </div>
            </section>
        </>
    );
}
