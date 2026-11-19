import SectionLabel from "@/components/ui/SectionLabel";
import LineArt from "@/components/ui/LineArt";
import { getDictionary } from "@/lib/i18n/server";

/** Privacy / Terms layout: short dark header, then an ivory reading column with a contents list. */
export default async function LegalPage({ data }) {
    const t = (await getDictionary()).legal;
    return (
        <article aria-labelledby="page-title">
            <header className="relative overflow-hidden pt-36 md:pt-44">
                <LineArt
                    variant="lattice"
                    className="absolute -right-20 top-10 size-[22rem] text-accent opacity-[0.1] md:size-[30rem]"
                />
                <div className="container-club relative pb-16 md:pb-24">
                    <SectionLabel>{t.label}</SectionLabel>
                    <h1 id="page-title" className="mt-10 text-display-lg font-light">
                        {data.title}
                    </h1>
                    <p className="mt-6 text-label uppercase tracking-label text-muted">
                        {t.updated} {data.updated}
                    </p>
                </div>
            </header>

            <div className="theme-ivory grain relative">
                <div className="container-club section-y relative grid gap-14 md:grid-cols-12 md:gap-8">
                    <nav aria-label={t.contents} className="md:col-span-3">
                        <p className="text-label uppercase tracking-label text-muted">{t.contents}</p>
                        <ol className="mt-5 space-y-3 border-l border-line pl-5 text-sm">
                            {data.sections.map((s) => (
                                <li key={s.id}>
                                    <a href={`#${s.id}`} className="text-heading/80 transition-colors hover:text-accent">
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className="max-w-[44rem] md:col-span-8 md:col-start-5">
                        <p className="text-lg text-heading/85">{data.intro}</p>
                        {data.sections.map((s, i) => (
                            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="mt-14 scroll-mt-28 border-t border-line pt-10">
                                <h2 id={`${s.id}-title`} className="flex items-baseline gap-5 text-display-sm font-light">
                                    <span className="text-label tracking-label text-accent">{String(i + 1).padStart(2, "0")}</span>
                                    {s.title}
                                </h2>
                                <div className="mt-6 space-y-5">
                                    {s.body.map((p) => (
                                        <p key={p.slice(0, 24)}>{p}</p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
