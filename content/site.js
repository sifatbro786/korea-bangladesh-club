// Site-wide settings — mirrors the future MongoDB `settings` singleton document.
// Unknown values stay `null` (never invented); the UI must hide a field when it is null.

/** @type {import('@/lib/content').SiteSettings} */
export const site = {
    name: "Korea Bangladesh Business & Cultural Club",
    shortName: "KBBCC",
    logo: null, // waiting on vector logo; source raster is /images/brand/logo-source.jpeg
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
