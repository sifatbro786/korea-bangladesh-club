// Contact page — mirrors the future MongoDB `pages` document (slug: "contact").

export const contact = {
    meta: {
        title: "Contact",
        description: "Contact the Korea Bangladesh Business & Cultural Club secretariat in Uttar Badda, Dhaka.",
    },
    hero: {
        label: "Contact",
        title: ["Write to", "the secretariat."],
        intro: "For membership, events, delegations or a first introduction. The secretariat replies within two working days.",
    },
    subjects: [
        { value: "general", label: "General enquiry" },
        { value: "membership", label: "Membership" },
        { value: "events", label: "Events & reservations" },
        { value: "delegations", label: "Delegations & business visits" },
        { value: "press", label: "Press" },
    ],
    form: {
        title: "Send a message.",
        consent: "I agree that the club may store these details to reply to my enquiry.",
        submitLabel: "Send message",
        successTitle: "Thank you — your message is with the secretariat.",
        successBody: "We reply within two working days.",
    },
    map: {
        label: "Map",
        // Google Maps embed loaded only on request (no third-party requests before consent / click).
        embedQuery: "Rupayan Millennium Square, Uttar Badda, Dhaka 1212",
        loadLabel: "Load the map",
        note: "Loading the map connects to Google.",
    },
};
