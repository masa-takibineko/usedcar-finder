import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Company from "../../src/pages/Company";
import { breadcrumbJsonLd, webPageJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  title: "会社概要 | MOQ商会",
  description: "中古車相場サイトの運営・オークション買取代行を行うMOQ商会の会社概要ページです。",
  alternates: { canonical: "/company" },
};

export default function Page() {
  const webPage = webPageJsonLd("/company", metadata.title as string, metadata.description as string);
  const breadcrumb = breadcrumbJsonLd("/company", metadata.title as string);

  return (
    <>
      <JsonLd id="company-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Company />
    </>
  );
}
