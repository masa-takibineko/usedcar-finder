import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Price from "../../src/site-pages/Price";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "../lib/seo";

const title = "オークション代行手数料 | 丸印モーター";
const description = "丸印モーターのオークション代行手数料の目安と、落札価格別の参考手数料一覧を掲載しています。";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/price",
});

export default function Page() {
  const webPage = webPageJsonLd("/price", title, description);
  const breadcrumb = breadcrumbJsonLd("/price", title);

  return (
    <>
      <JsonLd id="price-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Price />
    </>
  );
}
