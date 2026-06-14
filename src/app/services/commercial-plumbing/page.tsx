import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/services/ServicePageHero";
import WhenYouNeedUs from "@/components/services/WhenYouNeedUs";
import WhatWeDo from "@/components/services/WhatWeDo";
import HowItWorks from "@/components/services/HowItWorks";
import Pricing from "@/components/services/Pricing";
import WhyUsMini from "@/components/services/WhyUsMini";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Commercial Plumbing — Patriot Plumbing of Texas",
  description:
    "Restaurants, offices, multi-unit buildings. Maintenance contracts and emergency repair in Wilson County. Family-owned since 1983.",
};

export default function CommercialPlumbingPage() {
  return (
    <>
      <ServicePageHero
        eyebrow="SERVICES · 06"
        title="Commercial plumbing, on your schedule."
        subtitle="Restaurants, offices, multi-unit buildings. Maintenance contracts and emergency repair, scoped for businesses."
      />

      <WhenYouNeedUs
        eyebrow="01 · SIGNS"
        title="When to call"
        signals={[
          "You manage a property with recurring plumbing issues",
          "You need a maintenance contract for predictable monthly costs",
          "A code inspection flagged plumbing concerns",
          "You're opening a new location and need rough-in work",
          "Tenant complaints about water pressure, drains, or heat",
        ]}
      />

      <WhatWeDo
        eyebrow="02 · SCOPE"
        title="What we cover"
        items={[
          {
            title: "Maintenance contracts",
            body: "Scheduled visits to keep your building's plumbing ahead of failures. Quarterly, biannual, or custom — priced flat so you can budget.",
          },
          {
            title: "Emergency repair",
            body: "When something breaks at your business, we prioritize commercial calls and work around your hours when we can. We're used to coordinating with property managers.",
          },
          {
            title: "New construction & remodel",
            body: "Restaurant kitchens, office bathrooms, multi-unit rough-ins. We work from your blueprints, pull permits, and coordinate with your GC.",
          },
        ]}
      />

      <HowItWorks
        eyebrow="03 · PROCESS"
        title="How it works"
        steps={[
          {
            number: "01",
            title: "You call",
            body: "Tell us about your property, your situation, and what you need. Maintenance? Emergency? New construction? Each path is different.",
          },
          {
            number: "02",
            title: "We assess",
            body: "Site visit to understand your building, your usage patterns, and your real risks. For contracts, this is also where we scope the recurring work.",
          },
          {
            number: "03",
            title: "We propose",
            body: "Written proposal with scope, schedule, and cost. For contracts, you get a clear annual breakdown. For repairs, you get a real estimate before work starts.",
          },
          {
            number: "04",
            title: "We deliver",
            body: "On-time, code-compliant, with documentation you can hand to your inspector or your owner.",
          },
        ]}
      />

      <Pricing
        eyebrow="04 · PRICING"
        title="What it costs"
        body={
          "Commercial pricing depends on the contract type and the scope of work. Contracts are quoted annually with clear monthly costs. One-off jobs are estimated in writing.\n\nWe'll never tack on emergency rates for routine maintenance visits — if it's covered by your contract, it's covered."
        }
      />

      <WhyUsMini
        eyebrow="05 · WHY US"
        title="Why Patriot Plumbing"
        body={
          "Forty years in Wilson County. Three generations of plumbers in the same family. We pick up the phone, we show up on time, and we stand behind every install with a written warranty.\n\nThat's the whole pitch."
        }
        aboutHref="/about"
      />

      <Footer services={services} />
    </>
  );
}
