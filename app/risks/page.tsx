import type { Metadata } from "next";
import Risks from "../../src/pages/Risks";

export const metadata: Metadata = {
  title: "デメリットと注意点 | MOQ商会",
  description: "中古車オークション代行を利用する前に知っておきたいデメリット・注意点をまとめます。",
  alternates: { canonical: "/risks" },
};

export default function Page() {
  return <Risks />;
}

