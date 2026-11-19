import LegalPage from "@/components/page/LegalPage";
import { getLegalPage } from "@/lib/content";
import { getDictionary, localeAlternates } from "@/lib/i18n/server";

export async function generateMetadata() {
    const meta = (await getDictionary()).legal.privacyMeta;
    return { title: meta.title, description: meta.description, alternates: await localeAlternates("/privacy") };
}

export default async function PrivacyPage() {
    return <LegalPage data={await getLegalPage("privacy")} />;
}
