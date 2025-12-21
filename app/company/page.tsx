import type { Metadata } from "next";
import Company from "../../src/pages/Company";

export const metadata: Metadata = {
  title: "会社概要 | MOQ商会",
  description: "中古車相場サイトの運営・オークション買取代行を行うMOQ商会の会社概要ページです。",
  alternates: { canonical: "/company" },
};

export default function Page() {
  return <Company />;
}

