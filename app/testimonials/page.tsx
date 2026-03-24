import type { Metadata } from "next";
import Testimonials from "../../src/site-pages/Testimonials";
import JsonLd from "../components/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "../lib/seo";

const title = "お客様の声 | 丸印モーター";
const description = "丸印モーターのオークション代行サービスをご利用いただいたお客様からの声をご紹介します。";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/testimonials",
});

export default function Page() {
  const webPage = webPageJsonLd("/testimonials", title, description);
  const breadcrumb = breadcrumbJsonLd("/testimonials", "お客様の声");

  return (
    <>
      <JsonLd id="testimonials-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Testimonials />
    </>
  );
}
