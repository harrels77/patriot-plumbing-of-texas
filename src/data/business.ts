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
  // The family's mission statement. Quote and attribution are stored without
  // decorative quote marks or the em-dash prefix — those are rendered in JSX.
  // Consumed by the About page Mission section and the Home page Mission section.
  mission: {
    quote:
      "We were born out of a desire to build something lasting for our family — to show the value of perseverance and good, quality, precise work.",
    attribution: "The Patriot Plumbing family",
  },
};
