import LegalPage from "@/components/page/LegalPage";
import { getLegalPage } from "@/lib/content";
import { localeAlternates } from "@/lib/i18n/server";

const pageMetadata = {
    title: "Privacy",
    description: "How the Korea Bangladesh Business & Cultural Club handles personal information collected through this website.",
};

export async function generateMetadata() {
    return { ...pageMetadata, alternates: await localeAlternates("/privacy") };
}

export default async function PrivacyPage() {
    return <LegalPage data={await getLegalPage("privacy")} />;
}
