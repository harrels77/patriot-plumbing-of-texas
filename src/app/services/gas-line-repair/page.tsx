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
  title: "Gas Line Repair & Installation",
  description:
    "Licensed gas line repair, replacement, and new installation in Wilson County. Permits, inspection, code-compliant work. Family-owned since 1983.",
};

export default function GasLineRepairPage() {
  return (
    <>
      <ServicePageHero
        eyebrow="SERVICES · 09"
        title="Gas lines, done with care."
        subtitle="Gas leaks are no joke. We repair, replace, and install gas lines with the right permits, the right materials, and a calm head."
      />

      <WhenYouNeedUs
        eyebrow="01 · SIGNS"
        title="When to call"
        signals={[
          "You smell rotten eggs near an appliance or in a room",
          "Your gas bill is unusually high",
          "A pilot light won't stay lit",
          "You're installing a new gas appliance and need a line run",
          "A previous contractor's work is being flagged by inspection",
        ]}
      />

      <WhatWeDo
        eyebrow="02 · SCOPE"
        title="What we cover"
        items={[
          {
            title: "Gas leak detection & repair",
            body: "Combustible gas detectors and pressure testing to find leaks safely. Repairs done with the right materials and permits — no shortcuts on gas work.",
          },
          {
            title: "New gas line installation",
            body: "Stove, water heater, fireplace, outdoor grill, pool heater — we run new gas lines from the meter to the appliance, code-compliant and inspected.",
          },
          {
            title: "Re-piping & replacement",
            body: "Old galvanized or corroded gas lines need replacement. CSST or black iron, depending on the situation and local code.",
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
            body: "If you smell gas, leave the house first, then call. We treat suspected leaks as urgent during business hours. If you don't smell it but suspect issues, call to schedule.",
          },
          {
            number: "02",
            title: "We assess safely",
            body: "First, we make sure you're safe. Then we use proper gas detection equipment to locate the issue. No guessing on gas work.",
          },
          {
            number: "03",
            title: "We repair to code",
            body: "All gas work is done with proper permits and inspection. This is non-negotiable — gas is a safety-critical system and we treat it like one.",
          },
          {
            number: "04",
            title: "We pressure test",
            body: "After every repair or new install, we pressure test the system to confirm it's leak-free. You get the test results in writing.",
          },
        ]}
      />

      <Pricing
        eyebrow="04 · PRICING"
        title="What it costs"
        body={
          "Gas line work is priced by the job, with permits and inspection included. We never cut corners on gas pricing to underbid — this is the wrong service to bargain on.\n\nEstimates are in writing, with the scope of work and inspection costs clearly listed."
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
