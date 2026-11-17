import LegalPage from "@/components/page/LegalPage";
import { getLegalPage } from "@/lib/content";

export const metadata = {
    alternates: { canonical: "/terms" },
    title: "Terms of use",
    description: "Terms of use for the Korea Bangladesh Business & Cultural Club website.",
};

export default async function TermsPage() {
    return <LegalPage data={await getLegalPage("terms")} />;
}
