import type { Metadata } from "next";
import FAQ from "../../src/pages/FAQ";
import JsonLd from "../components/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  title: "よくある質問 | MOQ商会",
  description: "オークション代行に関するよくある質問と回答をまとめました。費用、手続き、リスクなどの疑問点を解消します。",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  const webPage = webPageJsonLd("/faq", metadata.title as string, metadata.description as string);
  const breadcrumb = breadcrumbJsonLd("/faq", metadata.title as string);

  return (
    <>
      <JsonLd id="faq-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <FAQ />
    </>
  );
}

