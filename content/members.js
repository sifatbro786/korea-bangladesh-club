// Members page — mirrors the future MongoDB `members` collection + `pages` document (slug: "members").
// Image fields hold media ids; lib/content.js resolves them.
//
// draft: true = PLACEHOLDER. Every name, company and portrait below is dummy data (Sifat, 2026-11-19)
// so the layout can be reviewed. Portraits are Unsplash stock photos, NOT the people named.
// The club must supply the real committee + member list (and photos) before launch.
//
// country: "kr" | "bd" · rank orders office bearers (lower = more senior).

export const members = {
    meta: {
        title: "Our members",
        description:
            "The office bearers, executive committee and members of the Korea Bangladesh Business & Cultural Club, Dhaka.",
    },
    hero: {
        label: "Our members",
        title: ["The people", "around the table."],
        intro: "Industrialists, investors, diplomats' families and senior professionals from both countries — the membership that gives the club its weight.",
        image: "dinner-longtable-01",
    },

    leadership: {
        draft: true,
        label: "Office bearers",
        title: "Elected to keep the table set.",
        term: "Executive Committee · 2025–2027",
        president: {
            name: "Mahbubur Rahman Chowdhury",
            role: "President",
            org: "Chairman, Nilgiri Knit Composite Ltd.",
            country: "bd",
            image: "member-portrait-08",
            message:
                "Every partnership between our two countries started with one introduction. The club exists to make the next one easier.",
        },
        officers: [
            { rank: 2, name: "Kim Jae-won", role: "Senior Vice President", org: "Managing Director, Hanbit Textiles Bangladesh", country: "kr", image: "member-portrait-03" },
            { rank: 3, name: "Tahmina Haque", role: "Vice President", org: "Director, Bokul Agro Foods", country: "bd", image: "member-portrait-13" },
            { rank: 4, name: "Md. Rafiqul Islam", role: "General Secretary", org: "CEO, Rupsha Shipping Lines", country: "bd", image: "member-portrait-06" },
            { rank: 5, name: "Park Seo-yeon", role: "Joint Secretary", org: "Country Manager, Seorin Logistics", country: "kr", image: "member-portrait-11" },
            { rank: 6, name: "Imtiaz Hossain", role: "Treasurer", org: "Partner, Hossain & Associates, Chartered Accountants", country: "bd", image: "member-portrait-07" },
            { rank: 7, name: "Choi Eun-ji", role: "Organising Secretary", org: "Head of Sourcing, Joyeon Cosmetics", country: "kr", image: "member-portrait-10" },
            { rank: 8, name: "Farhana Rahman", role: "Cultural Affairs Secretary", org: "Founder, Kashful Design Studio", country: "bd", image: "member-portrait-12" },
        ],
    },

    executive: {
        draft: true,
        label: "Executive committee",
        title: "Members of the executive committee.",
        intro: "Elected by the general membership, the committee sets the calendar, reviews applications and represents the club to both governments.",
        items: [
            { name: "Lee Dong-hyun", org: "Director, Daon Engineering", country: "kr", image: "member-portrait-02" },
            { name: "Ashraful Alam", org: "Managing Director, Shapla Leather Works", country: "bd", image: "member-portrait-09" },
            { name: "Han Ji-soo", org: "General Manager, Haneul Electronics BD", country: "kr", image: "member-portrait-04" },
            { name: "Jung Hyun-woo", org: "Resident Director, Mirae Pharma Bangladesh", country: "kr", image: "member-portrait-01" },
            { name: "Kang Mi-rae", org: "Trade Consultant", country: "kr", image: "member-portrait-05" },
        ],
    },

    directory: {
        draft: true,
        label: "Member directory",
        title: "The wider membership.",
        note: "Listed with each member's consent. Contact details are shared with fellow members only, through the secretariat.",
        categories: [
            {
                key: "founding",
                label: "Founding members",
                items: [
                    { name: "Yoon Sang-chul", org: "Chairman, Daeyang Machinery BD", country: "kr", since: 2016 },
                    { name: "Abdul Karim Bhuiyan", org: "Managing Director, Arunima Trading", country: "bd", since: 2016 },
                    { name: "Seo Young-mi", org: "Proprietor, Hana Korean Kitchen, Gulshan", country: "kr", since: 2016 },
                    { name: "Nazrul Islam Khan", org: "Chairman, Padmapar Builders", country: "bd", since: 2016 },
                ],
            },
            {
                key: "life",
                label: "Life members",
                items: [
                    { name: "Oh Jin-woo", org: "Plant Director, Hanbit Textiles Bangladesh", country: "kr", since: 2018 },
                    { name: "Sabrina Akter", org: "Advocate, Supreme Court of Bangladesh", country: "bd", since: 2018 },
                    { name: "Shin Hye-rin", org: "Korean language teacher", country: "kr", since: 2019 },
                    { name: "Tanvir Ahmed", org: "Director, Sonarpur Knitwear Ltd.", country: "bd", since: 2019 },
                    { name: "Moon Ki-tae", org: "Representative, Seorin Logistics", country: "kr", since: 2021 },
                ],
            },
            {
                key: "corporate",
                label: "Corporate members",
                items: [
                    { name: "Hanbit Textiles Bangladesh", org: "Represented by Kim Jae-won", country: "kr", since: 2017 },
                    { name: "Nilgiri Knit Composite Ltd.", org: "Represented by Mahbubur Rahman Chowdhury", country: "bd", since: 2017 },
                    { name: "Haneul Electronics BD", org: "Represented by Han Ji-soo", country: "kr", since: 2020 },
                    { name: "Rupsha Shipping Lines", org: "Represented by Md. Rafiqul Islam", country: "bd", since: 2022 },
                ],
            },
            {
                key: "general",
                label: "General members",
                items: [
                    { name: "Baek Min-jun", org: "Engineer, Daon Engineering", country: "kr", since: 2023 },
                    { name: "Ishrat Jahan Mou", org: "Merchandising Manager, Arunima Trading", country: "bd", since: 2023 },
                    { name: "Ryu Seung-ho", org: "Graduate researcher, BUET", country: "kr", since: 2024 },
                    { name: "Fahim Shahriar", org: "Founder, Kotha Language Centre", country: "bd", since: 2024 },
                    { name: "Song Ha-eun", org: "Programme Officer, Korea–Bangladesh cultural exchange", country: "kr", since: 2025 },
                    { name: "Mehedi Hasan", org: "Import Manager, Bokul Agro Foods", country: "bd", since: 2025 },
                ],
            },
        ],
    },

    cta: {
        title: "Take your seat at the table.",
        body: "Membership is open to business owners, senior professionals and families with genuine ties to Korea or Bangladesh.",
        link: { label: "Apply for membership", href: "/membership" },
        image: "membership-candle-glasses",
    },
};
