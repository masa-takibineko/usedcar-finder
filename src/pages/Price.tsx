/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

const priceRows = [
  { range: "100万円未満", fee: "35,800円（税込 39,380円）" },
  { range: "100〜150万円未満", fee: "39,800円（税込 43,780円）" },
  { range: "150〜300万円未満", fee: "44,800円（税込 49,800円）" },
  { range: "300〜500万円未満", fee: "49,800円（税込 54,780円）" },
  { range: "500万円以上", fee: "落札額の 1% ＋ 消費税" },
];

export default function Price() {
  return (
    <main className="price-page">
      <section className="hero-poster">
        <div className="hero-copy">
          <p className="tagline">最新モデルも！中古車オークションで安く手に入る！</p>
          <h1>
            プロが厳選！ <span>オークション直販価格</span> でご提供！
          </h1>
          <p className="subline">市場価格より10〜30%安い！ 安心の品質保証！</p>
          <div className="cta-row">
            <Link href="/" className="cta-primary">
              希望の車を探す
            </Link>
            <Link href="/risks" className="cta-secondary">
              リスクも確認する
            </Link>
          </div>
          <div className="hero-badges">
            <span className="badge yellow">手数料 半額キャンペーン</span>
            <span className="badge blue">全国会場対応</span>
          </div>
        </div>

        <div className="hero-image-wrap">
          <div className="burst">半額</div>
          <img src="/auction-promo.jpg" alt="オークション直販イメージ" />
        </div>
      </section>

      <div className="promo-bar">
        全国のオークション会場から、ご希望の1台を探します！全車種対応！お気軽にご相談ください。
      </div>

      <section className="deals">
        <article className="deal-card">
          <div className="deal-car">BZ4X Z</div>
          <p className="deal-price">
            市場価格600万円 → <span>450万円</span> <small>(150万円お得!)</small>
          </p>
        </article>
        <article className="deal-card">
          <div className="deal-car">プリウスα S</div>
          <p className="deal-price">
            市場価格250万円 → <span>180万円</span> <small>(70万円お得!)</small>
          </p>
        </article>
      </section>

      <section className="price-box">
        <header>
          <div className="chip">PRICE LIST</div>
          <h2>落札価格別 参考手数料</h2>
          <p>ワンプライスで明瞭！全国どこでも同条件。</p>
        </header>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>落札価格帯</th>
                <th>手数料</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((row) => (
                <tr key={row.range}>
                  <td>{row.range}</td>
                  <td>{row.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-shine" aria-hidden />
        </div>
        <p className="note">※ 会場や条件により異なる場合があります。詳細は公式LINEにてご確認ください。</p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>透明見積もり</h3>
          <p>上乗せなし。リアルタイム相場を共有し、手数料だけを明示。</p>
        </div>
        <div className="feature-card">
          <h3>最短即日入札</h3>
          <p>条件ヒアリング後、当日オークションでの入札までスピーディーに代行。</p>
        </div>
        <div className="feature-card">
          <h3>購入後も安心</h3>
          <p>名義変更・陸送・車両チェックをワンストップでサポート。</p>
        </div>
      </section>

      <section className="detail">
        <h2>オークション代行手数料について</h2>
        <p>
          丸印モーターのオークション代行手数料は <strong>35,800円〜</strong>。車両選定サポート・入札代行・出品票チェックを含みます。
        </p>

        <h3>総額はどう決まる？</h3>
        <ul>
          <li>車両落札価格</li>
          <li>オークション代行手数料</li>
          <li>名義変更・陸送などの実費</li>
        </ul>
        <p>店頭販売より総額が抑えられるケースが多いのが特徴です。</p>

        <h3>料金計算の例</h3>
        <p>
          80万円で落札した場合は<strong>「80万円＋手数料＋諸費用」</strong>。事前に目安を共有するので想定外が出にくい設計です。
        </p>

        <h3>追加費用が発生しうるケース</h3>
        <ul>
          <li>遠方への陸送</li>
          <li>特殊な名義変更手続き</li>
          <li>落札後のキャンセル対応</li>
        </ul>
        <p>事前説明・承諾のうえで進めます。</p>
      </section>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Anton&family=M+PLUS+Rounded+1c:wght@500;700;800&display=swap");

        :global(body) {
          margin: 0;
          background: #f8e000;
          font-family: "M PLUS Rounded 1c", "Noto Sans JP", system-ui, -apple-system, sans-serif;
          color: #0d0d0d;
        }

        .price-page {
          max-width: 1080px;
          margin: 36px auto 64px;
          padding: 0 18px;
        }

        .hero-poster {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 18px;
          background: #ffed00;
          border: 10px solid #ff0101;
          border-radius: 18px;
          box-shadow: 0 18px 32px rgba(0, 0, 0, 0.24);
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .hero-poster:before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.08) 14px,
            transparent 14px,
            transparent 28px
          );
          pointer-events: none;
        }

        .hero-copy {
          position: relative;
          z-index: 1;
        }

        .tagline {
          font-size: 18px;
          font-weight: 800;
          color: #0055c4;
          margin: 0 0 6px;
          text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff;
        }

        h1 {
          font-family: "Anton", "M PLUS Rounded 1c", sans-serif;
          font-size: 42px;
          line-height: 1.1;
          margin: 0 0 10px;
          color: #0055c4;
          text-shadow: 3px 3px 0 #fff, 5px 5px 0 #ff0101;
        }

        h1 span {
          color: #ff0101;
          text-shadow: 3px 3px 0 #fff, 6px 6px 0 #0055c4;
        }

        .subline {
          font-size: 22px;
          font-weight: 900;
          color: #ff0101;
          margin: 0 0 14px;
          text-shadow: 2px 2px 0 #fff;
        }

        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 10px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.05em;
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.18);
        }

        .badge.yellow {
          background: #ffed00;
          color: #c40000;
          border: 2px solid #ff0101;
        }

        .badge.blue {
          background: #0055c4;
          color: #fff;
          border: 2px solid #003b8a;
        }

        .cta-primary,
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          border-radius: 10px;
          font-weight: 800;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 10px 14px rgba(0, 0, 0, 0.18);
        }

        .cta-primary {
          background: linear-gradient(90deg, #ff3b00, #ff9900);
          color: #fffbe8;
        }

        .cta-secondary {
          background: #0055c4;
          color: #fff;
        }

        .cta-primary:hover,
        .cta-secondary:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 14px 18px rgba(0, 0, 0, 0.22);
        }

        .hero-image-wrap {
          position: relative;
          z-index: 1;
          border-radius: 12px;
          overflow: hidden;
          border: 6px solid #fff;
          box-shadow: 0 14px 22px rgba(0, 0, 0, 0.22);
          background: #fff;
        }

        .hero-image-wrap img {
          width: 100%;
          display: block;
          object-fit: cover;
        }

        .burst {
          position: absolute;
          top: -12px;
          left: -12px;
          background: radial-gradient(circle, #ff0101 0%, #ff9900 60%, #ff0101 100%);
          color: #fff;
          font-weight: 900;
          font-size: 18px;
          padding: 12px 14px;
          border-radius: 999px;
          transform: rotate(-8deg);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          border: 4px solid #ffed00;
        }

        .promo-bar {
          margin: 12px 0 18px;
          background: #ff0101;
          color: #fffbe8;
          border: 6px solid #ffed00;
          border-radius: 14px;
          padding: 12px 16px;
          font-weight: 900;
          text-align: center;
          box-shadow: 0 14px 18px rgba(0, 0, 0, 0.18);
          text-shadow: 1px 1px 0 #c40000;
        }

        .deals {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 12px;
          margin: 8px 0 18px;
        }

        .deal-card {
          background: linear-gradient(135deg, #fff, #fff6cf);
          border: 4px solid #ff0101;
          border-radius: 12px;
          padding: 14px 16px;
          box-shadow: 0 12px 18px rgba(0, 0, 0, 0.16);
        }

        .deal-car {
          font-family: "Anton", "M PLUS Rounded 1c", sans-serif;
          font-size: 24px;
          color: #0055c4;
          text-shadow: 2px 2px 0 #fff;
          margin-bottom: 6px;
        }

        .deal-price {
          margin: 0;
          font-size: 16px;
          font-weight: 800;
          color: #222;
        }

        .deal-price span {
          color: #ff0101;
          font-size: 22px;
          margin-left: 4px;
        }

        .deal-price small {
          color: #c40000;
          margin-left: 6px;
        }

        .price-box {
          margin-top: 32px;
          background: #fff;
          border: 6px solid #ff0101;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 14px 24px rgba(0, 0, 0, 0.18);
        }

        .chip {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          background: #0055c4;
          color: #fff;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.08em;
        }

        .price-box h2 {
          margin: 8px 0 4px;
          font-size: 24px;
          color: #0d0d0d;
        }

        .price-box p {
          margin: 0 0 12px;
          color: #444;
        }

        .table-card {
          position: relative;
          border: 3px solid #ff9900;
          border-radius: 14px;
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        thead th {
          text-align: left;
          padding: 14px 16px;
          background: #ffe6b0;
          color: #111;
          font-weight: 900;
        }

        tbody td {
          padding: 12px 16px;
          border-top: 1px solid #ffd280;
          font-weight: 700;
        }

        tbody tr:nth-child(odd) {
          background: #fff8e6;
        }

        tbody tr:hover {
          background: #ffe9c7;
        }

        tbody td:last-child {
          text-align: right;
          color: #ff0101;
        }

        .table-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.4) 45%, transparent 65%);
          animation: slide 3.8s infinite ease-in-out;
          pointer-events: none;
        }

        @keyframes slide {
          to {
            transform: translateX(120%);
          }
        }

        .note {
          margin: 10px 0 0;
          font-size: 13px;
          color: #333;
        }

        .features {
          margin-top: 26px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }

        .feature-card {
          background: linear-gradient(135deg, #fff, #fff6cf);
          border: 3px solid #ff0101;
          border-radius: 14px;
          padding: 14px 16px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.14);
        }

        .feature-card h3 {
          margin: 0 0 6px;
          font-size: 18px;
          color: #0055c4;
          text-shadow: 1px 1px 0 #fff;
        }

        .feature-card p {
          margin: 0;
          font-weight: 600;
          color: #222;
        }

        .detail {
          margin-top: 28px;
          padding: 16px;
          background: #fff;
          border: 4px solid #0055c4;
          border-radius: 14px;
          box-shadow: 0 12px 22px rgba(0, 0, 0, 0.16);
          line-height: 1.7;
        }

        .detail h2 {
          margin: 0 0 10px;
          color: #ff0101;
          font-size: 22px;
          text-shadow: 1px 1px 0 #ffe6b0;
        }

        .detail h3 {
          margin: 16px 0 8px;
          color: #0055c4;
          font-size: 18px;
        }

        .detail ul {
          padding-left: 18px;
          margin: 0 0 6px;
        }

        @media (max-width: 840px) {
          .hero-poster {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 34px;
          }
        }

        @media (max-width: 560px) {
          .hero-poster {
            padding: 18px;
          }

          h1 {
            font-size: 28px;
          }

          .subline {
            font-size: 18px;
          }

          .cta-primary,
          .cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
