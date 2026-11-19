import EventsBrowser from "@/components/events/EventsBrowser";
import PageHero from "@/components/page/PageHero";
import { getEventCategories, getEvents } from "@/lib/content";
import { getDictionary, localeAlternates } from "@/lib/i18n/server";

export async function generateMetadata() {
    const { meta } = (await getDictionary()).events;
    return { title: meta.title, description: meta.description, alternates: await localeAlternates("/events") };
}

export default async function EventsPage() {
    const [dict, categories, upcoming, past] = await Promise.all([
        getDictionary(),
        getEventCategories(),
        getEvents({ status: "upcoming" }),
        getEvents({ status: "past" }),
    ]);

    return (
        <>
            <PageHero label={dict.events.hero.label} title={dict.events.hero.title} intro={dict.events.hero.intro} />
            <EventsBrowser categories={categories} upcoming={upcoming} past={past} t={{ ...dict.events, all: dict.common.all }} />
        </>
    );
}
