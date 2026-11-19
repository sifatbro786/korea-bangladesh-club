import Link from "@/components/i18n/LocaleLink";
import { notFound } from "next/navigation";
import ClubImage from "@/components/media/ClubImage";
import Parallax from "@/components/motion/Parallax";
import Arrow from "@/components/ui/Arrow";
import Ornament from "@/components/ui/Ornament";
import JsonLd from "@/components/seo/JsonLd";
import { getPost, getPostSlugs, getPosts, getSiteSettings } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { getDictionary, getLocale, localeAlternates } from "@/lib/i18n/server";
import { localizePath } from "@/lib/i18n/config";

export async function generateStaticParams() {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.excerpt,
        alternates: await localeAlternates(`/news/${slug}`),
        openGraph: {
            type: "article",
            title: post.title,
            description: post.excerpt,
            publishedTime: post.date,
            ...(post.image ? { images: [{ url: post.image.src }] } : {}),
        },
    };
}

function Block({ block }) {
    switch (block.type) {
        case "h":
            return <h2 className="pt-6 text-display-sm font-light">{block.text}</h2>;
        case "list":
            return (
                <ul className="space-y-3">
                    {block.items.map((item) => (
                        <li key={item} className="flex gap-4">
                            <span aria-hidden="true" className="mt-[0.8em] h-px w-5 shrink-0 bg-accent" />
                            {item}
                        </li>
                    ))}
                </ul>
            );
        case "quote":
            return (
                <figure className="my-6 border-l border-accent pl-8">
                    <blockquote className="font-display text-[clamp(1.6rem,1.25rem+1.1vw,2.1rem)] font-light leading-snug text-heading">
                        {block.text}
                    </blockquote>
                    {block.by ? <figcaption className="mt-4 text-label uppercase tracking-label text-muted">{block.by}</figcaption> : null}
                </figure>
            );
        default:
            return <p>{block.text}</p>;
    }
}

export default async function PostPage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();

    const [site, dict, locale] = await Promise.all([getSiteSettings(), getDictionary(), getLocale()]);
    const t = dict.news;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: post.title,
        inLanguage: locale,
        description: post.excerpt,
        datePublished: post.date,
        ...(post.image ? { image: [absoluteUrl(post.image.src)] } : {}),
        mainEntityOfPage: absoluteUrl(localizePath(`/news/${post.slug}`, locale)),
        publisher: {
            "@type": "Organization",
            name: site.name,
            ...(site.logo ? { logo: { "@type": "ImageObject", url: absoluteUrl(site.logo.image.src) } } : {}),
        },
    };

    const all = await getPosts();
    const i = all.findIndex((p) => p.slug === slug);
    const newer = all[i - 1];
    const older = all[i + 1];

    return (
        <article aria-labelledby="post-title">
            <JsonLd data={jsonLd} />
            <header className="container-club pt-36 md:pt-44">
                <Link href="/news" className="group inline-flex items-center gap-3 text-label uppercase tracking-label text-muted hover:text-heading">
                    <Arrow className="rotate-180 group-hover:-translate-x-1" />
                    {t.backToList}
                </Link>
                <div className="mt-12 max-w-5xl">
                    <p className="text-label uppercase tracking-label text-accent">
                        {post.typeLabel} · <time dateTime={post.date}>{post.dateLabel}</time>
                    </p>
                    <h1 id="post-title" className="mt-6 text-display-lg font-light">
                        {post.title}
                    </h1>
                    <p className="mt-8 max-w-[52ch] text-lg text-heading/80">{post.excerpt}</p>
                </div>
            </header>

            {post.image ? (
                <div className="container-club mt-14 md:mt-20">
                    <Parallax amount={6} className="aspect-[4/3] md:aspect-[21/9]">
                        <ClubImage media={post.image} preload quality={60} fade sizes="(min-width: 1440px) 1360px, 100vw" />
                    </Parallax>
                </div>
            ) : null}

            <div className="theme-ivory grain relative mt-16 md:mt-24">
                <div className="container-club section-y relative">
                    <div className="mx-auto max-w-[42rem] space-y-6 text-lg">
                        {post.body.map((block, n) => (
                            <Block key={n} block={block} />
                        ))}
                        {post.signedBy ? (
                            <div className="pt-8">
                                <Ornament align="start" className="max-w-48" />
                                <p className="mt-5 text-label uppercase tracking-label text-heading">{post.signedBy}</p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <nav aria-label={t.moreNav} className="border-t border-line bg-surface">
                <div className="container-club grid md:grid-cols-2">
                    {[
                        { post: older, label: t.older, dir: "prev" },
                        { post: newer, label: t.newer, dir: "next" },
                    ].map(({ post: p, label, dir }) =>
                        p ? (
                            <Link
                                key={dir}
                                href={`/news/${p.slug}`}
                                className={`group block py-12 md:py-16 ${dir === "next" ? "md:border-l md:border-line md:pl-12 md:text-right" : "md:pr-12"}`}
                            >
                                <span className={`flex items-center gap-3 text-label uppercase tracking-label text-muted ${dir === "next" ? "md:justify-end" : ""}`}>
                                    {dir === "prev" ? <Arrow className="rotate-180 group-hover:-translate-x-1" /> : null}
                                    {label}
                                    {dir === "next" ? <Arrow className="group-hover:translate-x-1" /> : null}
                                </span>
                                <span className="mt-4 block font-display text-display-sm font-light transition-colors group-hover:text-accent">{p.title}</span>
                            </Link>
                        ) : (
                            <span key={dir} aria-hidden="true" />
                        ),
                    )}
                </div>
            </nav>
        </article>
    );
}
