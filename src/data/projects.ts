// Single source of truth for project entries (the /work gallery).
// Each entry represents a real job done by Patriot Plumbing.
//
// HOW TO ADD A PROJECT:
// 1. Add a photo (or photos) to /public/projects/
//    Naming convention: <service-slug>-<location>-<year>[-before|-after].jpg
//    Example: /public/projects/water-heaters-floresville-2025-after.jpg
// 2. Add an entry to the projects array below with the relevant fields.
//    All photo fields are optional — entries without photos still display
//    using a charcoal placeholder.
// 3. Commit and push. Vercel rebuilds automatically.
//
// The /work page sorts entries by date descending (newest first), so just
// add new entries anywhere in the array.

export type Project = {
  id: string;
  title: string;
  serviceSlug: string;
  location: string;
  date: string;          // YYYY-MM format, e.g. "2025-09"
  description: string;
  mainPhoto?: string;    // path under /public/, e.g. "/projects/foo.jpg"
  beforePhoto?: string;
  afterPhoto?: string;
};

export const projects: Project[] = [
  // Add real projects here. The page will reflect them automatically.
  // When this array is empty, /work shows an editorial empty state
  // inviting visitors to call.
];
