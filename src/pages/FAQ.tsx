import Link from "next/link";

const faqs: Array<{ q: string; a: string }> = [
  { q: "本当に中古車は安くなりますか？", a: "車両によって差はありますが、流通コストが少ないため、一般的な中古車販売より安くなるケースが多いです。" },
  { q: "初心者でも利用できますか？", a: "はい。出品票の見方や相場感など、初めての方にも分かるように説明します。" },
  { q: "実車を見られないのは不安です。", a: "オークション出品票には評価や状態が詳細に記載されています。内容を確認したうえで判断できます。" },
  { q: "手数料以外に費用はかかりますか？", a: "名義変更や陸送などの実費がかかる場合がありますが、事前に説明します。" },
  { q: "落札後にキャンセルできますか？", a: "原則としてキャンセルはできませんが、状況に応じて対応を案内します。" },
  { q: "納車までどれくらいかかりますか？", a: "車両や手続き状況によりますが、通常は数週間が目安です。" },
];

export default function FAQ() {
  return (
    <main style={{ maxWidth: 860, margin: "40px auto", padding: "0 16px", color: "#1a1a1a" }}>
      <h1 style={{ marginBottom: 10, color: "#1a1a1a" }}>よくある質問（FAQ）</h1>
      <p style={{ color: "#4a5568", lineHeight: 1.7 }}>
        初めてオークション代行を利用する方が不安に感じやすいポイントをまとめました。ご不明点はお気軽にお問い合わせください。
      </p>

      <div style={{ marginTop: 20 }}>
        {faqs.map((item, idx) => (
          <section key={idx} style={{ marginBottom: 18 }}>
            <h3 style={{ margin: "0 0 6px", color: "#1a1a1a" }}>Q. {item.q}</h3>
            <p style={{ margin: 0, color: "#4a5568", lineHeight: 1.6 }}>A. {item.a}</p>
          </section>
        ))}
      </div>

      <p style={{ marginTop: 24 }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
          ← トップページに戻る
        </Link>
      </p>
    </main>
  );
}

