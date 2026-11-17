// About page — mirrors the future MongoDB `pages` document (slug: "about").
// draft: true = placeholder copy; confirm with the club before launch.

export const about = {
    meta: {
        title: "About the club",
        description:
            "The Korea Bangladesh Business & Cultural Club: a private members' club in Dhaka building trade, investment and friendship between the two countries.",
    },
    hero: {
        label: "About the club",
        title: ["A club built on", "introductions."],
        intro: "We exist for one simple reason: business between Korea and Bangladesh moves faster, and lasts longer, when the people doing it know and trust each other.",
        image: "culture-palace-hall",
    },
    story: {
        label: "Our story",
        draft: true,
        title: "From a handful of dinners to a home on the tenth floor.",
        body: [
            "KBBCC began the way most good partnerships do — with a few Korean and Bangladeshi business people meeting over dinner, comparing notes on suppliers, permits and the best place in Dhaka for a proper bowl of naengmyeon.",
            "Those dinners became a calendar, the calendar became a membership, and the membership found a home at Rupayan Millennium Square in Uttar Badda.",
            "Today the club hosts business exchange sessions, visiting delegations and the festivals of both countries — and still keeps a table for anyone who has just arrived in Dhaka and needs a first introduction.",
        ],
        image: "dinner-roundtable-03",
        inset: { image: "meeting-conference-02", caption: "A business exchange session in the boardroom" },
    },
    values: {
        label: "What we stand for",
        title: "Four principles every member signs up to.",
        draft: true,
        items: [
            { title: "Introductions over transactions", body: "We open doors for one another first, and let business follow." },
            { title: "Respect for both cultures", body: "Korean and Bengali traditions are celebrated equally — in the calendar, at the table and in the way we work." },
            { title: "Discretion", body: "What is discussed at the club stays at the club. Members can speak candidly." },
            { title: "Long-term thinking", body: "We judge success in decades of partnership, not in a single season's deals." },
        ],
    },
    committee: {
        label: "The committee",
        title: "The people who keep the table set.",
        draft: true,
        note: "Committee names and portraits will be published once confirmed by the club.",
        members: [
            { role: "President", name: null, image: "leader-portrait-01" },
            { role: "Vice President (Korea)", name: null },
            { role: "Vice President (Bangladesh)", name: null },
            { role: "General Secretary", name: null },
            { role: "Treasurer", name: null },
            { role: "Cultural Affairs Secretary", name: null },
        ],
    },
    cta: {
        title: "Become part of the story.",
        body: "Membership is open to business owners, senior professionals and families with genuine ties to Korea or Bangladesh.",
        link: { label: "Explore membership", href: "/membership" },
        image: "membership-candle-glasses",
    },
};
