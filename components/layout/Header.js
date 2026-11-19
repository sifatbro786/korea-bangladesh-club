import { getNavigation, getSiteSettings } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/server";
import HeaderClient from "./HeaderClient";

/** `locale` only where root params are unavailable (global-not-found); otherwise read from the route. */
export default async function Header({ locale } = {}) {
    const [navigation, site, dict] = await Promise.all([getNavigation(locale), getSiteSettings(locale), getDictionary(locale)]);
    return (
        <HeaderClient
            items={navigation.primary}
            cta={navigation.cta}
            logo={site.logo?.image ?? null}
            t={{ ...dict.header, a11y: dict.a11y }}
        />
    );
}
