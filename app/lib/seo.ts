import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://usedcar-finder.vercel.app";

export const lang = "ja-JP";
const siteName = "丸印モーター | 中古車オークション代行";
const ogImage = `${SITE_URL}/og-image.jpg`;

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  keywords?: string[];
};

type FaqEntry = { q: string; a: string };

export const buildPageMetadata = ({ title, description, path, keywords }: BuildPageMetadataInput): Metadata => {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url,
      locale: "ja_JP",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "丸印モーター | 中古車オークション代行 OGP画像",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
};

export const faqPageJsonLd = (path: string, items: FaqEntry[]) => {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    "@type": "FAQPage",
    "@id": `${url}#faqpage`,
    url,
    inLanguage: lang,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
};

export const webPageJsonLd = (path: string, name: string, description: string) => {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}#organization` },
  };
};

export const breadcrumbJsonLd = (path: string, name: string) => {
  if (path === "/") return null;
  const url = `${SITE_URL}${path}`;
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
};
