import { notFound } from "next/navigation";
import ClubImage from "@/components/media/ClubImage";
import { media } from "@/content/media";
import { getMediaList } from "@/lib/content";

// Dev-only visual check for the media registry and grade treatments.
// Returns 404 in production builds.
export const metadata = { title: "Media preview", robots: { index: false } };

export default async function MediaPreviewPage() {
    if (process.env.NODE_ENV === "production") notFound();

    const items = await getMediaList(Object.keys(media));

    return (
        <main className="mx-auto w-full max-w-7xl px-6 py-16">
            <p className="text-label uppercase tracking-label text-accent">Dev · Media registry</p>
            <h1 className="mt-4 text-display-md">Photo grade preview</h1>
            <p className="mt-4 max-w-[60ch]">
                Left: raw source. Right: the grade the site will use. {items.length} images.
            </p>

            <ul className="mt-12 divide-y divide-line border-y border-line">
                {items.map((m) => (
                    <li key={m.id} className="grid gap-4 py-8 md:grid-cols-2">
                        <div className="aspect-[4/3]">
                            <ClubImage media={{ ...m, grade: "none" }} sizes="(min-width: 768px) 40vw, 100vw" />
                        </div>
                        <div className="aspect-[4/3]">
                            <ClubImage media={m} fade sizes="(min-width: 768px) 40vw, 100vw" />
                        </div>
                        <p className="text-sm text-muted md:col-span-2">
                            <span className="text-heading">{m.id}</span> · {m.width}×{m.height} · grade: {m.grade} · {m.alt}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
