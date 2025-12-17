import Seo from "../components/Seo";

export default function Company() {
  return (
    <main style={{ maxWidth: "800px", margin: "60px auto", color: "#e2e8f0", lineHeight: 1.6 }}>
      <Seo
        title="会社概要 | MOQ商会"
        description="中古車相場サイトの運営・オークション買取代行を行うMOQ商会の会社概要ページです。"
        path="/company"
      />
      <h1>会社概要</h1>
      <p>本ページはサンプルです。実際の情報に置き換えてください。</p>
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
