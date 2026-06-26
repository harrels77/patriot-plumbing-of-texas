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
  title: "Drain Cleaning",
  description:
    "Sink, tub, mainline drain clearing and hydro-jetting in Wilson County. Family-owned, since 1983.",
};

export default function DrainCleaningPage() {
  return (
    <>
      <ServicePageHero
        slug="drain-cleaning"
        eyebrow="SERVICES · 03"
        title="Drains, cleared right."
        subtitle="Slow sinks, blocked toilets, mainline backups. We clear them without tearing up your home."
      />

      <WhenYouNeedUs
        eyebrow="01 · SIGNS"
        title="When to call"
        signals={[
          "Water draining slowly from a sink, tub, or shower",
          "Gurgling sounds from drains or toilets",
          "A bad smell coming from the drains",
          "Multiple drains backing up at once",
          "Toilet bubbles or overflows when you run the washing machine",
        ]}
      />

      <WhatWeDo
        eyebrow="02 · SCOPE"
        title="What we cover"
        items={[
          {
            title: "Sink, tub, and shower drains",
            body: "Hair, soap scum, kitchen grease — the everyday blockages. We clear them with the right method for each fixture, not a one-size-fits-all auger.",
          },
          {
            title: "Mainline drain clearing",
            body: "When the issue is past the trap, we use camera inspection to find the blockage and the right tool to clear it — from cabling to hydro-jetting for tougher cases.",
          },
          {
            title: "Recurring clog diagnosis",
            body: "If the same drain keeps backing up, there's a reason. We find it — broken pipe, root intrusion, bad slope — and tell you what it would actually cost to fix.",
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
            body: "Describe what's happening. We'll ask which drain, how often, and whether more than one is affected.",
          },
          {
            number: "02",
            title: "We come look",
            body: "Free in-home assessment. For mainline issues, we run a camera so you can see exactly what we see.",
          },
          {
            number: "03",
            title: "We do the work",
            body: "Right tool for the job — auger, snake, hydro-jet, or root cutter. Most clogs are cleared in one visit.",
          },
          {
            number: "04",
            title: "We document",
            body: "If we find something that needs follow-up (root intrusion, pipe damage), you get the camera footage and a clear estimate. No pressure.",
          },
        ]}
      />

      <Pricing
        eyebrow="04 · PRICING"
        title="What it costs"
        body={
          "Drain cleaning prices depend on what you have going on. A simple kitchen sink is a different job than a mainline backup that needs hydro-jetting and camera inspection.\n\nIn-home assessments are free. We give you the real number before any work starts, and we never run up the bill with upsells you don't need."
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
