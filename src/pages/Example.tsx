import { Link } from "react-router-dom";

export default function Example() {
  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px", color: "#e2e8f0" }}>
      <h1 style={{ marginBottom: 8 }}>実際にかかる料金の例</h1>
      <p style={{ marginTop: 0, color: "#cbd5e1" }}>
        以下はオークション明細をもとにした参考例です。
      </p>
      <p style={{ marginTop: 16 }}>
        注意点・デメリットの詳細は  
        <Link to="/risks" className="prose-link">こちら</Link>
      </p>


      <div
        style={{
          marginTop: 18,
          border: "1px solid rgba(255,255,255,.15)",
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
            <tr style={{ background: "rgba(148,163,184,.16)" }}>
              <th style={{ padding: "12px 10px", textAlign: "left" }}>項目</th>
              <th style={{ padding: "12px 10px", textAlign: "right" }}>金額</th>
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
              ["オークション代行料", "55,000円"],
            ].map(([label, value], i) => (
              <tr key={i}>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid rgba(255,255,255,.12)" // ★ ここでつながる
                  }}
                >
                  {label}
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    borderBottom: "1px solid rgba(255,255,255,.12)"
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
                  borderTop: "2px solid rgba(255,255,255,.4)",
                  fontWeight: 700
                }}
              >
                合計
              </td>
              <td
                style={{
                  padding: "12px 10px",
                  textAlign: "right",
                  fontWeight: 800,
                  color: "#facc15",
                  borderTop: "2px solid rgba(255,255,255,.4)"
                }}
              >
                1,826,000円
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <p style={{ marginTop: 12, color: "#94a3b8", fontSize: 13 }}>
        ※ 落札手数料は車種によって変わります。
      </p>

      <p style={{ marginTop: 24, fontWeight: 700, color: "#f8fafc" }}>
        弊社の利益は<strong>オークション代行手数料のみ</strong>です。その他の手数料は一切いただきません。
      </p>

      <p style={{ marginTop: 18 }}>
        <Link to="/" style={{ color: "#93c5fd", textDecoration: "underline" }}>
          ← トップページに戻る
        </Link>
      </p>
    </main>
  );
}
