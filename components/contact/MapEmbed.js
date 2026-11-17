"use client";

import { useState } from "react";
import LineArt from "@/components/ui/LineArt";

/**
 * Click-to-load map facade: no Google request (and no ~500 KB of map JS) until the
 * visitor asks for it.
 */
export default function MapEmbed({ query, loadLabel, note, title }) {
    const [loaded, setLoaded] = useState(false);
    const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

    return (
        <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface md:aspect-[5/4]">
            {loaded ? (
                <iframe
                    title={title}
                    src={src}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full grayscale-[0.6] invert-[0.92] hue-rotate-180"
                />
            ) : (
                <div className="grain absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
                    <LineArt variant="lattice" className="absolute inset-8 m-auto size-[70%] text-accent opacity-[0.12]" />
                    <span aria-hidden="true" className="relative size-3 rounded-full border border-accent">
                        <span className="absolute inset-0 animate-ping rounded-full border border-accent motion-reduce:animate-none" />
                    </span>
                    <button
                        type="button"
                        onClick={() => setLoaded(true)}
                        className="relative border border-accent px-6 py-3 text-sm uppercase tracking-[0.18em] text-accent transition-colors duration-500 hover:bg-accent hover:text-bg"
                    >
                        {loadLabel}
                    </button>
                    <p className="relative max-w-[30ch] text-sm text-muted">{note}</p>
                </div>
            )}
        </div>
    );
}
