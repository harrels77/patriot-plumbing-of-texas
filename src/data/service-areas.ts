// The cities served by Patriot Plumbing, ordered by geographic proximity
// to the Stockdale headquarters. Used by the Footer, the future Service
// Areas page, and Schema.org LocalBusiness structured data.

export type ServiceArea = {
  city: string;
  county: string;
};

export const serviceAreas: ServiceArea[] = [
  { city: "Stockdale", county: "Wilson" },
  { city: "Sutherland Springs", county: "Wilson" },
  { city: "Floresville", county: "Wilson" },
  { city: "La Vernia", county: "Wilson" },
  { city: "Geronimo", county: "Guadalupe" },
  { city: "McQueeney", county: "Guadalupe" },
  { city: "Seguin", county: "Guadalupe" },
  { city: "San Marcos", county: "Hays" },
  { city: "New Braunfels", county: "Comal" },
];
