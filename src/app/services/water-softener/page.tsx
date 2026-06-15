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
  title: "Water Softener Installation & Service",
  description:
    "Whole-house water softener installation, testing, and service in Wilson County. Texas hard water solved. Family-owned since 1983.",
};

export default function WaterSoftenerPage() {
  return (
    <>
      <ServicePageHero
        eyebrow="SERVICES · 08"
        title="Soft water, for good."
        subtitle="Texas hard water ruins fixtures and dries out skin. We install and service water softeners that make your whole home better."
      />

      <WhenYouNeedUs
        eyebrow="01 · SIGNS"
        title="When to call"
        signals={[
          "White scale or crust building up on faucets and showerheads",
          "Your skin feels dry and your hair feels rough after showers",
          "Soap doesn't lather well and dishes come out spotty",
          "Your water heater is noisy or losing efficiency early",
          "You've never tested your water and you want to know what's in it",
        ]}
      />

      <WhatWeDo
        eyebrow="02 · SCOPE"
        title="What we cover"
        items={[
          {
            title: "Water testing & assessment",
            body: "Free in-home water test. We measure hardness, pH, iron content, and other minerals. You get a real report of what your water actually is.",
          },
          {
            title: "Water softener installation",
            body: "Whole-house systems sized to your household. We pick a system that matches your usage and your water hardness — no oversized upsell.",
          },
          {
            title: "Service & maintenance",
            body: "Existing softener acting up? We diagnose, repair, or replace. Salt refills, resin replacement, and regular check-ups available.",
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
            body: "Tell us what you're noticing. Hard water signs? Existing softener issues? We'll book a free water test and assessment.",
          },
          {
            number: "02",
            title: "We test the water",
            body: "Free in-home test. You see the numbers. We explain what hardness level means for your home and your skin, and what a softener would change.",
          },
          {
            number: "03",
            title: "We recommend & install",
            body: "If a softener makes sense, we recommend a sized system, explain the cost, and install it cleanly — usually in a single visit.",
          },
          {
            number: "04",
            title: "We follow up",
            body: "Six-month and one-year check-ins included with new installs. We make sure it's running right and you know how to maintain it.",
          },
        ]}
      />

      <Pricing
        eyebrow="04 · PRICING"
        title="What it costs"
        body={
          "Water softener installation depends on the system size and where it goes in your home. Most installs are in the garage or utility area and take half a day.\n\nWater tests are free. Systems are quoted in writing with brand, capacity, and warranty info. No hidden monthly fees."
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
