import Link from "@/components/i18n/LocaleLink";
import ClubImage from "@/components/media/ClubImage";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import Arrow from "@/components/ui/Arrow";
import ArrowLink from "@/components/ui/ArrowLink";
import SectionLabel from "@/components/ui/SectionLabel";
import { getDictionary } from "@/lib/i18n/server";

/** Homepage "What's on": next upcoming event + the latest past ones (from content/events.js). */
export default async function Events({ data, upcoming, past }) {
    const dict = await getDictionary();
    const featured = upcoming[0];
    const recent = past.slice(0, data.recentCount);

    return (
        <section aria-labelledby="events-title" className="border-t border-line bg-surface">
            <div className="container-club section-y">
                <div className="flex flex-wrap items-end justify-between gap-8">
                    <div>
                        <SectionLabel>{data.label}</SectionLabel>
                        <SplitHeading id="events-title" className="mt-8 text-display-md font-light">
                            {data.title}
                        </SplitHeading>
                    </div>
                    <ArrowLink href={data.link.href}>{data.link.label}</ArrowLink>
                </div>

                {featured ? (
                    <article className="mt-16 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
                        <Reveal variant="clip" className="md:col-span-7">
                            <Link href={`/events/${featured.slug}`} className="block aspect-[4/3]" tabIndex={-1} aria-hidden="true">
                                <ClubImage media={featured.image} sizes="(min-width: 768px) 55vw, 100vw" />
                            </Link>
                        </Reveal>

                        <Reveal delay={150} className="flex flex-col md:col-span-4 md:col-start-9">
                            <p className="eyebrow text-accent">{dict.home.nextOnCalendar}</p>
                            <p className="mt-8 flex items-end gap-5 border-b border-line pb-6">
                                <span className="font-display text-[clamp(3.5rem,6.5vw,5.75rem)] font-light leading-[0.8] text-heading">
                                    {featured.dateLabel.day}
                                </span>
                                <span className="pb-1 text-label uppercase tracking-label text-muted">
                                    {featured.dateLabel.month}
                                </span>
                            </p>
                            <h3 className="mt-8 text-display-sm font-light">
                                <Link href={`/events/${featured.slug}`} className="transition-colors hover:text-accent">
                                    {featured.title}
                                </Link>
                            </h3>
                            <p className="mt-3 text-label uppercase tracking-label text-muted">
                                {featured.venue} · {featured.time}
                            </p>
                            <p className="mt-6">{featured.summary}</p>
                            <div className="mt-10 md:mt-auto md:pt-10">
                                <ArrowLink href={featured.rsvp.href}>{featured.rsvp.label}</ArrowLink>
                            </div>
                        </Reveal>
                    </article>
                ) : null}

                <div className="mt-24 grid gap-16 md:mt-36 md:grid-cols-12 md:gap-8">
                    {recent.map((event, i) => (
                        <article key={event.slug} className={i === 0 ? "md:col-span-5" : "md:col-span-6 md:col-start-7 md:mt-32"}>
                            <Link href={`/events/${event.slug}`} className="group block">
                                <Reveal variant="clip" delay={i * 120}>
                                    <div className={`overflow-hidden ${i === 0 ? "aspect-[4/5]" : "aspect-[16/10]"}`}>
                                        <ClubImage
                                            media={event.image}
                                            sizes="(min-width: 768px) 45vw, 100vw"
                                            imgClassName="transition-transform duration-[1.2s] ease-club group-hover:scale-[1.04]"
                                        />
                                    </div>
                                </Reveal>
                                <p className="mt-6 text-label uppercase tracking-label text-accent">
                                    {event.dateLabel.month} · {event.categoryLabel}
                                </p>
                                <h3 className="mt-3 flex max-w-[26ch] items-start gap-3 text-display-sm font-light transition-colors group-hover:text-accent">
                                    {event.title}
                                    <Arrow className="mt-3 shrink-0 text-[0.6em] opacity-0 transition-opacity group-hover:opacity-100" />
                                </h3>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
