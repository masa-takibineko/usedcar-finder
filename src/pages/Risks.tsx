import Link from "next/link";

export default function Risks() {
  return (
    <main style={{ maxWidth: 860, margin: "40px auto", padding: "0 16px", color: "#e2e8f0" }}>
      <h1 style={{ marginBottom: 8 }}>オークション代行のデメリットと注意点</h1>
      <p style={{ color: "#cbd5e1" }}>
        オークション代行は中間マージンを削減できる一方で、一般的な中古車販売とは異なる特徴があります。
        購入前に必ずご確認ください。
      </p>

      {/* --- 1 --- */}
      <section style={{ marginTop: 28 }}>
        <h2 style={{ marginBottom: 6 }}>1. 試乗はできません</h2>
        <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
          オートオークションは業者専用市場のため、試乗は一切できません。
          ただし、会場が発行する「出品票」には検査員が確認した車両状態が詳細に記載されており、
          事故歴、キズ・へこみ、不具合の有無などを事前に把握することが可能です。
        </p>
      </section>

      {/* --- 2 --- */}
      <section style={{ marginTop: 28 }}>
        <h2 style={{ marginBottom: 6 }}>2. 落札後の車両の不具合は基本的にはユーザー様負担となります。</h2>
        <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
          オートオークションは業者間取引のため、会場が認めるクレーム以外は基本的に
          「ノークレーム・現状販売」となります。
          店舗販売では販売店が売主となり保証対応が可能ですが、
          オークション代行で購入した車両の売主はオークション会場であり、代行業者ではありません。
          そのため会場基準外の不具合については、購入後の修理・管理はすべてユーザー様の自己負担となります。
        </p>
      </section>

      {/* --- 3 --- */}
      <section style={{ marginTop: 28 }}>
        <h2 style={{ marginBottom: 6 }}>3. 支払いは基本的に現金一括のみ</h2>
        <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
          落札後は数日以内に車両代金を全額一括で会場へ支払う必要があります。
          そのため多くの代行業者でも原則として現金一括払いとなっています。
        </p>
      </section>

      <p style={{ marginTop: 32, color: "#f8fafc", fontWeight: 700 }}>
        ※ 弊社の利益は <strong>オークション代行手数料のみ</strong> です。  
        その他の追加手数料は一切いただきません。
      </p>

      <section style={{ marginTop: 32, lineHeight: 1.7 }}>
        <h2>中古車オークション特有のリスク</h2>
        <p>
          中古車オークションでは、実車確認ができない点が最大の特徴です。そのため、出品票の情報を正しく理解することが重要です。
        </p>

        <h3>よくある注意点</h3>
        <ul>
          <li>試乗ができない</li>
          <li>ノークレーム・ノーリターンが基本</li>
          <li>支払いが現金ベースになるケースが多い</li>
        </ul>
        <p>これらを理解した上で利用する必要があります。</p>

        <h3>MOQ商会での回避策</h3>
        <p>
          MOQ商会では、評価点や修復歴、注意事項を事前に説明し、リスクを理解した上で判断できる環境を提供しています。
        </p>
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/" style={{ color: "#93c5fd", textDecoration: "underline" }}>
          ← トップページに戻る
        </Link>
      </p>
    </main>
  );
}
