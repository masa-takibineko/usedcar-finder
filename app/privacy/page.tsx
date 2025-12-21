import type { Metadata } from "next";
import Privacy from "../../src/pages/Privacy";

export const metadata: Metadata = {
  title: "プライバシーポリシー | MOQ商会",
  description: "MOQ商会のプライバシーポリシー。個人情報の利用目的、第三者提供、安全管理、お問い合わせ窓口について記載します。",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <Privacy />;
}

