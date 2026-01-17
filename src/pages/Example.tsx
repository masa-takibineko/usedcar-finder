import Link from "next/link";

export default function Example() {
  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px", color: "#1a1a1a" }}>
      <h1 style={{ marginBottom: 8, color: "#1a1a1a" }}>実際にかかる料金の例</h1>
      <p style={{ marginTop: 0, color: "#4a5568" }}>
        以下はオークション明細をもとにした参考例です。
      </p>
      <p style={{ marginTop: 16 }}>
        注意点・デメリットの詳細は  
        <Link href="/risks" className="prose-link">こちら</Link>
      </p>


      <div
        style={{
          marginTop: 18,
          border: "1px solid rgba(0,0,0,.12)",
          background: "#ffffff",
          borderRadius: 12,
          overflow: "hidden",
          maxWidth: 600,      // ★ 幅を狭める
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",   // ★ これが線をつなげるポイント
            fontSize: 15
          }}
        >
          <thead>
            <tr style={{ background: "rgba(0,0,0,.04)" }}>
              <th style={{ padding: "12px 10px", textAlign: "left", color: "#1a1a1a" }}>項目</th>
              <th style={{ padding: "12px 10px", textAlign: "right", color: "#1a1a1a" }}>金額</th>
            </tr>
          </thead>

          <tbody>
            {[
              ["車両本体価格", "1,600,000円"],
              ["消費税（10%）", "160,000円"],
              ["登録手続代行費用", "本人による"],
              ["整備費用", "本人による"],
              ["納車手数料", "本人による"],
              ["落札手数料", "11,000円"],
              ["オークション代行料（税込）", "49,800円"],
            ].map(([label, value], i) => (
              <tr key={i}>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid rgba(0,0,0,.08)",
                    color: "#1a1a1a"
                  }}
                >
                  {label}
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    borderBottom: "1px solid rgba(0,0,0,.08)",
                    color: "#1a1a1a"
                  }}
                >
                  {value}
                </td>
              </tr>
            ))}

            {/* 合計欄 */}
            <tr>
              <td
                style={{
                  padding: "12px 10px",
                  borderTop: "2px solid rgba(0,0,0,.2)",
                  fontWeight: 700,
                  color: "#1a1a1a"
                }}
              >
                合計
              </td>
              <td
                style={{
                  padding: "12px 10px",
                  textAlign: "right",
                  fontWeight: 800,
                  color: "#dc2626",
                  borderTop: "2px solid rgba(0,0,0,.2)"
                }}
              >
                1,820,800円
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <p style={{ marginTop: 12, color: "#64748b", fontSize: 13 }}>
        ※ 落札手数料は車種によって変わります。
      </p>

      <p style={{ marginTop: 24, fontWeight: 700, color: "#1a1a1a" }}>
        弊社の利益は<strong>オークション代行手数料のみ</strong>です。その他の手数料は一切いただきません。
      </p>

      <p style={{ marginTop: 18 }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
          ← トップページに戻る
        </Link>
      </p>
    </main>
  );
}
