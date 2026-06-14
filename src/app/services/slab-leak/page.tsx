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
  title: "Slab Leak Detection & Repair — Patriot Plumbing of Texas",
  description:
    "Hidden slab leak detection and repair in Wilson County. Electronic detection, targeted repair, reroute options. Family-owned since 1983.",
};

export default function SlabLeakPage() {
  return (
    <>
      <ServicePageHero
        eyebrow="SERVICES · 07"
        title="Slab leaks, found and fixed."
        subtitle="Hidden leaks under your foundation are a real problem in Texas. We find them, fix them, and protect your slab from worse damage."
      />

      <WhenYouNeedUs
        eyebrow="01 · SIGNS"
        title="When to call"
        signals={[
          "A spot on your floor feels warm or damp for no reason",
          "You hear water running when nothing is on",
          "Your water bill jumped without explanation",
          "Cracks are appearing in your slab, walls, or ceiling",
          "You see mold or mildew with no obvious water source",
        ]}
      />

      <WhatWeDo
        eyebrow="02 · SCOPE"
        title="What we cover"
        items={[
          {
            title: "Slab leak detection",
            body: "Electronic leak detection and infrared imaging to find the exact location of the leak — without breaking up your floor on a guess.",
          },
          {
            title: "Targeted repair",
            body: "Once located, we discuss your options: a small access cut to reach the broken section, or a reroute that bypasses the slab entirely.",
          },
          {
            title: "Reroute when it makes sense",
            body: "For older homes with multiple failures, sometimes the smart move is to reroute the line through walls or ceilings — no more slab work needed, ever.",
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
            body: "Tell us what you're seeing — warm spots, the sound of running water, a strange water bill. We'll book a detection visit.",
          },
          {
            number: "02",
            title: "We find it",
            body: "Electronic detection, infrared, and pressure testing to locate the leak precisely. We mark the spot and show you what we found.",
          },
          {
            number: "03",
            title: "We discuss options",
            body: "Two main paths: open the slab for a direct repair, or reroute the line. Each has trade-offs. We explain costs, disruption, and long-term implications.",
          },
          {
            number: "04",
            title: "We do the work",
            body: "Direct repair: minimal slab opening, leak fixed, concrete restored. Reroute: lines run through walls or attic, slab left untouched.",
          },
        ]}
      />

      <Pricing
        eyebrow="04 · PRICING"
        title="What it costs"
        body={
          "Slab leak prices depend on the location of the leak, whether you choose direct repair or reroute, and how much concrete work is involved.\n\nDetection visits are charged upfront but credited toward the repair if you proceed with us. You always get a real estimate in writing before any work starts."
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
