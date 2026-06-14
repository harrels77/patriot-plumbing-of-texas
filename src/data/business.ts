// Single source of truth for all business identity data.
// Consumed by Schema.org structured data, the Footer, future Open Graph metadata,
// and any other surface that needs business facts.

export const business = {
  name: "Patriot Plumbing of Texas, LLC",
  shortName: "Patriot Plumbing of Texas",
  description:
    "Family-owned plumbing serving South-Central Texas since 1983. Water heaters, drain cleaning, slab leak detection, gas line work, and more across Wilson, Guadalupe, Hays, and Comal counties.",
  url: "https://patriot-plumbing-of-texas.vercel.app",
  telephone: "+12108571727",
  telephoneDisplay: "(210) 857-1727",
  address: {
    street: "202 Cannon Lane",
    city: "Stockdale",
    state: "TX",
    zip: "78160",
    country: "US",
  },
  hours: {
    days: "Monday-Friday",
    open: "08:00",
    close: "17:00",
    display: "Mon–Fri · 8 AM – 5 PM",
  },
  // Schema.org openingHours format: "Mo-Fr 08:00-17:00"
  openingHoursSpec: "Mo-Fr 08:00-17:00",
  founded: 1983,
};
