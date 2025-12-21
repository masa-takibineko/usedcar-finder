import type { Metadata } from "next";
import Example from "../../src/pages/Example";

export const metadata: Metadata = {
  title: "料金の参考例 | MOQ商会",
  description: "中古車オークション代行で実際にかかる料金のイメージ（参考例）を紹介します。",
  alternates: { canonical: "/example" },
};

export default function Page() {
  return <Example />;
}

