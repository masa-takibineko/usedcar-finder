import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Example from "../../src/site-pages/Example";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "../lib/seo";

const title = "料金の参考例 | 丸印モーター";
const description = "中古車オークション代行で実際にかかる料金のイメージ（参考例）を紹介します。";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/example",
});

export default function Page() {
  const webPage = webPageJsonLd("/example", title, description);
  const breadcrumb = breadcrumbJsonLd("/example", title);

  return (
    <>
      <JsonLd id="example-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Example />
    </>
  );
}
