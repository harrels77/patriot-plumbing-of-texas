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
  title: "Water Heaters",
  description:
    "Tank or tankless water heater install, repair, and replacement. Family-owned, serving Wilson County since 1983.",
};

export default function WaterHeatersPage() {
  return (
    <>
      <ServicePageHero
        eyebrow="SERVICES · 02"
        title="Water heaters, done right."
        subtitle="Tank or tankless. New installs, repairs, replacements. We've worked on every model that's come through Wilson County since 1983."
      />

      <WhenYouNeedUs
        eyebrow="01 · SIGNS"
        title="When to call"
        signals={[
          "No hot water, or it runs out fast",
          "Water comes out rust-colored or smells off",
          "A puddle around the tank, or visible corrosion",
          "Loud rumbling, banging, or popping sounds",
          "Your water heater is over 10 years old",
        ]}
      />

      <WhatWeDo
        eyebrow="02 · SCOPE"
        title="What we cover"
        items={[
          {
            title: "New installation",
            body: "Tank or tankless. We help you choose the right size and type for your household, then install it cleanly with all required permits and code compliance.",
          },
          {
            title: "Repair & diagnosis",
            body: "Pilot light won't stay lit. Thermostat issues. Leaking pressure relief valve. Sediment buildup. We diagnose first, fix second — no upsell on parts you don't need.",
          },
          {
            title: "Replacement",
            body: "When repair doesn't make sense anymore, we remove the old unit, handle disposal, and install the new one in a single visit when possible.",
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
            body: "Tell us what you're seeing. We'll ask a few questions to figure out if it's a quick fix or a bigger job.",
          },
          {
            number: "02",
            title: "We come look",
            body: "Free in-home estimate. We diagnose on-site, explain what we find, and give you the real number — not a guess.",
          },
          {
            number: "03",
            title: "We do the work",
            body: "Clean, code-compliant, with the right parts the first time. Most jobs done in one visit.",
          },
          {
            number: "04",
            title: "We clean up",
            body: "Old unit hauled away, work area left as we found it. No mess, no surprises on the invoice.",
          },
        ]}
      />

      <Pricing
        eyebrow="04 · PRICING"
        title="What it costs"
        body={
          "Every job is different — tank size, layout, code requirements, brand of water heater. We don't quote over the phone because guesses help nobody.\n\nIn-home estimates are always free. You'll get a real number in writing before any work starts. No fine print, no day-of surprises."
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
