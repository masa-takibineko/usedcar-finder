import Link from "next/link";

export default function Price() {
  return (
    <main className="price-page" style={{ maxWidth: 860, margin: "40px auto", padding: "0 16px", color: "#1a1a1a" }}>
      <div
        className="campaign-banner"
        style={{
          textAlign: "center",
          background: "linear-gradient(90deg, #ff7a1a 0%, #ff4800 50%, #ff2f8d 100%)",
          color: "#fff",
          fontSize: "22px",
          fontWeight: 800,
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        手数料期間限定半額キャンペーン実施中
      </div>
      <h1 className="price-heading" style={{ marginBottom: 8, color: "#1a1a1a" }}>オークション代行手数料</h1>
      <p className="price-intro" style={{ marginTop: 0, color: "#4a5568" }}>
        一般的な中古車販売店のような中間マージンは一切ありません。市場価格に沿った透明な料金でご提供します。
      </p>
      <p style={{ marginTop: 16 }}>
        ※ オークション代行のリスクについては  
        <Link href="/risks" className="prose-link">こちら</Link> をご覧ください。
      </p>

      <h2 className="price-subheading" style={{ marginTop: 24, color: "#1a1a1a" }}>落札価格別参考手数料一覧</h2>
      <div className="price-table" style={{
        marginTop: 10, border: "1px solid rgba(0,0,0,.12)",
        borderRadius: 12, overflow: "hidden", background: "#ffffff"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px 10px", background: "rgba(0,0,0,.04)", color: "#1a1a1a" }}>落札価格帯</th>
              <th style={{ textAlign: "right", padding: "12px 10px", background: "rgba(0,0,0,.04)", color: "#1a1a1a" }}>手数料</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", borderTop: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a" }}>100万円未満</td>
              <td style={{ padding: "10px", textAlign: "right", borderTop: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a" }}>
                35,800円（税込 39,380円）
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", borderTop: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a" }}>100〜150万円未満</td>
              <td style={{ padding: "10px", textAlign: "right", borderTop: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a" }}>
                39,800円（税込 43,780円）
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", borderTop: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a" }}>150〜300万円未満</td>
              <td style={{ padding: "10px", textAlign: "right", borderTop: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a" }}>
                44,800円（税込 49,800円）
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", borderTop: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a" }}>300〜500万円未満</td>
              <td style={{ padding: "10px", textAlign: "right", borderTop: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a" }}>
                49,800円（税込 54,780円）
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", borderTop: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a" }}>500万円以上</td>
              <td style={{ padding: "10px", textAlign: "right", borderTop: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a" }}>
                落札額の 1% ＋ 消費税
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 12, color: "#64748b", fontSize: 13 }}>
        ※ 会場や条件により異なる場合があります。詳細は公式LINEにてご確認ください。
      </p>

      <p style={{ marginTop: 18 }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
          ← 検索ページに戻る
        </Link>
      </p>

      <section style={{ marginTop: 32, lineHeight: 1.7 }}>
        <h2 style={{ color: "#1a1a1a" }}>オークション代行手数料について</h2>
        <p style={{ color: "#4a5568" }}>
          丸印モーターのオークション代行手数料は <strong>35,800円〜</strong> です。この手数料には、車両選定のサポート、オークション入札代行、出品票の確認などが含まれます。
        </p>

        <h3 style={{ color: "#1a1a1a" }}>総額はどのように決まるのか</h3>
        <p style={{ color: "#4a5568" }}>中古車オークションでかかる費用は、主に以下の合計です。</p>
        <ul style={{ color: "#4a5568" }}>
          <li>車両落札価格</li>
          <li>オークション代行手数料</li>
          <li>名義変更・陸送などの実費</li>
        </ul>
        <p style={{ color: "#4a5568" }}>「車両価格＋手数料」で完結するケースも多く、店頭販売より総額が抑えられることが多いのが特徴です。</p>

        <h3 style={{ color: "#1a1a1a" }}>料金計算の具体例</h3>
        <p style={{ color: "#4a5568" }}>
          例えば、オークションで80万円の車両を落札した場合、<br />
          <strong>車両価格80万円＋代行手数料＋必要諸費用</strong><br />
          という形で総額が決まります。事前に目安を共有するため、想定外の費用が発生しにくい仕組みです。
        </p>

        <h3 style={{ color: "#1a1a1a" }}>追加費用が発生するケース</h3>
        <p style={{ color: "#4a5568" }}>以下の場合は、別途費用が発生する可能性があります。</p>
        <ul style={{ color: "#4a5568" }}>
          <li>遠方への陸送</li>
          <li>特殊な名義変更手続き</li>
          <li>落札後のキャンセル対応</li>
        </ul>
        <p style={{ color: "#4a5568" }}>事前に説明し、了承を得たうえで進めます。</p>

        <h3 style={{ color: "#1a1a1a" }}>支払いの流れ</h3>
        <p style={{ color: "#4a5568" }}>落札が決定した後に、指定の方法でお支払いとなります。詳細な支払いタイミングや方法は、事前相談時に案内します。</p>
      </section>
    </main>
  );
}
