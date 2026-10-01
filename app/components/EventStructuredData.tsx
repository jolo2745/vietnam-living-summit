import { pageMetadata } from "../seo";

export default function EventStructuredData({ language }: { language: "en" | "vi" }) {
  const url = `https://vietnam-living-summit.com/${language === "vi" ? "vi" : ""}`;
  const event = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": "https://vietnam-living-summit.com/#summit-2026",
    name: "Vietnam Living Summit 2026",
    description: pageMetadata.people[language].description,
    url,
    mainEntityOfPage: url,
    image: "https://vietnam-living-summit.com/images/vietnam-living-summit-logo-trimmed.png",
    startDate: "2026-10-30T08:30:00+07:00",
    endDate: "2026-10-30T12:00:00+07:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    organizer: [
      { "@type": "Organization", name: "TUBUDD", email: "marketing@tubudd.com" },
      { "@type": "Organization", name: "Travellive" },
    ],
    offers: {
      "@type": "Offer",
      url: `${url}#event-signup`,
      price: 0,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
    },
    // The venue is undecided. Add location only after its name and address are confirmed.
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(event).replace(/</g, "\\u003c") }}
    />
  );
}
