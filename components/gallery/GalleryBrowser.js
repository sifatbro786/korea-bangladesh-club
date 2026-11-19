"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import Arrow from "@/components/ui/Arrow";
import { setScrollLock } from "@/lib/motion/runtime";

/**
 * Filterable masonry + lightbox (native <dialog>: focus trap, Escape and inert background
 * come from the browser). ← / → and swipe move between photos.
 */
export default function GalleryBrowser({ items, categories, t }) {
    const [filter, setFilter] = useState("all");
    const [index, setIndex] = useState(-1);
    const dialogRef = useRef(null);
    const swipe = useRef(null);

    const shown = filter === "all" ? items : items.filter((i) => i.category === filter);
    const current = index >= 0 ? shown[index] : null;
    const used = categories.filter((c) => items.some((i) => i.category === c.key));

    const open = (i) => {
        setIndex(i);
        dialogRef.current?.showModal();
        document.documentElement.classList.add("menu-open");
        setScrollLock(true);
    };
    const close = () => dialogRef.current?.close();
    const step = (d) => setIndex((i) => (i + d + shown.length) % shown.length);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const onClose = () => {
            setIndex(-1);
            document.documentElement.classList.remove("menu-open");
            setScrollLock(false);
        };
        const onKey = (e) => {
            if (e.key === "ArrowRight") setIndex((i) => (i + 1) % shown.length);
            if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + shown.length) % shown.length);
        };
        dialog.addEventListener("close", onClose);
        dialog.addEventListener("keydown", onKey);
        return () => {
            dialog.removeEventListener("close", onClose);
            dialog.removeEventListener("keydown", onKey);
        };
    }, [shown.length]);

    return (
        <div className="container-club pb-[clamp(5.5rem,11vw,10rem)]">
            <div role="group" aria-label={t.filter} className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-5 md:mt-24">
                {[{ key: "all", label: t.all }, ...used].map((c) => (
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
                <span className="ml-auto text-label uppercase tracking-label text-muted">{shown.length} photographs</span>
            </div>

            <ul className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
                {shown.map((item, i) => (
                    <li key={`${filter}-${item.image.id}`} className="mb-6 break-inside-avoid lg:mb-8">
                        <Reveal variant="clip" delay={(i % 3) * 90}>
                            <button
                                type="button"
                                onClick={() => open(i)}
                                className="group relative block w-full overflow-hidden text-left"
                                style={{ aspectRatio: `${item.image.width} / ${item.image.height}` }}
                                aria-label={`${t.open} ${item.caption}`}
                            >
                                <ClubImage
                                    media={item.image}
                                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                                    imgClassName="transition-transform duration-[1.2s] ease-club group-hover:scale-[1.04]"
                                />
                                <span className="absolute inset-x-0 bottom-0 z-10 translate-y-2 bg-[linear-gradient(to_top,rgb(11_12_14/0.85),transparent)] p-5 pt-12 opacity-0 transition-all duration-500 ease-club group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                                    <span className="block text-label uppercase tracking-label text-accent">{item.categoryLabel}</span>
                                    <span className="mt-1 block text-sm text-heading">{item.caption}</span>
                                </span>
                            </button>
                        </Reveal>
                    </li>
                ))}
            </ul>

            <dialog
                ref={dialogRef}
                aria-label={t.viewer}
                onClick={(e) => e.target === dialogRef.current && close()}
                className="m-0 h-dvh max-h-none w-screen max-w-none bg-bg/95 p-0 text-heading backdrop:bg-bg/80"
            >
                {current ? (
                    <div className="flex h-full flex-col">
                        <div className="container-club flex items-center justify-between py-5 text-label uppercase tracking-label">
                            <span className="text-muted">
                                {String(index + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}
                            </span>
                            <button type="button" onClick={close} className="text-heading hover:text-accent" autoFocus>
                                {t.close}
                            </button>
                        </div>

                        <div
                            className="relative mx-auto w-full flex-1 touch-pan-y px-4 md:px-24"
                            onPointerDown={(e) => (swipe.current = e.clientX)}
                            onPointerUp={(e) => {
                                if (swipe.current == null) return;
                                const dx = e.clientX - swipe.current;
                                swipe.current = null;
                                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
                            }}
                        >
                            <div className="relative h-full w-full">
                                <Image
                                    key={current.image.id}
                                    src={current.image.src}
                                    alt={current.image.alt}
                                    fill
                                    sizes="(min-width: 768px) 85vw, 100vw"
                                    className="object-contain"
                                    {...(current.image.blurDataURL ? { placeholder: "blur", blurDataURL: current.image.blurDataURL } : {})}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => step(-1)}
                                aria-label={t.previous}
                                className="absolute left-2 top-1/2 hidden -translate-y-1/2 p-4 text-heading hover:text-accent md:block"
                            >
                                <Arrow className="rotate-180 text-xl" />
                            </button>
                            <button
                                type="button"
                                onClick={() => step(1)}
                                aria-label={t.next}
                                className="absolute right-2 top-1/2 hidden -translate-y-1/2 p-4 text-heading hover:text-accent md:block"
                            >
                                <Arrow className="text-xl" />
                            </button>
                        </div>

                        <p className="container-club py-6 text-sm">
                            <span className="mr-3 text-label uppercase tracking-label text-accent">{current.categoryLabel}</span>
                            {current.caption}
                        </p>
                    </div>
                ) : null}
            </dialog>
        </div>
    );
}
