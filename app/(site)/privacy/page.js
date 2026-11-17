import LegalPage from "@/components/page/LegalPage";
import { getLegalPage } from "@/lib/content";

export const metadata = {
    alternates: { canonical: "/privacy" },
    title: "Privacy",
    description: "How the Korea Bangladesh Business & Cultural Club handles personal information collected through this website.",
};

export default async function PrivacyPage() {
    return <LegalPage data={await getLegalPage("privacy")} />;
}
