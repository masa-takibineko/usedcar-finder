import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Privacy from "../../src/site-pages/Privacy";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "../lib/seo";

const title = "プライバシーポリシー | 丸印モーター";
const description = "丸印モーターのプライバシーポリシー。個人情報の利用目的、第三者提供、安全管理、お問い合わせ窓口について記載します。";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/privacy",
});

export default function Page() {
  const webPage = webPageJsonLd("/privacy", title, description);
  const breadcrumb = breadcrumbJsonLd("/privacy", title);

  return (
    <>
      <JsonLd id="privacy-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Privacy />
    </>
  );
}
