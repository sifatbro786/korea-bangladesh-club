import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";
import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import PageHero from "@/components/page/PageHero";
import ArrowLink from "@/components/ui/ArrowLink";
import Ornament from "@/components/ui/Ornament";
import SectionLabel from "@/components/ui/SectionLabel";
import { contact } from "@/content/contact";
import { getContactPage, getEvents, getSiteSettings } from "@/lib/content";

export const metadata = {
    alternates: { canonical: "/contact" },
    title: contact.meta.title,
    description: contact.meta.description,
};

export default async function ContactPage() {
    const [page, site, upcoming] = await Promise.all([getContactPage(), getSiteSettings(), getEvents({ status: "upcoming" })]);
    const { address } = site;
    const events = upcoming.map(({ slug, title }) => ({ slug, title }));

    return (
        <>
            <PageHero label={page.hero.label} title={page.hero.title} intro={page.hero.intro} />

            <section aria-labelledby="visit-heading" className="container-club section-y grid gap-14 md:grid-cols-12 md:gap-8">
                <Reveal className="md:col-span-5">
                    <SectionLabel>The club</SectionLabel>
                    <h2 id="visit-heading" className="mt-8 text-display-sm font-light">
                        {address.building}
                    </h2>
                    <address className="mt-6 not-italic">
                        {address.line1}
                        <br />
                        {address.area}, {address.city} {address.postcode}
                        <br />
                        {address.country}
                    </address>

                    <dl className="mt-10 grid gap-6">
                        {site.contact.email ? (
                            <div className="border-t border-line pt-4">
                                <dt className="text-label uppercase tracking-label text-muted">Email</dt>
                                <dd className="mt-2">
                                    <a href={`mailto:${site.contact.email}`} className="text-heading hover:text-accent">
                                        {site.contact.email}
                                    </a>
                                </dd>
                            </div>
                        ) : null}
                        {site.contact.phone ? (
                            <div className="border-t border-line pt-4">
                                <dt className="text-label uppercase tracking-label text-muted">Phone</dt>
                                <dd className="mt-2">
                                    <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="text-heading hover:text-accent">
                                        {site.contact.phone}
                                    </a>
                                </dd>
                            </div>
                        ) : null}
                    </dl>

                    <div className="mt-10">
                        <ArrowLink href={site.mapUrl} external>
                            Open in Google Maps
                        </ArrowLink>
                    </div>
                    <Ornament align="start" className="mt-12 max-w-48" />
                </Reveal>

                <Reveal variant="clip" className="md:col-span-6 md:col-start-7">
                    <MapEmbed
                        query={page.map.embedQuery}
                        loadLabel={page.map.loadLabel}
                        note={page.map.note}
                        title={`Map: ${address.building}, ${address.area}`}
                    />
                </Reveal>
            </section>

            <section aria-labelledby="message-title" className="theme-ivory grain relative">
                <div className="container-club section-y relative grid gap-14 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-4">
                        <SectionLabel>Message</SectionLabel>
                        <SplitHeading id="message-title" className="mt-8 text-display-md font-light">
                            {page.form.title}
                        </SplitHeading>
                    </div>
                    <div className="md:col-span-7 md:col-start-6">
                        <ContactForm data={page.form} subjects={page.subjects} events={events} />
                    </div>
                </div>
            </section>
        </>
    );
}
