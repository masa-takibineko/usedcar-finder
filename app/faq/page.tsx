import type { Metadata } from "next";
import FAQ from "../../src/site-pages/FAQ";
import JsonLd from "../components/JsonLd";
import { faqs } from "../../src/site-pages/faqData";
import { breadcrumbJsonLd, buildPageMetadata, faqPageJsonLd, webPageJsonLd } from "../lib/seo";

const title = "よくある質問 | 丸印モーター";
const description = "オークション代行に関するよくある質問と回答をまとめました。費用、手続き、リスクなどの疑問点を解消します。";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/faq",
});

export default function Page() {
  const webPage = webPageJsonLd("/faq", title, description);
  const breadcrumb = breadcrumbJsonLd("/faq", title);
  const faqPage = faqPageJsonLd("/faq", faqs);

  return (
    <>
      <JsonLd id="faq-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb, faqPage].filter(Boolean) }} />
      <FAQ />
    </>
  );
}
