"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import Arrow from "@/components/ui/Arrow";
import SectionLabel from "@/components/ui/SectionLabel";

/**
 * Filterable events list.
 * Upcoming rows show a floating image preview that trails the cursor (fine pointers only,
 * never with reduced motion). All preview images are mounted once and cross-faded, so
 * hovering never waits for a download.
 */
export default function EventsBrowser({ categories, upcoming, past }) {
    const [filter, setFilter] = useState("all");
    const [active, setActive] = useState(null);
    const previewRef = useRef(null);
    const listRef = useRef(null);

    const show = (list) => (filter === "all" ? list : list.filter((e) => e.category === filter));
    const upcomingShown = show(upcoming);
    const pastShown = show(past);

    // Cursor-trailing preview (lerped, transform-only, rAF).
    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
        const el = previewRef.current;
        const list = listRef.current;
        if (!mq.matches || !el || !list) return;

        let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
        const loop = () => {
            x += (tx - x) * 0.14;
            y += (ty - y) * 0.14;
            el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -55%)`;
            raf = requestAnimationFrame(loop);
        };
        const onMove = (e) => {
            tx = e.clientX;
            ty = e.clientY;
            if (!raf) {
                x = tx;
                y = ty;
                raf = requestAnimationFrame(loop);
            }
        };
        list.addEventListener("pointermove", onMove);
        return () => {
            list.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
        <div className="container-club pb-[clamp(5.5rem,11vw,10rem)]">
            {/* Filters */}
            <div role="group" aria-label="Filter events" className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-5 md:mt-24">
                {[{ key: "all", label: "All" }, ...categories].map((c) => (
                    <button
                        key={c.key}
                        type="button"
                        aria-pressed={filter === c.key}
                        onClick={() => setFilter(c.key)}
                        className={`relative text-[0.75rem] uppercase tracking-[0.2em] transition-colors hover:text-accent ${
                            filter === c.key ? "text-accent" : "text-heading/70"
                        }`}
                    >
                        {c.label}
                        <span
                            aria-hidden="true"
                            className={`absolute -bottom-[1.3rem] left-0 h-px bg-accent transition-[width] duration-500 ease-club ${filter === c.key ? "w-full" : "w-0"}`}
                        />
                    </button>
                ))}
            </div>

            {/* Upcoming */}
            <section aria-labelledby="upcoming-title" className="mt-16">
                <SectionLabel as="h2">
                    <span id="upcoming-title">Upcoming</span>
                </SectionLabel>

                {upcomingShown.length ? (
                    <ul ref={listRef} className="mt-8 border-t border-line" onPointerLeave={() => setActive(null)}>
                        {upcomingShown.map((e) => (
                            <li key={e.slug} className="border-b border-line">
                                <Link
                                    href={`/events/${e.slug}`}
                                    onPointerEnter={() => setActive(e.slug)}
                                    onFocus={() => setActive(null)}
                                    className="group grid items-center gap-4 py-8 transition-colors duration-500 hover:bg-surface md:grid-cols-12 md:gap-8 md:px-4"
                                >
                                    <span className="flex items-baseline gap-4 md:col-span-3">
                                        <span className="font-display text-[clamp(3rem,5vw,4.5rem)] font-light leading-none text-heading">
                                            {e.dateLabel.day}
                                        </span>
                                        <span className="text-label uppercase leading-relaxed tracking-label text-muted">
                                            {e.dateLabel.month}
                                            <br />
                                            {e.dateLabel.weekday}
                                        </span>
                                    </span>
                                    <span className="md:col-span-6">
                                        <span className="block text-label uppercase tracking-label text-accent">{e.categoryLabel}</span>
                                        <span className="mt-2 block font-display text-display-sm font-light transition-transform duration-500 ease-club group-hover:translate-x-2">
                                            {e.title}
                                        </span>
                                    </span>
                                    <span className="flex items-center justify-between gap-6 text-sm md:col-span-3">
                                        <span>
                                            {e.venue}
                                            <br />
                                            <span className="text-muted">{e.time}</span>
                                        </span>
                                        <Arrow className="text-accent group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-8 border-t border-line pt-8 text-muted">Nothing scheduled in this category yet.</p>
                )}
            </section>

        </div>

        <div className="theme-ivory grain relative">
            <div className="container-club section-y relative">
            {/* Past */}
            <section aria-labelledby="past-title">
                <SectionLabel as="h2">
                    <span id="past-title">Recently at the club</span>
                </SectionLabel>

                {pastShown.length ? (
                    <ul className="mt-12 grid gap-16 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
                        {pastShown.map((e, i) => (
                            <li key={e.slug} className={i % 2 === 0 ? "md:col-span-6" : "md:col-span-5 md:col-start-8 md:mt-32"}>
                                <Link href={`/events/${e.slug}`} className="group block">
                                    <Reveal variant="clip">
                                        <div className={`overflow-hidden ${i % 2 === 0 ? "aspect-[16/11]" : "aspect-[4/5]"}`}>
                                            <ClubImage
                                                media={e.image}
                                                sizes="(min-width: 768px) 45vw, 100vw"
                                                imgClassName="transition-transform duration-[1.2s] ease-club group-hover:scale-[1.04]"
                                            />
                                        </div>
                                    </Reveal>
                                    <p className="mt-6 text-label uppercase tracking-label text-accent">
                                        {e.dateLabel.day} {e.dateLabel.month} · {e.categoryLabel}
                                    </p>
                                    <h3 className="mt-3 max-w-[26ch] text-display-sm font-light transition-colors group-hover:text-accent">{e.title}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-8 border-t border-line pt-8 text-muted">No past events in this category.</p>
                )}
            </section>

            </div>
        </div>

            {/* Floating preview (decorative; hidden from AT) */}
            <div
                ref={previewRef}
                aria-hidden="true"
                className={`pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[4/3] w-[22rem] overflow-hidden transition-opacity duration-300 lg:block ${
                    active ? "opacity-100" : "opacity-0"
                }`}
            >
                {upcoming.map((e) => (
                    <div key={e.slug} className={`absolute inset-0 transition-opacity duration-500 ${active === e.slug ? "opacity-100" : "opacity-0"}`}>
                        <ClubImage media={e.image} sizes="352px" />
                    </div>
                ))}
            </div>
        </>
    );
}
