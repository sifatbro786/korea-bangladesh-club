import EventsBrowser from "@/components/events/EventsBrowser";
import PageHero from "@/components/page/PageHero";
import { getEventCategories, getEvents } from "@/lib/content";

export const metadata = {
    alternates: { canonical: "/events" },
    title: "Events",
    description: "Business exchange sessions, cultural evenings and members' dinners at the Korea Bangladesh Business & Cultural Club.",
};

export default async function EventsPage() {
    const [categories, upcoming, past] = await Promise.all([
        getEventCategories(),
        getEvents({ status: "upcoming" }),
        getEvents({ status: "past" }),
    ]);

    return (
        <>
            <PageHero
                label="Events"
                title={["What’s on", "at the club."]}
                intro="Business exchange sessions, the festivals of both countries and members’ dinners. Members are welcome to bring one guest unless noted."
            />
            <EventsBrowser categories={categories} upcoming={upcoming} past={past} />
        </>
    );
}
