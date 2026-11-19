// Legal pages. DRAFT — written as sensible defaults for a members' club website.
// Must be reviewed by the club's legal adviser before launch.

export const legal = {
    privacy: {
        draft: true,
        title: "Privacy",
        updated: "17 November 2026",
        intro: "This notice explains what personal information the Korea Bangladesh Business & Cultural Club (\"KBBCC\", \"the club\") collects through this website, why, and what you can ask us to do with it.",
        sections: [
            { id: "what-we-collect", title: "What we collect", body: ["When you apply for membership or send us a message, we collect the details you enter: your name, company and designation, email address, phone number, nationality and anything you choose to write to us.", "We do not ask for, and do not want, payment details or identity documents through this website."] },
            { id: "why", title: "Why we use it", body: ["We use these details only to process your membership application, reply to your enquiry, manage event reservations and send you club notices you have asked for.", "We do not sell your information or share it with advertisers."] },
            { id: "who-sees-it", title: "Who sees it", body: ["Your details are seen by the club secretariat and, for membership applications, by the club committee. Our website and email providers process data on our behalf under their own security obligations."] },
            { id: "how-long", title: "How long we keep it", body: ["Enquiries are kept for up to two years. Membership records are kept for as long as you are a member and for six years after, to meet our accounting obligations. Unsuccessful applications are deleted after twelve months."] },
            { id: "cookies", title: "Cookies and local storage", body: ["This website does not use advertising or tracking cookies. It stores one small value in your browser so that the opening animation is not repeated on every visit, and one cookie to remember the language you chose.", "The map on the contact page is only loaded if you choose to load it; doing so connects to Google, whose privacy policy then applies."] },
            { id: "your-rights", title: "Your choices", body: ["You can ask us for a copy of the information we hold about you, ask us to correct it, or ask us to delete it, by writing to the secretariat through the contact page."] },
        ],
    },
    terms: {
        draft: true,
        title: "Terms of use",
        updated: "17 November 2026",
        intro: "These terms apply to your use of this website. Membership of the club is governed separately by the club's constitution and rules.",
        sections: [
            { id: "use", title: "Using this website", body: ["You may use this website to learn about the club, apply for membership and contact the secretariat. Please do not misuse it — for example by attempting to interfere with its security or by submitting false applications."] },
            { id: "content", title: "Content and images", body: ["Text, photographs and the KBBCC emblem on this website belong to the club or are used with permission. Some photographs are used under the Unsplash License and are credited on the gallery page. Please ask before reusing any material."] },
            { id: "accuracy", title: "Accuracy", body: ["We keep event dates, fees and other details as accurate as we can, but they may change. Confirmation from the secretariat takes precedence over this website."] },
            { id: "links", title: "Links to other websites", body: ["Links to other websites, including maps, are provided for convenience. We are not responsible for their content."] },
            { id: "law", title: "Governing law", body: ["These terms are governed by the laws of Bangladesh, and the courts of Dhaka have jurisdiction over any dispute."] },
        ],
    },
};
