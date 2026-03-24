import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Risks from "../../src/site-pages/Risks";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "../lib/seo";

const title = "デメリットと注意点 | 丸印モーター";
const description = "中古車オークション代行を利用する前に知っておきたいデメリット・注意点をまとめます。";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/risks",
});

export default function Page() {
  const webPage = webPageJsonLd("/risks", title, description);
  const breadcrumb = breadcrumbJsonLd("/risks", title);

  return (
    <>
      <JsonLd id="risks-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Risks />
    </>
  );
}
