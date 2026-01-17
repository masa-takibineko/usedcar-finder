import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://usedcar-finder.vercel.app";
const title = "中古車購入を安くするならオークション代行検索丸印モーターへ";
const description =
  "中古車購入を安く抑えたい方のためのオークション代行検索。業界最安級の代行手数料35,800円〜で、中古車を適正価格で手に入れるための相場データと出品票を提供します。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "中古車購入",
    "中古車 安く",
    "中古車 相場",
    "オークション代行",
    "業者オークション",
    "代行手数料",
    "最安",
    "車探し",
    "中古車探し",
    "丸印モーター",
    "オークション直販",
    "中古車 価格",
    "中古車 検索"
  ],
  applicationName: "丸印モーター | 中古車オークション代行",
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "丸印モーター | 中古車オークション代行",
    title,
    description,
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "丸印モーター | 中古車オークション代行 OGP画像",
      },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: "/",
    languages: {
      ja: "/",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1220",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "丸印モーター",
    url: siteUrl,
    logo: `${siteUrl}/og-image.jpg`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Japanese"
    }
  };
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: "丸印モーター | 中古車オークション代行",
    publisher: { "@id": `${siteUrl}#organization` },
    inLanguage: "ja-JP",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
  const autoDealer = {
    "@type": "AutoDealer",
    "@id": `${siteUrl}#autodealer`,
    name: "丸印モーター 中古車オークション代行",
    url: siteUrl,
    description: "中古車購入を安く抑えるオークション直販代行。業界最安級の手数料35,800円〜で、相場を見ながら希望車種を検索できます。",
    areaServed: "JP",
    priceRange: "¥¥",
    makesOffer: {
      "@type": "Offer",
      price: "35800",
      priceCurrency: "JPY",
      description: "オークション代行手数料（税抜）"
    }
  };
  const siteGraph = { "@context": "https://schema.org", "@graph": [organization, website, autoDealer] };

  return (
    <html lang="ja">
      <body>
        <Script
          id="site-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
        />
        {children}
      </body>
    </html>
  );
}
