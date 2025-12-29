import Link from "next/link";
import auction from "../assets/auction.jpg";
import auctionMobile from "../assets/auction-mobile.jpg";

export default function Price() {
  return (
    <main style={{ maxWidth: 860, margin: "40px auto", padding: "0 16px", color: "#e2e8f0" }}>
      <h1 style={{ marginBottom: 8 }}>オークション代行手数料</h1>
      <p style={{ marginTop: 0, color: "#cbd5e1" }}>
        一般的な中古車販売店のような中間マージンは一切ありません。市場価格に沿った透明な料金でご提供します。
      </p>
      <p style={{ marginTop: 16 }}>
        ※ オークション代行のリスクについては  
        <Link href="/risks" className="prose-link">こちら</Link> をご覧ください。
      </p>

      <div
        style={{
          marginTop: 20,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 10px 35px rgba(0,0,0,.35)",
        }}
      >
        <picture>
          <source media="(max-width: 640px)" srcSet={auctionMobile.src} />
          <img
            src={auction.src}
            alt="オークション会場での代行の様子"
            style={{ display: "block", width: "100%", height: "auto" }}
            loading="lazy"
          />
        </picture>
      </div>

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
        <Link href="/" style={{ color: "#93c5fd", textDecoration: "underline" }}>
          ← 検索ページに戻る
        </Link>
      </p>

      <section style={{ marginTop: 32, lineHeight: 1.7 }}>
        <h2>オークション代行手数料について</h2>
        <p>
          MOQ商会のオークション代行手数料は <strong>35,800円〜</strong> です。この手数料には、車両選定のサポート、オークション入札代行、出品票の確認などが含まれます。
        </p>

        <h3>総額はどのように決まるのか</h3>
        <p>中古車オークションでかかる費用は、主に以下の合計です。</p>
        <ul>
          <li>車両落札価格</li>
          <li>オークション代行手数料</li>
          <li>名義変更・陸送などの実費</li>
        </ul>
        <p>「車両価格＋手数料」で完結するケースも多く、店頭販売より総額が抑えられることが多いのが特徴です。</p>

        <h3>料金計算の具体例</h3>
        <p>
          例えば、オークションで80万円の車両を落札した場合、<br />
          <strong>車両価格80万円＋代行手数料＋必要諸費用</strong><br />
          という形で総額が決まります。事前に目安を共有するため、想定外の費用が発生しにくい仕組みです。
        </p>

        <h3>追加費用が発生するケース</h3>
        <p>以下の場合は、別途費用が発生する可能性があります。</p>
        <ul>
          <li>遠方への陸送</li>
          <li>特殊な名義変更手続き</li>
          <li>落札後のキャンセル対応</li>
        </ul>
        <p>事前に説明し、了承を得たうえで進めます。</p>

        <h3>支払いの流れ</h3>
        <p>落札が決定した後に、指定の方法でお支払いとなります。詳細な支払いタイミングや方法は、事前相談時に案内します。</p>
      </section>
    </main>
  );
}
