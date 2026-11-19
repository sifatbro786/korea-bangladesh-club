import LegalPage from "@/components/page/LegalPage";
import { getLegalPage } from "@/lib/content";
import { localeAlternates } from "@/lib/i18n/server";

const pageMetadata = {
    title: "Terms of use",
    description: "Terms of use for the Korea Bangladesh Business & Cultural Club website.",
};

export async function generateMetadata() {
    return { ...pageMetadata, alternates: await localeAlternates("/terms") };
}

export default async function TermsPage() {
    return <LegalPage data={await getLegalPage("terms")} />;
}
