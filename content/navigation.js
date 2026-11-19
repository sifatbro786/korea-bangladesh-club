// Navigation — mirrors the future MongoDB `navigation` document (admin-editable).

export const navigation = {
    primary: [
        { label: "About", href: "/about" },
        { label: "Members", href: "/members" },
        { label: "Events", href: "/events" },
        { label: "Gallery", href: "/gallery" },
        { label: "News", href: "/news" },
        { label: "Contact", href: "/contact" },
    ],
    // Membership is reached only through this CTA (no separate nav item).
    cta: { label: "Apply for membership", shortLabel: "Apply", href: "/membership" },
    footer: {
        club: [
            { label: "About the club", href: "/about" },
            { label: "Our members", href: "/members" },
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
