import type { Metadata } from "next";
import JsonLd from "./components/JsonLd";
import App from "../src/App";
import { breadcrumbJsonLd, webPageJsonLd } from "./lib/seo";

export const metadata: Metadata = {
  title: "丸印モーターの中古車オークション代行 | 中古車を相場で安く購入",
  description:
    "丸印モーターの中古車オークション代行。業界最安級の代行手数料35,800円〜で、業者オークションの相場データと出品票を見ながら中古車を適正価格で購入できます。",
  keywords: [
    "中古車購入",
    "中古車 安く",
    "中古車 相場",
    "オークション代行",
    "業者オークション",
    "代行手数料",
    "最安",
    "車探し",
    "中古車探し",
    "丸印モーター",
    "オークション直販"
  ],
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  const webPage = webPageJsonLd("/", "丸印モーターの中古車オークション代行 | 中古車を相場で安く購入", metadata.description || "");
  const breadcrumb = breadcrumbJsonLd("/", "ホーム");

  return (
    <>
      <JsonLd id="home-jsonld" data={{ "@context": "https://schema.org", "@graph": [webPage, breadcrumb].filter(Boolean) }} />
      <App />
    </>
  );
}
