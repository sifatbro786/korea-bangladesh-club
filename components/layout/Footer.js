import Image from "next/image";
import Link from "@/components/i18n/LocaleLink";
import { cacheLife } from "next/cache";
import { getNavigation, getSiteSettings } from "@/lib/content";
import Marquee from "@/components/motion/Marquee";
import Arrow from "@/components/ui/Arrow";
import Ornament from "@/components/ui/Ornament";

async function getYear() {
    "use cache";
    cacheLife("days");
    return new Date().getFullYear();
}

function MarqueeRun({ text, hidden = false }) {
    return (
        <span aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
            {[0, 1].map((i) => (
                <span key={i} className="flex items-center">
                    <span className={i === 1 ? "marquee-outline" : ""}>{text}</span>
                    <span aria-hidden="true" className="mx-[0.45em] inline-block size-[0.12em] rounded-full border border-accent" />
                </span>
            ))}
        </span>
    );
}

function FooterColumn({ title, links }) {
    return (
        <div>
            <p className="text-label uppercase tracking-label text-muted">{title}</p>
            <ul className="mt-5 space-y-3">
                {links.map((l) => (
                    <li key={l.href}>
                        <Link href={l.href} className="text-sm text-heading/80 transition-colors hover:text-accent">
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default async function Footer({ locale } = {}) {
    const [site, navigation, year] = await Promise.all([getSiteSettings(locale), getNavigation(locale), getYear()]);
    const { address } = site;

    return (
        <footer className="relative overflow-hidden border-t border-line">
            <div className="overflow-hidden py-10 md:py-14">
                <Marquee className="flex w-max font-display text-[clamp(2.75rem,9vw,8rem)] font-light leading-none text-heading">
                    <MarqueeRun text={site.name} />
                    <MarqueeRun text={site.name} hidden />
                </Marquee>
            </div>

            <div className="container-club">
                <Ornament />

                <div className="grid gap-12 py-16 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-5">
                            {site.logo ? (
                                <Image src={site.logo.image.src} alt={site.logo.image.alt} width={88} height={88} sizes="88px" className="size-[88px]" />
                            ) : null}
                            <p className="font-display text-[2rem] leading-none tracking-[0.18em] text-heading">KBBCC</p>
                        </div>
                        <p className="mt-4 max-w-[28ch] text-sm">{site.name}</p>
                        <address className="mt-8 text-sm not-italic leading-relaxed">
                            {address.line1}, {address.building}
                            <br />
                            {address.area}, {address.city} {address.postcode}, {address.country}
                        </address>
                        {site.contact.email ? (
                            <a href={`mailto:${site.contact.email}`} className="mt-4 block text-sm text-heading hover:text-accent">
                                {site.contact.email}
                            </a>
                        ) : null}
                        {site.contact.phone ? (
                            <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="mt-2 block text-sm text-heading hover:text-accent">
                                {site.contact.phone}
                            </a>
                        ) : null}
                    </div>

                    <div className="grid grid-cols-2 gap-10 md:col-span-6 md:col-start-7 lg:grid-cols-3">
                        <FooterColumn title="The Club" links={navigation.footer.club} />
                        <FooterColumn title="Explore" links={navigation.footer.explore} />
                        {site.social.length ? (
                            <FooterColumn title="Follow" links={site.social.map((s) => ({ label: s.label, href: s.url }))} />
                        ) : null}
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-line py-8 text-label uppercase tracking-label text-muted sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        &copy; {year} {site.shortName}. All rights reserved.
                        <span aria-hidden="true" className="mx-3 text-line">/</span>
                        Developed by{" "}
                        <a
                            href="https://strsltd.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-heading/80 transition-colors hover:text-accent"
                        >
                            STR Solutions LTD
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    </p>
                    <ul className="flex gap-8">
                        {navigation.footer.legal.map((l) => (
                            <li key={l.href}>
                                <Link href={l.href} className="hover:text-heading">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <a href="#top" className="group inline-flex items-center gap-2 hover:text-heading">
                        Back to top
                        <Arrow className="-rotate-90 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
