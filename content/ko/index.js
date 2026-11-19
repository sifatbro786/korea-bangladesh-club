// Korean content overrides, keyed by content document. Anything missing falls back to English
// (lib/content.js → deepMerge). Phase 2: these become `locale: "ko"` fields on the Mongo documents.
import { navigationKo } from "./navigation";

export const ko = {
    navigation: navigationKo,
};
