import type { Metadata } from "next";
import Price from "../../src/pages/Price";

export const metadata: Metadata = {
  title: "オークション代行手数料 | MOQ商会",
  description: "MOQ商会のオークション代行手数料の目安と、落札価格別の参考手数料一覧を掲載しています。",
  alternates: { canonical: "/price" },
};

export default function Page() {
  return <Price />;
}

