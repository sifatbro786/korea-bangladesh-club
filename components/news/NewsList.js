"use client";

import Link from "@/components/i18n/LocaleLink";
import { useState } from "react";
import ClubImage from "@/components/media/ClubImage";
import Arrow from "@/components/ui/Arrow";

/** Filterable list of news + notices. Notices render as compact rows (no image). */
export default function NewsList({ posts, types }) {
    const [filter, setFilter] = useState("all");
    const shown = filter === "all" ? posts : posts.filter((p) => p.type === filter);

    return (
        <>
            <div role="group" aria-label="Filter posts" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-5">
                {[{ key: "all", label: "All" }, ...types].map((t) => (
                    <button
                        key={t.key}
                        type="button"
                        aria-pressed={filter === t.key}
                        onClick={() => setFilter(t.key)}
                        className={`relative text-[0.75rem] uppercase tracking-[0.2em] transition-colors hover:text-accent ${
                            filter === t.key ? "text-accent" : "text-heading/70"
                        }`}
                    >
                        {t.label}
                        <span
                            aria-hidden="true"
                            className={`absolute -bottom-[1.3rem] left-0 h-px bg-accent transition-[width] duration-500 ease-club ${filter === t.key ? "w-full" : "w-0"}`}
                        />
                    </button>
                ))}
            </div>

            <ul className="mt-4">
                {shown.map((p) => (
                    <li key={p.slug} className="border-b border-line">
                        <Link href={`/news/${p.slug}`} className="group grid items-center gap-6 py-8 lg:grid-cols-12 lg:gap-8">
                            <span className="text-label uppercase tracking-label text-muted lg:col-span-2">
                                {p.dateLabel}
                                <span className={`mt-2 block ${p.type === "notice" ? "text-accent" : "text-heading/70"}`}>{p.typeLabel}</span>
                            </span>
                            <span className="lg:col-span-6">
                                <span className="block font-display text-display-sm font-light transition-colors group-hover:text-accent">{p.title}</span>
                                <span className="mt-3 block max-w-[56ch] text-sm">{p.excerpt}</span>
                            </span>
                            <span className="hidden items-center justify-end gap-6 lg:col-span-4 lg:flex">
                                {p.image ? (
                                    <span className="relative aspect-[4/3] w-40 overflow-hidden">
                                        <ClubImage
                                            media={p.image}
                                            sizes="160px"
                                            imgClassName="transition-transform duration-[1.2s] ease-club group-hover:scale-[1.06]"
                                        />
                                    </span>
                                ) : null}
                                <Arrow className="text-accent group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
