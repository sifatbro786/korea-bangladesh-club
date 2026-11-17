// News & notices — mirrors the future MongoDB `posts` collection.
// type: "news" (stories, may have an image) | "notice" (official club notices).
// ALL entries are draft placeholders until the club supplies real posts.

export const postTypes = [
    { key: "news", label: "News" },
    { key: "notice", label: "Notices" },
];

export const posts = [
    {
        slug: "annual-general-meeting-2026",
        type: "notice",
        draft: true,
        date: "2026-11-15",
        dateLabel: "15 November 2026",
        title: "Notice of the Annual General Meeting 2026",
        excerpt: "The Annual General Meeting will be held in the club boardroom on Saturday, 20 December 2026 at 4:00 pm.",
        body: [
            { type: "p", text: "Notice is hereby given that the Annual General Meeting of the Korea Bangladesh Business & Cultural Club will be held on Saturday, 20 December 2026 at 4:00 pm in the club boardroom, Rupayan Millennium Square, Uttar Badda." },
            { type: "h", text: "Agenda" },
            { type: "list", items: ["Confirmation of the minutes of the previous AGM", "President's report", "Presentation and adoption of the audited accounts", "Election of the committee for 2027–2028", "Any other business with the permission of the chair"] },
            { type: "p", text: "Members wishing to stand for the committee should send their nomination to the General Secretary by 5 December 2026." },
        ],
        signedBy: "General Secretary, KBBCC",
    },
    {
        slug: "business-exchange-trade-investment-partnership",
        type: "news",
        draft: true,
        date: "2026-11-09",
        dateLabel: "9 November 2026",
        title: "A full house for Trade, Investment, Partnership",
        excerpt: "Members, guests and a visiting Korean delegation filled the boardroom for the club's autumn business exchange.",
        image: "group-conference-wide",
        body: [
            { type: "p", text: "The club's autumn business exchange brought members, guests and a visiting Korean delegation together for an afternoon of briefings and hosted introductions." },
            { type: "p", text: "Sessions covered sourcing in electronics and textiles, the practicalities of setting up in Bangladesh's economic zones, and what Korean buyers look for in a long-term supplier." },
            { type: "quote", text: "The best introductions here don't feel like introductions. They feel like being told who to call by someone who has already done it.", by: "A member, after the session" },
            { type: "p", text: "The afternoon closed with certificates of appreciation for members who have opened new doors between the two business communities, followed by dinner." },
        ],
    },
    {
        slug: "membership-renewals-2027",
        type: "notice",
        draft: true,
        date: "2026-11-01",
        dateLabel: "1 November 2026",
        title: "Membership renewals for 2027",
        excerpt: "Renewals for the 2027 membership year are now open. Please renew by 31 December 2026.",
        body: [
            { type: "p", text: "Membership renewals for 2027 are now open. Members are asked to renew by 31 December 2026 to keep their place on the events calendar." },
            { type: "p", text: "Corporate members may update their nominated representatives at renewal. The secretariat will send each member a renewal letter with payment details." },
        ],
        signedBy: "Treasurer, KBBCC",
    },
    {
        slug: "welcoming-new-members-autumn-2026",
        type: "news",
        draft: true,
        date: "2026-10-20",
        dateLabel: "20 October 2026",
        title: "Welcoming our autumn intake of new members",
        excerpt: "Twelve companies and families joined the club this season — from garment exporters to a Seoul-based engineering firm.",
        image: "dinner-roundtable-02",
        body: [
            { type: "p", text: "This autumn the club welcomed twelve new corporate, individual and family members, introduced to the club at an evening in the boardroom." },
            { type: "p", text: "New members are paired with an existing member for their first season, who makes the first round of introductions." },
        ],
    },
    {
        slug: "club-hours-durga-puja-2026",
        type: "notice",
        draft: true,
        date: "2026-10-05",
        dateLabel: "5 October 2026",
        title: "Club hours during the public holidays",
        excerpt: "The club office will be closed during the public holidays. The boardroom remains bookable on request.",
        body: [{ type: "p", text: "The club office will be closed during the public holidays. Members may still book the boardroom through the secretariat with 48 hours' notice." }],
        signedBy: "Secretariat, KBBCC",
    },
    {
        slug: "chuseok-evening-recap-2026",
        type: "news",
        draft: true,
        date: "2026-09-26",
        dateLabel: "26 September 2026",
        title: "Chuseok at the club",
        excerpt: "Songpyeon, stories and a full table for Korea's harvest festival — our Korean members' welcome to the season.",
        image: "culture-palace-hall",
        body: [
            { type: "p", text: "Chuseok, Korea's harvest festival, is a time to gather with family. This year our Korean members brought it to the club, with songpyeon made by hand and stories of home." },
            { type: "p", text: "Bangladeshi members and their families joined in large numbers — the start, we hope, of a club tradition." },
        ],
    },
];
