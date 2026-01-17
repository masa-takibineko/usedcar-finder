export default function Company() {
  return (
    <main style={{ maxWidth: "800px", margin: "60px auto", color: "#1a1a1a", lineHeight: 1.6 }}>
      <h1 style={{ color: "#1a1a1a" }}>会社概要</h1>
      <p style={{ color: "#4a5568" }}>
        丸印モーターは、中古車を少しでも適正価格で購入したい方をサポートするために運営しています。業者オークションの相場情報と出品票を活用し、条件に合った車両を透明な価格で提案します。
      </p>
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse", border: "1px solid rgba(0,0,0,.1)", borderRadius: "8px", overflow: "hidden" }}>
        <tbody>
          <tr style={{ borderBottom: "1px solid rgba(0,0,0,.08)" }}><td style={{ padding: "12px", background: "rgba(0,0,0,.02)", fontWeight: 600, color: "#1a1a1a" }}>会社名</td><td style={{ padding: "12px", color: "#1a1a1a" }}>丸印モーター</td></tr>
          <tr style={{ borderBottom: "1px solid rgba(0,0,0,.08)" }}><td style={{ padding: "12px", background: "rgba(0,0,0,.02)", fontWeight: 600, color: "#1a1a1a" }}>所在地</td><td style={{ padding: "12px", color: "#1a1a1a" }}>大阪府北区梅田1-2-2第2ビル12-12</td></tr>
          <tr><td style={{ padding: "12px", background: "rgba(0,0,0,.02)", fontWeight: 600, color: "#1a1a1a" }}>事業内容</td><td style={{ padding: "12px", color: "#1a1a1a" }}>中古車相場サイトの運営・オークション買取代行</td></tr>
        </tbody>
      </table>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ color: "#1a1a1a" }}>事業内容</h2>
        <p style={{ color: "#4a5568" }}>
          中古車オークション代行を中心に、相場情報の提供や購入サポートを行っています。これまで多くの相談を受け、車種や条件に応じた提案を行ってきました。対応エリアや時間についても、柔軟に相談可能です。
        </p>
        <h2 style={{ color: "#1a1a1a" }}>連絡・相談方法</h2>
        <p style={{ color: "#4a5568" }}>
          LINEを中心に問い合わせを受け付けています。購入前の相談だけでも対応しています。
        </p>
      </section>
    </main>
  );
}
