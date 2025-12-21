export default function Company() {
  return (
    <main style={{ maxWidth: "800px", margin: "60px auto", color: "#e2e8f0", lineHeight: 1.6 }}>
      <h1>会社概要</h1>
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <tbody>
          <tr><td>会社名</td><td>MOQ商会</td></tr>
          <tr><td>所在地</td><td>大阪府北区梅田1-2-2第2ビル12-12</td></tr>
          <tr><td>事業内容</td><td>中古車相場サイトの運営・オークション買取代行</td></tr>
        </tbody>
      </table>
    </main>
  );
}
