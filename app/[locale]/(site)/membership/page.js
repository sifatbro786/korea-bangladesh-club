import ApplicationForm from "@/components/membership/ApplicationForm";
import Benefits from "@/components/membership/Benefits";
import Faq from "@/components/membership/Faq";
import Process from "@/components/membership/Process";
import Tiers from "@/components/membership/Tiers";
import SplitHeading from "@/components/motion/SplitHeading";
import PageHero from "@/components/page/PageHero";
import Ornament from "@/components/ui/Ornament";
import SectionLabel from "@/components/ui/SectionLabel";
import { membership } from "@/content/membership";
import { getMembershipPage } from "@/lib/content";
import { localeAlternates } from "@/lib/i18n/server";

const pageMetadata = {
    title: membership.meta.title,
    description: membership.meta.description,
};

export async function generateMetadata() {
    return { ...pageMetadata, alternates: await localeAlternates("/membership") };
}

export default async function MembershipPage() {
    const page = await getMembershipPage();
    const categories = page.tiers.items.map(({ key, name }) => ({ key, name }));

    return (
        <>
            <PageHero label={page.hero.label} title={page.hero.title} intro={page.hero.intro} image={page.hero.image} />
            <Benefits data={page.benefits} />
            <Tiers data={page.tiers} />
            <Process data={page.process} />
            <Faq data={page.faq} />

            <section id="apply" aria-labelledby="apply-title" className="theme-ivory grain relative scroll-mt-16">
                <div className="container-club section-y relative grid gap-14 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-4">
                        <SectionLabel>{page.form.label}</SectionLabel>
                        <SplitHeading id="apply-title" className="mt-8 text-display-md font-light">
                            {page.form.title}
                        </SplitHeading>
                        <p className="mt-8 max-w-[36ch]">{page.form.intro}</p>
                        <Ornament align="start" className="mt-10 max-w-48" />
                    </div>
                    <div className="lg:col-span-7 lg:col-start-6">
                        <ApplicationForm data={page.form} categories={categories} />
                    </div>
                </div>
            </section>
        </>
    );
}
