import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import Ornament from "@/components/ui/Ornament";
import SectionLabel from "@/components/ui/SectionLabel";

/** Address + map link. No embedded map iframe: it would cost ~500 KB of JS for one link. */
export default function Visit({ data, site }) {
    const { address } = site;

    return (
        <section aria-labelledby="visit-title" className="theme-ivory grain relative">
            <div className="container-club section-y relative grid gap-16 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-6">
                    <SectionLabel index="08">{data.label}</SectionLabel>
                    <SplitHeading id="visit-title" className="mt-8 max-w-[12ch] text-display-md font-light">
                        {data.title}
                    </SplitHeading>

                    <Reveal delay={100}>
                        <address className="mt-12 not-italic">
                            <span className="block font-display text-display-sm font-light text-heading">{address.building}</span>
                            <span className="mt-4 block">
                                {address.line1}
                                <br />
                                {address.area}, {address.city} {address.postcode}
                                <br />
                                {address.country}
                            </span>
                        </address>
                        <div className="mt-10">
                            <ArrowLink href={site.mapUrl} external>
                                {data.mapLabel}
                            </ArrowLink>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={150} className="md:col-span-5 md:col-start-8 md:self-end">
                    <Ornament align="start" />
                    <h3 className="mt-8 text-display-sm font-light">{data.enquiry.title}</h3>
                    <p className="mt-6 max-w-[42ch]">{data.enquiry.body}</p>
                    {site.contact.email ? (
                        <a href={`mailto:${site.contact.email}`} className="mt-6 block text-heading hover:text-accent">
                            {site.contact.email}
                        </a>
                    ) : null}
                    <div className="mt-10">
                        <ArrowLink href={data.enquiry.cta.href}>{data.enquiry.cta.label}</ArrowLink>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
