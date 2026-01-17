import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Privacy from "../../src/pages/Privacy";
import { breadcrumbJsonLd, webPageJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 丸印モーター",
  description: "丸印モーターのプライバシーポリシー。個人情報の利用目的、第三者提供、安全管理、お問い合わせ窓口について記載します。",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  const webPage = webPageJsonLd("/privacy", metadata.title as string, metadata.description as string);
  const breadcrumb = breadcrumbJsonLd("/privacy", metadata.title as string);

  return (
    <>
      <JsonLd id="privacy-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Privacy />
    </>
  );
}
