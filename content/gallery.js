// Gallery — mirrors the future MongoDB `gallery` collection (admin uploads + captions).
// `category` matches content/events.js eventCategories keys.

export const gallery = {
    meta: {
        title: "Gallery",
        description: "Moments from business exchange sessions, cultural evenings and members' dinners at KBBCC.",
    },
    hero: {
        label: "Gallery",
        title: ["Evenings worth", "remembering."],
        intro: "Sessions in the boardroom, long tables after them, and the festivals of two countries. A few of the moments members bring home.",
    },
    items: [
        { image: "group-conference-wide", caption: "The full house at Trade, Investment, Partnership", category: "business", event: "trade-investment-partnership-2026" },
        { image: "dinner-roundtable-01", caption: "Autumn Members' Dinner", category: "members", event: "autumn-members-dinner-2026" },
        { image: "award-handover-01", caption: "A certificate of appreciation for a visiting delegate", category: "business" },
        { image: "culture-palace-night", caption: "Gyeongbokgung by night — the Seoul our Korean members talk about", category: "culture" },
        { image: "meeting-conference-01", caption: "Briefings before the introductions", category: "business" },
        { image: "dinner-roundtable-03", caption: "A private dining room, late in the evening", category: "members" },
        { image: "award-handover-02", caption: "Recognition evening", category: "members", event: "members-recognition-evening-2026" },
        { image: "culture-palace-hall", caption: "Lanterns and columns — the setting for Seollal", category: "culture" },
        { image: "group-dinner-01", caption: "Thumbs up after the season's first dinner", category: "members" },
        { image: "meeting-signing-01", caption: "The head table in the club boardroom", category: "business" },
        { image: "dinner-longtable-01", caption: "The long table", category: "members" },
        { image: "club-candlelit-table", caption: "Setting the table for Pohela Boishakh", category: "culture" },
        { image: "group-lobby-01", caption: "Members and guests before a reception", category: "members" },
        { image: "award-handover-03", caption: "Applause for the members who opened new doors", category: "members" },
        { image: "meeting-conference-02", caption: "Members and Korean delegates in discussion", category: "business" },
    ],
};
