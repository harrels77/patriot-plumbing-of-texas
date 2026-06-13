import type { Service } from "@/types/service";

// The six core services, shared across the home page, service pages, and Footer.
export const services: Service[] = [
  {
    number: "01",
    title: "Emergency Plumbing",
    description:
      "When pipes burst or drains back up, we respond quickly during business hours.",
    href: "/services/emergency-plumbing",
  },
  {
    number: "02",
    title: "Water Heaters",
    description:
      "Tank or tankless. Repair, replace, install. Hot water restored fast.",
    href: "/services/water-heaters",
  },
  {
    number: "03",
    title: "Drain Cleaning",
    description:
      "From slow sinks to mainline backups. Cleared without damage.",
    href: "/services/drain-cleaning",
  },
  {
    number: "04",
    title: "Repiping",
    description:
      "Whole-house or partial. Copper, PEX. Done right the first time.",
    href: "/services/repiping",
  },
  {
    number: "05",
    title: "Sewer Repair",
    description:
      "Trenchless and traditional methods. We protect your yard.",
    href: "/services/sewer-repair",
  },
  {
    number: "06",
    title: "Commercial Plumbing",
    description:
      "Restaurants, offices, multi-unit buildings. Maintenance and repair contracts welcome.",
    href: "/services/commercial-plumbing",
  },
];
