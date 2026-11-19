import Committee from "@/components/about/Committee";
import Story from "@/components/about/Story";
import Values from "@/components/about/Values";
import CtaBand from "@/components/page/CtaBand";
import PageHero from "@/components/page/PageHero";
import { about } from "@/content/about";
import { getAboutPage } from "@/lib/content";
import { localeAlternates } from "@/lib/i18n/server";

const pageMetadata = {
    title: about.meta.title,
    description: about.meta.description,
};

export async function generateMetadata() {
    return { ...pageMetadata, alternates: await localeAlternates("/about") };
}

export default async function AboutPage() {
    const page = await getAboutPage();

    return (
        <>
            <PageHero label={page.hero.label} title={page.hero.title} intro={page.hero.intro} image={page.hero.image} />
            <Story data={page.story} />
            <Values data={page.values} />
            <Committee data={page.committee} />
            <CtaBand {...page.cta} />
        </>
    );
}
