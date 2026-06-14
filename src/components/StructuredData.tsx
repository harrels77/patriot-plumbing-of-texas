import { business } from "@/data/business";
import { serviceAreas } from "@/data/service-areas";
import { services } from "@/data/services";

// Schema.org "Plumber" structured data (a specific LocalBusiness subtype).
// Helps Google understand the business for local search ranking and
// rich results. Validated via search.google.com/test/rich-results.
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: business.name,
    description: business.description,
    url: business.url,
    telephone: business.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: business.address.country,
    },
    openingHours: business.openingHoursSpec,
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${area.county} County, Texas`,
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${business.url}${service.href}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
