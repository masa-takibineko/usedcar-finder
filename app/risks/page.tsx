import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Risks from "../../src/pages/Risks";
import { breadcrumbJsonLd, webPageJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  title: "デメリットと注意点 | 丸印モーター",
  description: "中古車オークション代行を利用する前に知っておきたいデメリット・注意点をまとめます。",
  alternates: { canonical: "/risks" },
};

export default function Page() {
  const webPage = webPageJsonLd("/risks", metadata.title as string, metadata.description as string);
  const breadcrumb = breadcrumbJsonLd("/risks", metadata.title as string);

  return (
    <>
      <JsonLd id="risks-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Risks />
    </>
  );
}
