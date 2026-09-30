import type { Metadata } from "next";

const siteName = "Vietnam Living Summit 2026";
const origin = "https://vietnam-living-summit.com";

function absolute(path: string) {
  return `${origin}${path}`;
}

function metadata(title: string, description: string, canonical: string, alternate: string, image: string, locale: string): Metadata {
  const canonicalUrl = absolute(canonical);
  const alternateUrl = absolute(alternate);
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
      images: [{ url: absolute(image) }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absolute(image)] },
  };
}

export const pageMetadata = {
  people: {
    en: metadata(
      "Vietnam Living Summit 2026 | Relocate to Vietnam",
      "A summit connecting people building a life in Vietnam with trusted local businesses, services, and communities.",
      "/", "/vi", "/images/hanoi-west-lake-dusk.jpg", "en_US",
    ),
    vi: metadata(
      "Vietnam Living Summit 2026 | Chuyển đến Việt Nam",
      "Sự kiện kết nối những người xây dựng cuộc sống tại Việt Nam với các doanh nghiệp, dịch vụ và cộng đồng địa phương đáng tin cậy.",
      "/vi", "/", "/images/hanoi-west-lake-dusk.jpg", "vi_VN",
    ),
  },
  partners: {
    en: metadata(
      "Become our partner | Vietnam Living Summit 2026",
      "Partner with TUBUDD to build Vietnam's ecosystem for foreign residents.",
      "/partners", "/vi/partners", "/images/business-meeting-hero-sharp.jpg", "en_US",
    ),
    vi: metadata(
      "Trở thành đối tác | Vietnam Living Summit 2026",
      "Cùng TUBUDD xây dựng hệ sinh thái cho người nước ngoài tại Việt Nam",
      "/vi/partners", "/partners", "/images/business-meeting-hero-sharp.jpg", "vi_VN",
    ),
  },
} as const;
