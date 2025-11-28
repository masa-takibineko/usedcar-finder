import { Link } from "react-router-dom";

export default function Price() {
  return (
    <main style={{ maxWidth: 860, margin: "40px auto", padding: "0 16px", color: "#e2e8f0" }}>
      <h1 style={{ marginBottom: 8 }}>オークション代行手数料</h1>
      <p style={{ marginTop: 0, color: "#cbd5e1" }}>
        一般的な中古車販売店のような中間マージンは一切ありません。市場価格に沿った透明な料金でご提供します。
      </p>
      <p style={{ marginTop: 16 }}>
        ※ オークション代行のリスクについては  
        <Link to="/risks" className="prose-link">こちら</Link> をご覧ください。
      </p>

      <h2 style={{ marginTop: 24 }}>落札価格別参考手数料一覧</h2>
      <div style={{
        marginTop: 10, border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 12, overflow: "hidden"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px 10px", background: "rgba(148,163,184,.16)" }}>落札価格帯</th>
              <th style={{ textAlign: "right", padding: "12px 10px", background: "rgba(148,163,184,.16)" }}>手数料</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,.08)" }}>100万円未満</td>
              <td style={{ padding: "10px", textAlign: "right", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                35,800円（税込 39,380円）
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,.08)" }}>100〜150万円未満</td>
              <td style={{ padding: "10px", textAlign: "right", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                39,800円（税込 43,780円）
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,.08)" }}>150〜300万円未満</td>
              <td style={{ padding: "10px", textAlign: "right", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                44,800円（税込 49,800円）
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,.08)" }}>300〜500万円未満</td>
              <td style={{ padding: "10px", textAlign: "right", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                49,800円（税込 54,780円）
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,.08)" }}>500万円以上</td>
              <td style={{ padding: "10px", textAlign: "right", borderTop: "1px solid rgba(255,255,255,.08)" }}>
                落札額の 1% ＋ 消費税
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 12, color: "#94a3b8", fontSize: 13 }}>
        ※ 会場や条件により異なる場合があります。詳細は公式LINEにてご確認ください。
      </p>

      <p style={{ marginTop: 18 }}>
        <Link to="/" style={{ color: "#93c5fd", textDecoration: "underline" }}>
          ← 検索ページに戻る
        </Link>
      </p>
    </main>
  );
}
