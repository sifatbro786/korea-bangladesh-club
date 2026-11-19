import LegalPage from "@/components/page/LegalPage";
import { getLegalPage } from "@/lib/content";
import { getDictionary, localeAlternates } from "@/lib/i18n/server";

export async function generateMetadata() {
    const meta = (await getDictionary()).legal.termsMeta;
    return { title: meta.title, description: meta.description, alternates: await localeAlternates("/terms") };
}

export default async function TermsPage() {
    return <LegalPage data={await getLegalPage("terms")} />;
}
