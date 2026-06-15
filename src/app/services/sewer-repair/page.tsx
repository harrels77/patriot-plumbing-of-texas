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
  title: "Sewer Repair",
  description:
    "Trenchless and traditional sewer line repair in Wilson County. Camera inspections, root removal, full replacements. Family-owned since 1983.",
};

export default function SewerRepairPage() {
  return (
    <>
      <ServicePageHero
        eyebrow="SERVICES · 05"
        title="Sewer lines, repaired or replaced."
        subtitle="Trenchless and traditional methods. We protect your yard and your sanity — most jobs done without tearing up the lawn."
      />

      <WhenYouNeedUs
        eyebrow="01 · SIGNS"
        title="When to call"
        signals={[
          "Multiple drains backing up at the same time",
          "A patch of unusually green grass over your sewer line",
          "Sewage smell in the yard or around the cleanout",
          "Recurring clogs that come back within weeks",
          "Standing water in the yard with no rain",
        ]}
      />

      <WhatWeDo
        eyebrow="02 · SCOPE"
        title="What we cover"
        items={[
          {
            title: "Camera inspection & diagnosis",
            body: "We send a camera through the line to see exactly what's going on — a crack, a collapse, root intrusion, or something blocking the flow. You see what we see.",
          },
          {
            title: "Trenchless repair (when possible)",
            body: "Modern techniques let us repair many sewer lines without digging up your yard. Pipe bursting, slip lining, point repairs — we use the right method for your situation.",
          },
          {
            title: "Traditional excavation (when needed)",
            body: "Sometimes the only option is to dig. When that's the case, we plan the dig carefully, minimize the disruption, and restore the yard as we found it.",
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
            body: "Tell us what you're seeing. Recurring backups? Smell? Wet patch in the yard? We'll book a camera inspection to find the real cause.",
          },
          {
            number: "02",
            title: "We inspect with camera",
            body: "You watch with us. We point out what's broken, where, and what the fix would look like.",
          },
          {
            number: "03",
            title: "We do the work",
            body: "Trenchless first if it's an option. If excavation is needed, we explain why and you approve the scope before we touch anything.",
          },
          {
            number: "04",
            title: "We restore the yard",
            body: "When digging is required, we backfill, regrade, and leave the lawn in shape to recover. No abandoned trenches.",
          },
        ]}
      />

      <Pricing
        eyebrow="04 · PRICING"
        title="What it costs"
        body={
          "Sewer repair costs depend on what we find in the camera inspection. A point repair is very different from a full line replacement.\n\nCamera inspections are charged but credited toward the work if you proceed. Final estimates are in writing, with method options when more than one applies."
        }
      />

      <WhyUsMini
        eyebrow="05 · WHY US"
        title="Why Patriot Plumbing"
        body={
          "Forty years in Wilson County. Family-owned, family-run. We pick up the phone, we show up on time, and we stand behind every install with a written warranty.\n\nThat's the whole pitch."
        }
        aboutHref="/about"
      />

      <Footer services={services} />
    </>
  );
}
