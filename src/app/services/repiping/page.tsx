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
  title: "Repiping — Patriot Plumbing of Texas",
  description:
    "Whole-house and partial repiping in copper or PEX. Built to last forty years. Family-owned, serving Wilson County since 1983.",
};

export default function RepipingPage() {
  return (
    <>
      <ServicePageHero
        eyebrow="SERVICES · 04"
        title="Repiping, done right the first time."
        subtitle="Whole-house or partial. Copper, PEX. We replace old or failing plumbing in a way that lasts another forty years."
      />

      <WhenYouNeedUs
        eyebrow="01 · SIGNS"
        title="When to call"
        signals={[
          "Rust-colored or smelly water from multiple fixtures",
          "Visible corrosion on pipes in your attic or walls",
          "Multiple slab leaks in the same year",
          "Low water pressure throughout the house",
          "Your home was built before 1970 and the pipes are original",
        ]}
      />

      <WhatWeDo
        eyebrow="02 · SCOPE"
        title="What we cover"
        items={[
          {
            title: "Whole-house repiping",
            body: "When the old pipes are at end of life, we replace the entire system. PEX or copper, your choice. We plan the job to minimize disruption — most houses stay livable throughout.",
          },
          {
            title: "Partial repiping",
            body: "Sometimes only the cold lines, or just the bathroom runs, need replacing. We'll inspect first and tell you honestly if a partial job will hold up — or if you'd be throwing money at a problem that's coming back.",
          },
          {
            title: "Repair vs replace assessment",
            body: "Free in-home inspection. We'll tell you whether your situation calls for a small repair or a real repiping job — no upsell.",
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
            body: "Tell us what you're seeing. Old pipes? Slab leaks? We'll book an inspection and ask the right questions to come prepared.",
          },
          {
            number: "02",
            title: "We inspect",
            body: "Free, in-home, no obligation. We assess your current system and recommend the right scope — repair, partial, or full repipe.",
          },
          {
            number: "03",
            title: "We plan the job",
            body: "You get a written estimate with materials, timeline, and disruption expectations. We discuss schedule and any prep you need to do.",
          },
          {
            number: "04",
            title: "We do the work",
            body: "Clean, code-compliant, with the right parts the first time. Walls patched, pressure tested, water back on before we leave.",
          },
        ]}
      />

      <Pricing
        eyebrow="04 · PRICING"
        title="What it costs"
        body={
          "Repiping prices depend on the size of your home, the current pipe material, and how easy it is to access them.\n\nIn-home estimates are free. You get a real number in writing with material breakdown — copper or PEX, your call once you see the price difference and the warranty."
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
