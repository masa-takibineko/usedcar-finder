import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Company from "../../src/site-pages/Company";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "../lib/seo";

const title = "会社概要 | 丸印モーター";
const description = "中古車相場サイトの運営・オークション買取代行を行う丸印モーターの会社概要ページです。";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/company",
});

export default function Page() {
  const webPage = webPageJsonLd("/company", title, description);
  const breadcrumb = breadcrumbJsonLd("/company", title);

  return (
    <>
      <JsonLd id="company-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Company />
    </>
  );
}
