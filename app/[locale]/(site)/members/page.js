import Directory from "@/components/members/Directory";
import ExecutiveCommittee from "@/components/members/ExecutiveCommittee";
import OfficeBearers from "@/components/members/OfficeBearers";
import CtaBand from "@/components/page/CtaBand";
import PageHero from "@/components/page/PageHero";
import { getMembersPage } from "@/lib/content";
import { localeAlternates } from "@/lib/i18n/server";

export async function generateMetadata() {
    const { meta } = await getMembersPage();
    return { title: meta.title, description: meta.description, alternates: await localeAlternates("/members") };
}

export default async function MembersPage() {
    const page = await getMembersPage();

    return (
        <>
            <PageHero label={page.hero.label} title={page.hero.title} intro={page.hero.intro} image={page.hero.image} />
            <OfficeBearers data={page.leadership} />
            <ExecutiveCommittee data={page.executive} />
            <Directory data={page.directory} />
            <CtaBand {...page.cta} />
        </>
    );
}
