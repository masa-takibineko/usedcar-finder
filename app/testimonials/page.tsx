import type { Metadata } from "next";
import Testimonials from "../../src/pages/Testimonials";
import JsonLd from "../components/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  title: "お客様の声 | 丸印モーター",
  description: "丸印モーターのオークション代行サービスをご利用いただいたお客様からの声をご紹介します。",
  alternates: { canonical: "/testimonials" },
};

export default function Page() {
  const webPage = webPageJsonLd("/testimonials", "お客様の声 | 丸印モーター", metadata.description as string);
  const breadcrumb = breadcrumbJsonLd("/testimonials", "お客様の声");

  return (
    <>
      <JsonLd id="testimonials-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <Testimonials />
    </>
  );
}
