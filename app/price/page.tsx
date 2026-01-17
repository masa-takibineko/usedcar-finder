import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Price from "../../src/pages/Price";
import { breadcrumbJsonLd, webPageJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  title: "オークション代行手数料 | 丸印モーター",
  description: "丸印モーターのオークション代行手数料の目安と、落札価格別の参考手数料一覧を掲載しています。",
  alternates: { canonical: "/price" },
};

export default function Page() {
  const webPage = webPageJsonLd("/price", metadata.title as string, metadata.description as string);
  const breadcrumb = breadcrumbJsonLd("/price", metadata.title as string);

  return (
    <>
      <JsonLd id="price-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Price />
    </>
  );
}
