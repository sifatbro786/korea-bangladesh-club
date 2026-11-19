// Korean content overrides, keyed by content document. Anything missing falls back to English
// (lib/content.js → deepMerge). Phase 2: these become `ko` fields on the Mongo documents.
import { aboutKo } from "./about";
import { contactKo } from "./contact";
import { eventCategoriesKo, eventsKo } from "./events";
import { galleryKo } from "./gallery";
import { homeKo } from "./home";
import { legalKo } from "./legal";
import { membersKo } from "./members";
import { membershipKo } from "./membership";
import { navigationKo } from "./navigation";
import { postTypesKo, postsKo } from "./news";

export const ko = {
    navigation: navigationKo,
    home: homeKo,
    about: aboutKo,
    members: membersKo,
    membership: membershipKo,
    contact: contactKo,
    gallery: galleryKo,
    legal: legalKo,
    // Collections: keyed by slug / key, not by index.
    events: eventsKo,
    eventCategories: eventCategoriesKo,
    posts: postsKo,
    postTypes: postTypesKo,
};
