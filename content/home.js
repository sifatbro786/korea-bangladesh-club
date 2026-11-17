// Homepage content — mirrors the future MongoDB `pages` document (slug: "home").
// Image fields hold media ids (`image` / `images`); lib/content.js resolves them.
//
// `draft: true` = placeholder copy written for layout. It must be confirmed or
// replaced by the club before launch (dates, tiers, quotes are NOT real yet).

export const home = {
    hero: {
        kicker: "A private members’ club in Dhaka",
        title: ["Two nations.", "One table."],
        body: "The Korea Bangladesh Business & Cultural Club brings together the people building trade, investment and friendship between Seoul and Dhaka — in one room, around one table.",
        cta: { label: "Discover the club", href: "#intro" },
        panes: [
            { image: "hero-seoul-alley", city: "Seoul", coords: "37.57° N · 126.98° E" },
            { image: "hero-dhaka-metro", city: "Dhaka", coords: "23.81° N · 90.41° E" },
        ],
    },

    intro: {
        label: "The Club",
        title: "A meeting place for the people who move Korea and Bangladesh forward.",
        body: [
            "KBBCC brings together industrialists, investors, senior professionals and their families from both countries. Some are here to find a partner, some to open a factory, some simply to feel at home far from home.",
            "Whatever brings them, the club gives that work a room, a calendar and a community that has done it before.",
        ],
        address: "10th Floor, Rupayan Millennium Square, Uttar Badda",
    },

    pillars: {
        label: "What we do",
        title: "Three ways we bring two nations closer.",
        items: [
            {
                key: "trade",
                numeral: "i",
                title: "Trade",
                body: "Introductions that become supply chains. Members meet buyers, sourcing partners and logistics specialists across both markets, with the club as a trusted first point of contact.",
                image: "trade-harbour-twilight",
            },
            {
                key: "investment",
                numeral: "ii",
                title: "Investment",
                body: "From first visit to signed agreement. Business exchange sessions put Korean investors and Bangladeshi enterprises at the same table, with the context both sides need.",
                image: "investment-boardroom",
            },
            {
                key: "culture",
                numeral: "iii",
                title: "Culture",
                body: "Friendship beyond the balance sheet. Festivals, dinners and family evenings that celebrate Korean and Bengali traditions — because lasting partnerships are built between people.",
                image: "culture-palace-night",
            },
        ],
    },

    clubhouse: {
        label: "The Clubhouse",
        title: "On the tenth floor, a room of our own.",
        image: "club-candlelit-table",
        inset: { image: "meeting-signing-01", caption: "The Boardroom, Uttar Badda" },
        spaces: [
            {
                name: "The Boardroom",
                body: "Business exchange sessions, visiting delegations and committee meetings.",
            },
            {
                name: "The Members’ Table",
                body: "Dinners and receptions — at the club and with partner venues across Dhaka.",
                draft: true,
            },
            {
                name: "Cultural Evenings",
                body: "Chuseok, Pohela Boishakh and the occasions both communities celebrate together.",
                draft: true,
            },
        ],
    },

    events: {
        label: "Club life",
        title: "What’s on",
        link: { label: "All events", href: "/events" },
        // Pulled from content/events.js: the first upcoming event, then the latest past ones.
        recentCount: 2,
    },

    membership: {
        label: "Membership",
        title: "Membership is an introduction, not a transaction.",
        body: "Membership is open to business owners, senior professionals and families with genuine ties to Korea or Bangladesh. Every application is reviewed by the club committee.",
        tiers: [
            { name: "Corporate", body: "For companies — nominate up to three representatives.", draft: true },
            { name: "Individual", body: "For founders, directors and senior professionals.", draft: true },
            { name: "Family", body: "For members who bring their families into the club’s life.", draft: true },
        ],
        cta: { label: "Begin your application", href: "/membership#apply" },
        image: "membership-candle-glasses",
    },

    leadership: {
        label: "From the President",
        draft: true,
        quote: "When a Korean investor and a Bangladeshi entrepreneur sit at the same table, both countries move forward. Our club exists to set that table — and to make everyone who sits at it feel welcome.",
        name: null, // waiting on the club
        role: "President, KBBCC",
        image: "leader-portrait-01",
        link: { label: "Meet the committee", href: "/about#committee" },
    },

    moments: {
        label: "Moments",
        title: "Evenings worth remembering.",
        link: { label: "Open the gallery", href: "/gallery" },
        images: [
            "meeting-conference-01",
            "dinner-roundtable-01",
            "culture-palace-hall",
            "award-handover-02",
            "group-dinner-01",
            "dinner-roundtable-03",
        ],
    },

    visit: {
        label: "Visit",
        title: "Find us in Uttar Badda.",
        mapLabel: "Open in Google Maps",
        enquiry: {
            title: "Delegations & business visits",
            body: "Planning a trade delegation, an investor visit or a cultural programme? The secretariat can arrange introductions and a briefing at the club.",
            cta: { label: "Send an enquiry", href: "/contact" },
        },
    },
};
