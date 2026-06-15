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
  title: "Emergency Plumbing",
  description:
    "Burst pipes, major leaks, no water. Fast response during business hours in Wilson County. Family-owned, since 1983.",
};

export default function EmergencyPlumbingPage() {
  return (
    <>
      <ServicePageHero
        eyebrow="SERVICES · 01"
        title="Plumbing emergencies, handled."
        subtitle="Burst pipes, major leaks, no water. We respond fast during business hours, Monday through Friday."
      />

      <WhenYouNeedUs
        eyebrow="01 · SIGNS"
        title="When to call"
        signals={[
          "A pipe has burst and water is spreading",
          "You've shut off the main and need help fast",
          "A drain or toilet is overflowing and won't stop",
          "You smell gas near a fixture or appliance",
          "You have no running water at all",
        ]}
      />

      <WhatWeDo
        eyebrow="02 · SCOPE"
        title="What we do"
        items={[
          {
            title: "First response & stabilization",
            body: "We get to you fast during business hours and stop the immediate damage — shut-offs, contain the leak, get water back where it should be.",
          },
          {
            title: "Diagnose the real problem",
            body: "Once the immediate issue is contained, we find the root cause — not just patch the symptom. You'll know what actually broke and why.",
          },
          {
            title: "Repair on the same visit when possible",
            body: "Most emergency repairs are done in one visit. If a part needs ordering, we'll stabilize the situation and tell you exactly when we'll be back.",
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
            body: "Describe what's happening. We'll triage — is this a 'shut off the main now' situation, or something you can manage until we arrive?",
          },
          {
            number: "02",
            title: "We come fast",
            body: "During business hours, we prioritize emergency calls over scheduled work. Most days we can be there same-day.",
          },
          {
            number: "03",
            title: "We stabilize first",
            body: "Step one is stopping the damage. Step two is fixing the root cause. We do them in that order.",
          },
          {
            number: "04",
            title: "We document",
            body: "You get a written report of what happened and what we did. Useful for insurance claims if water damage is involved.",
          },
        ]}
      />

      <Pricing
        eyebrow="04 · PRICING"
        title="What it costs"
        body={
          "Emergency calls are billed by the visit, not by the panic. In-home assessments are free. You'll get a real number in writing before any work starts — even when things feel urgent.\n\nIf we can't make it the same day, we'll tell you upfront and help you stabilize over the phone if it's safe to do so."
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
