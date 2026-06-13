// Shared types for service pages (Water Heaters, Drain Cleaning, etc.).
// Each service page assembles the same shared section components,
// but with different content passed in via props.

// A single signal/symptom that tells a homeowner it's time to call.
// Example: "No hot water, or it runs out fast"
export type Signal = string;

// A sub-service or scope item describing what we do.
// Example: { title: "New installation", body: "Tank or tankless..." }
export type WhatWeDoItem = {
  title: string;
  body: string;
};

// A single step in the "How it works" process.
// Example: { number: "01", title: "You call", body: "Tell us what..." }
export type HowItWorksStep = {
  number: string;
  title: string;
  body: string;
};
