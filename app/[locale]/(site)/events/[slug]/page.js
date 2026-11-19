import Link from "@/components/i18n/LocaleLink";
import { notFound } from "next/navigation";
import ClubImage from "@/components/media/ClubImage";
import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import Arrow from "@/components/ui/Arrow";
import ArrowLink from "@/components/ui/ArrowLink";
import Ornament from "@/components/ui/Ornament";
import SectionLabel from "@/components/ui/SectionLabel";
import JsonLd from "@/components/seo/JsonLd";
import { getEvent, getEventSlugs, getEvents, getSiteSettings } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { localeAlternates } from "@/lib/i18n/server";

export async function generateStaticParams() {
    const slugs = await getEventSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const event = await getEvent(slug);
    if (!event) return {};
    return {
        title: event.title,
        description: event.summary,
        alternates: await localeAlternates(`/events/${slug}`),
        openGraph: { type: "website", title: event.title, description: event.summary, images: [{ url: event.image.src }] },
    };
}

function Meta({ label, children }) {
    return (
        <div className="border-t border-line pt-4">
            <dt className="text-label uppercase tracking-label text-muted">{label}</dt>
            <dd className="mt-2 text-heading">{children}</dd>
        </div>
    );
}

export default async function EventPage({ params }) {
    const { slug } = await params;
    const event = await getEvent(slug);
    if (!event) notFound();

    const all = await getEvents();
    const more = all.filter((e) => e.slug !== slug && e.status === event.status).slice(0, 2);
    const isUpcoming = event.status === "upcoming";
    const site = await getSiteSettings();
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        description: event.summary,
        startDate: event.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        image: [absoluteUrl(event.image.src)],
        url: absoluteUrl(`/events/${event.slug}`),
        location: {
            "@type": "Place",
            name: event.venue,
            address: {
                "@type": "PostalAddress",
                streetAddress: `${site.address.line1}, ${site.address.building}`,
                addressLocality: `${site.address.area}, ${site.address.city}`,
                postalCode: site.address.postcode,
                addressCountry: "BD",
            },
        },
        organizer: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
    };

    return (
        <article aria-labelledby="event-title">
            <JsonLd data={jsonLd} />
            <header className="container-club pt-36 md:pt-44">
                <Link href="/events" className="group inline-flex items-center gap-3 text-label uppercase tracking-label text-muted hover:text-heading">
                    <Arrow className="rotate-180 group-hover:-translate-x-1" />
                    All events
                </Link>

                <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
                    <div className="md:col-span-8">
                        <p className="text-label uppercase tracking-label text-accent">
                            {event.categoryLabel} · {isUpcoming ? "Upcoming" : "Past event"}
                        </p>
                        <h1 id="event-title" className="mt-6 text-display-lg font-light">
                            {event.title}
                        </h1>
                    </div>
                    <p className="flex items-end gap-4 md:col-span-4 md:justify-end">
                        <span className="font-display text-[clamp(3.5rem,7vw,6.5rem)] font-light leading-[0.8] text-heading">
                            {event.dateLabel.day}
                        </span>
                        <span className="pb-1 text-label uppercase leading-relaxed tracking-label text-muted">
                            {event.dateLabel.month}
                            <br />
                            {event.dateLabel.weekday}
                        </span>
                    </p>
                </div>
            </header>

            <div className="container-club mt-14 md:mt-20">
                <Parallax amount={6} className="aspect-[4/3] md:aspect-[21/9]">
                    <ClubImage media={event.image} preload quality={60} fade sizes="(min-width: 1440px) 1360px, 100vw" />
                </Parallax>
            </div>

            <div className="theme-ivory grain relative mt-16 md:mt-24">
            <div className="container-club section-y relative grid gap-14 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-7">
                    <p className="font-display text-[clamp(1.6rem,1.25rem+1.3vw,2.2rem)] font-light leading-snug text-heading">{event.summary}</p>
                    <div className="mt-10 space-y-6 text-lg">
                        {event.body.map((p) => (
                            <p key={p.slice(0, 24)}>{p}</p>
                        ))}
                    </div>
                </div>

                <aside aria-label="Event details" className="md:col-span-4 md:col-start-9">
                    <div className="md:sticky md:top-28">
                        <dl className="grid gap-6">
                            <Meta label="Date">
                                {event.dateLabel.weekday}, {event.dateLabel.day} {event.dateLabel.month}
                            </Meta>
                            <Meta label="Time">{event.time}</Meta>
                            <Meta label="Venue">{event.venue}</Meta>
                            <Meta label="Category">{event.categoryLabel}</Meta>
                        </dl>
                        <div className="mt-10">
                            {isUpcoming && event.rsvp ? (
                                <ArrowLink href={event.rsvp.href}>{event.rsvp.label}</ArrowLink>
                            ) : (
                                <p className="text-sm text-muted">This event has taken place.</p>
                            )}
                        </div>
                        <Ornament align="start" className="mt-10" />
                    </div>
                </aside>
            </div>
            </div>

            {event.images?.length ? (
                <section aria-labelledby="gallery-title" className="border-t border-line">
                    <div className="container-club section-y">
                        <SectionLabel>From the evening</SectionLabel>
                        <SplitHeading id="gallery-title" className="mt-8 text-display-md font-light">
                            In pictures.
                        </SplitHeading>
                        <ul className="mt-14 grid gap-8 md:grid-cols-12">
                            {event.images.map((img, i) => (
                                <li
                                    key={img.id}
                                    className={["md:col-span-7", "md:col-span-4 md:col-start-9 md:mt-24", "md:col-span-5 md:col-start-3"][i % 3]}
                                >
                                    <Reveal variant="clip" delay={i * 100}>
                                        <div className={i % 3 === 1 ? "aspect-[4/5]" : "aspect-[16/10]"}>
                                            <ClubImage media={img} sizes="(min-width: 768px) 50vw, 100vw" />
                                        </div>
                                    </Reveal>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            ) : null}

            {more.length ? (
                <section aria-labelledby="more-title" className="border-t border-line bg-surface">
                    <div className="container-club section-y">
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <SplitHeading id="more-title" className="text-display-md font-light">
                                {isUpcoming ? "Also coming up." : "More from the club."}
                            </SplitHeading>
                            <ArrowLink href="/events">All events</ArrowLink>
                        </div>
                        <ul className="mt-14 border-t border-line">
                            {more.map((e) => (
                                <li key={e.slug} className="border-b border-line">
                                    <Link
                                        href={`/events/${e.slug}`}
                                        className="group grid items-baseline gap-4 py-8 md:grid-cols-12 md:gap-8"
                                    >
                                        <span className="text-label uppercase tracking-label text-muted md:col-span-3">
                                            {e.dateLabel.day} {e.dateLabel.month}
                                        </span>
                                        <span className="font-display text-display-sm font-light transition-colors group-hover:text-accent md:col-span-8">
                                            {e.title}
                                        </span>
                                        <Arrow className="text-accent group-hover:translate-x-1 md:col-span-1 md:justify-self-end" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            ) : null}
        </article>
    );
}
