import type { Metadata } from "next";

const siteName = "Vietnam Living Summit 2026";
const origin = "https://vietnam-living-summit.com";

export const siteIcons: Metadata["icons"] = {
  icon: [
    { url: "/favicon.ico", sizes: "16x16 32x32 48x48 96x96", type: "image/x-icon" },
    { url: "/icon.png", sizes: "96x96", type: "image/png" },
  ],
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
};

function absolute(path: string) {
  return `${origin}${path}`;
}

function metadata(title: string, description: string, canonical: string, alternate: string, image: string, locale: string): Metadata {
  const canonicalUrl = absolute(canonical);
  const alternateUrl = absolute(alternate);
  const imageAlt = locale === "vi_VN"
    ? "Logo Vietnam Living Summit 2026"
    : "Vietnam Living Summit 2026 logo";
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: locale === "vi_VN" ? { en: alternateUrl, vi: canonicalUrl } : { en: canonicalUrl, vi: alternateUrl },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      type: "website",
      locale,
      images: [{ url: absolute(image), width: 1200, height: 630, type: "image/jpeg", alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: absolute(image), alt: imageAlt }] },
  };
}

export const pageMetadata = {
  people: {
    en: metadata(
      "Vietnam Living Summit 2026 | Relocate to Vietnam",
      "A summit connecting people building a life in Vietnam with trusted local businesses, services, and communities.",
      "/", "/vi", "/social/attendee-preview.jpg", "en_US",
    ),
    vi: metadata(
      "Vietnam Living Summit 2026 | Chuyển đến Việt Nam",
      "Sự kiện kết nối những người xây dựng cuộc sống tại Việt Nam với các doanh nghiệp, dịch vụ và cộng đồng địa phương đáng tin cậy.",
      "/vi", "/", "/social/attendee-preview.jpg", "vi_VN",
    ),
  },
  partners: {
    en: metadata(
      "Become our partner | Vietnam Living Summit 2026",
      "Partner with TUBUDD to build Vietnam's ecosystem for foreign residents.",
      "/partners", "/vi/partners", "/social/partner-preview.jpg", "en_US",
    ),
    vi: metadata(
      "Trở thành đối tác | Vietnam Living Summit 2026",
      "Cùng TUBUDD xây dựng hệ sinh thái cho người nước ngoài tại Việt Nam",
      "/vi/partners", "/partners", "/social/partner-preview.jpg", "vi_VN",
    ),
  },
} as const;
