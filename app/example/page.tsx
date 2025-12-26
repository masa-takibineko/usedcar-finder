import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Example from "../../src/pages/Example";
import { breadcrumbJsonLd, webPageJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  title: "料金の参考例 | MOQ商会",
  description: "中古車オークション代行で実際にかかる料金のイメージ（参考例）を紹介します。",
  alternates: { canonical: "/example" },
};

export default function Page() {
  const webPage = webPageJsonLd("/example", metadata.title as string, metadata.description as string);
  const breadcrumb = breadcrumbJsonLd("/example", metadata.title as string);

  return (
    <>
      <JsonLd id="example-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Example />
    </>
  );
}
