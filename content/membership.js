// Membership page — mirrors the future MongoDB `pages` document (slug: "membership").
// Tiers, fees and process are draft placeholders until the club confirms them.

export const membership = {
    meta: {
        title: "Membership",
        description:
            "Membership of the Korea Bangladesh Business & Cultural Club — benefits, categories and how to apply.",
    },
    hero: {
        label: "Membership",
        title: ["A seat at", "the table."],
        intro: "Membership is open to business owners, senior professionals and families with genuine ties to Korea or Bangladesh. Every application is reviewed by the club committee.",
        image: "membership-candle-glasses",
    },
    benefits: {
        label: "What members receive",
        title: "Less a list of perks, more a set of open doors.",
        draft: true,
        items: [
            { title: "Introductions", body: "Hosted introductions to buyers, suppliers, investors and advisers in both countries." },
            { title: "Business exchange sessions", body: "Priority places at the club's sessions and visiting delegations." },
            { title: "The clubhouse", body: "Use of the boardroom for members' own meetings, by reservation." },
            { title: "Cultural calendar", body: "Seollal, Chuseok, Pohela Boishakh and Eid — celebrated with families welcome." },
            { title: "Members' dinners", body: "Regular dinners at the club and partner venues across Dhaka." },
            { title: "A community abroad", body: "For Korean members new to Dhaka, and Bangladeshi members heading to Seoul — someone who has done it before." },
        ],
    },
    tiers: {
        label: "Categories",
        title: "Three ways to join.",
        draft: true,
        items: [
            {
                key: "corporate",
                name: "Corporate",
                for: "Companies trading or investing between the two countries.",
                includes: ["Up to three nominated representatives", "Boardroom bookings for company meetings", "Company listing in the members' directory"],
                fee: "On request",
            },
            {
                key: "individual",
                name: "Individual",
                for: "Founders, directors and senior professionals.",
                includes: ["Personal membership", "One guest per event", "Full cultural and business calendar"],
                fee: "On request",
            },
            {
                key: "family",
                name: "Family",
                for: "Members who want their families in the club's life.",
                includes: ["Member, spouse and children under 18", "Family events and festivals", "Members' dinners for two"],
                fee: "On request",
            },
        ],
    },
    process: {
        label: "How to apply",
        title: "Four steps, usually within a month.",
        draft: true,
        steps: [
            { title: "Apply", body: "Complete the application below. It takes about five minutes." },
            { title: "Nomination", body: "An existing member supports your application. If you don't know one yet, the secretariat will arrange a meeting." },
            { title: "Committee review", body: "The committee reviews applications at its monthly meeting." },
            { title: "Welcome", body: "You're invited to an introductory evening at the club." },
        ],
    },
    faq: {
        label: "Questions",
        title: "Before you apply.",
        draft: true,
        items: [
            { q: "Do I need to be Korean or Bangladeshi?", a: "No. You need genuine business, professional or family ties to both countries — or a clear intention to build them." },
            { q: "What does membership cost?", a: "Fees depend on the category and are shared by the secretariat once your application is received." },
            { q: "I don't know any members. Can I still apply?", a: "Yes. Apply anyway and the secretariat will arrange an introductory meeting in place of a nomination." },
            { q: "Can my company's representatives change?", a: "Yes. Corporate members can update their nominated representatives once a year." },
        ],
    },
    form: {
        label: "Application",
        title: "Begin your application.",
        intro: "Tell us a little about yourself. The secretariat will be in touch within five working days.",
        consent: "I agree that the club may store these details to process my application.",
        submitLabel: "Submit application",
        successTitle: "Thank you — your application is with the secretariat.",
        successBody: "We'll be in touch within five working days.",
    },
};
