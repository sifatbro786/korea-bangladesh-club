import { getNavigation, getSiteSettings } from "@/lib/content";
import HeaderClient from "./HeaderClient";

export default async function Header() {
    const [navigation, site] = await Promise.all([getNavigation(), getSiteSettings()]);
    return <HeaderClient items={navigation.primary} cta={navigation.cta} logo={site.logo?.image ?? null} />;
}
