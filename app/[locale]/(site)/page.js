import Clubhouse from "@/components/home/Clubhouse";
import Events from "@/components/home/Events";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Leadership from "@/components/home/Leadership";
import Membership from "@/components/home/Membership";
import Moments from "@/components/home/Moments";
import Pillars from "@/components/home/Pillars";
import Visit from "@/components/home/Visit";
import JsonLd from "@/components/seo/JsonLd";
import { getEvents, getHomePage, getSiteSettings } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { localeAlternates } from "@/lib/i18n/server";

export async function generateMetadata() {
    return { alternates: await localeAlternates("/") };
}

export default async function HomePage() {
    const [page, site, upcoming, past] = await Promise.all([
        getHomePage(),
        getSiteSettings(),
        getEvents({ status: "upcoming" }),
        getEvents({ status: "past" }),
    ]);

    const { address } = site;
    const organization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.name,
        alternateName: site.shortName,
        url: absoluteUrl("/"),
        ...(site.logo ? { logo: absoluteUrl(site.logo.image.src) } : {}),
        address: {
            "@type": "PostalAddress",
            streetAddress: `${address.line1}, ${address.building}`,
            addressLocality: `${address.area}, ${address.city}`,
            postalCode: address.postcode,
            addressCountry: "BD",
        },
        ...(site.contact.email ? { email: site.contact.email } : {}),
        ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
        ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
    };

    return (
        <>
            <JsonLd data={organization} />
            <Hero data={page.hero} />
            <Intro data={page.intro} />
            <Pillars data={page.pillars} />
            <Clubhouse data={page.clubhouse} />
            <Events data={page.events} upcoming={upcoming} past={past} />
            <Membership data={page.membership} />
            <Leadership data={page.leadership} />
            <Moments data={page.moments} />
            <Visit data={page.visit} site={site} />
        </>
    );
}
