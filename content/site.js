// Site-wide settings — mirrors the future MongoDB `settings` singleton document.
// Unknown values stay `null` (never invented); the UI must hide a field when it is null.

/** @type {import('@/lib/content').SiteSettings} */
export const site = {
    name: "Korea Bangladesh Business & Cultural Club",
    shortName: "KBBCC",
    logo: { image: "brand-logo" }, // raster cut-out of the official emblem; swap for SVG when the club supplies one
    address: {
        building: "Rupayan Millennium Square",
        line1: "Plot Cha-69, 10th Floor",
        area: "Uttar Badda",
        city: "Dhaka",
        postcode: "1212",
        country: "Bangladesh",
    },
    mapUrl: "https://maps.app.goo.gl/9ZjnCaN3ar8NHd378",
    contact: {
        phone: null,
        email: null,
    },
    social: [],
};
