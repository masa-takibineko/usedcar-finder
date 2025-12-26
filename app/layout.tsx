import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://usedcar-finder.vercel.app";
const title = "中古車購入を安くするならオークション代行検索MOQ商会へ";
const description =
  "中古車購入を安く抑えたい方のためのオークション代行検索。業界最安級の代行手数料35,800円〜で、中古車を適正価格で手に入れるための相場データと出品票を提供します。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "MOQ商会 | 中古車オークション代行",
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    siteName: "MOQ商会 | 中古車オークション代行",
    title,
    description,
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MOQ商会 | 中古車オークション代行 OGP画像",
      },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
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
    name: "MOQ商会",
    url: siteUrl,
  };
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: "MOQ商会 | 中古車オークション代行",
    publisher: { "@id": `${siteUrl}#organization` },
    inLanguage: "ja-JP",
  };
  const siteGraph = { "@context": "https://schema.org", "@graph": [organization, website] };

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
