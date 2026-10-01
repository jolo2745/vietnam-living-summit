const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://vietnam-living-summit.com/#website",
  name: "Vietnam Living Summit 2026",
  alternateName: ["Vietnam Living Summit", "VLS2026"],
  url: "https://vietnam-living-summit.com/",
  inLanguage: ["en", "vi"],
};

export default function WebsiteStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, "\\u003c") }}
    />
  );
}
