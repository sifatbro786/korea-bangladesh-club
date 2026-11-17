// Navigation — mirrors the future MongoDB `navigation` document (admin-editable).
// Inner pages are built in Phase 1 steps 12–17; until then these routes 404.

export const navigation = {
    primary: [
        { label: "About", href: "/about" },
        { label: "Membership", href: "/membership" },
        { label: "Events", href: "/events" },
        { label: "Gallery", href: "/gallery" },
        { label: "News", href: "/news" },
        { label: "Contact", href: "/contact" },
    ],
    cta: { label: "Apply for membership", href: "/membership#apply" },
    footer: {
        club: [
            { label: "About the club", href: "/about" },
            { label: "Committee", href: "/about#committee" },
            { label: "Membership", href: "/membership" },
            { label: "Apply", href: "/membership#apply" },
        ],
        explore: [
            { label: "Events", href: "/events" },
            { label: "Gallery", href: "/gallery" },
            { label: "News & notices", href: "/news" },
            { label: "Contact", href: "/contact" },
        ],
        legal: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
        ],
    },
};
