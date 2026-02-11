/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

export default function Risks() {
  return (
    <main className="pop-page">
      <section className="poster">
        <div className="poster-copy">
          <p className="tagline">リスクも丸わかり</p>
          <h1>オークション代行の注意点</h1>
          <p className="sub">
            メリットだけでなく、デメリットや気を付けるポイントをしっかり共有します。
          </p>
          <div className="cta-row">
            <Link href="/price" className="cta primary">料金を見る</Link>
            <Link href="/" className="cta secondary">トップへ戻る</Link>
          </div>
        </div>
        <div className="poster-img">
          <img src="/img9081.jpg" alt="オークション車両イメージ" onError={(e) => { e.currentTarget.src = "/img9081.jpg?fallback"; }} />
          <div className="burst">注意</div>
        </div>
      </section>

      <section className="risk-cards">
        <article className="risk-card">
          <div className="badge red">POINT 1</div>
          <h3>試乗はできません</h3>
          <p>業者専用市場のため試乗不可。出品票の評価・状態を詳細に確認し、納得の上で入札します。</p>
        </article>
        <article className="risk-card">
          <div className="badge red">POINT 2</div>
          <h3>基本はノークレーム</h3>
          <p>会場基準外の不具合は自己負担。修復歴や注意事項を事前に共有し、リスクを可視化します。</p>
        </article>
        <article className="risk-card">
          <div className="badge red">POINT 3</div>
          <h3>支払いは原則現金一括</h3>
          <p>落札後数日以内に全額振込が必要。資金計画を確認したうえで入札を進めます。</p>
        </article>
      </section>

      <section className="detail-box">
        <h2>中古車オークション特有のリスク</h2>
        <p>実車確認ができない点が最大の特徴。出品票の読み解きと事前説明で、想定外を減らします。</p>
        <ul>
          <li>試乗ができない</li>
          <li>ノークレーム・ノーリターンが基本</li>
          <li>支払いが現金ベースになるケースが多い</li>
        </ul>
        <p>丸印モーターでは評価点・修復歴・注意事項を共有し、納得して判断できるよう伴走します。</p>
      </section>

      <style jsx>{`
        .pop-page {
          max-width: 1080px;
          margin: 32px auto 56px;
          padding: 0 18px;
        }
        .poster {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 16px;
          background: #ffed00;
          border: 8px solid #ff0101;
          border-radius: 16px;
          padding: 20px;
          position: relative;
          box-shadow: 0 14px 24px rgba(0,0,0,0.18);
        }
        .poster-copy .tagline {
          margin: 0;
          color: #0055c4;
          font-weight: 900;
          text-shadow: 1px 1px 0 #fff;
        }
        .poster-copy h1 {
          margin: 8px 0 6px;
          font-size: 32px;
          line-height: 1.2;
          color: #ff0101;
          text-shadow: 3px 3px 0 #fff, 5px 5px 0 #0055c4;
        }
        .poster-copy .sub {
          margin: 0 0 12px;
          font-weight: 700;
        }
        .cta-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .cta {
          padding: 10px 14px;
          border-radius: 10px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 8px 12px rgba(0,0,0,0.16);
        }
        .cta.primary { background: linear-gradient(90deg, #ff3b00, #ff9900); color: #fff; }
        .cta.secondary { background: #0055c4; color: #fff; }
        .poster-img {
          position: relative;
          border: 6px solid #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 12px 18px rgba(0,0,0,0.2);
        }
        .poster-img img { width: 100%; display: block; object-fit: cover; }
        .burst {
          position: absolute;
          top: -12px; left: -12px;
          background: radial-gradient(circle, #ff0101 0%, #ff9900 60%, #ff0101 100%);
          color: #fff;
          font-weight: 900;
          padding: 10px 12px;
          border-radius: 999px;
          border: 4px solid #ffed00;
          transform: rotate(-8deg);
          box-shadow: 0 8px 14px rgba(0,0,0,0.24);
        }

        .risk-cards {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 12px;
        }
        .risk-card {
          background: linear-gradient(135deg, #fff, #fff6cf);
          border: 4px solid #ff0101;
          border-radius: 14px;
          padding: 14px 16px;
          box-shadow: 0 12px 18px rgba(0,0,0,0.16);
        }
        .badge.red {
          display: inline-block;
          background: #ff0101;
          color: #fff;
          font-weight: 900;
          padding: 4px 10px;
          border-radius: 999px;
          border: 2px solid #ffed00;
          margin-bottom: 6px;
        }
        .risk-card h3 { margin: 0 0 6px; color: #0055c4; }
        .risk-card p { margin: 0; font-weight: 700; }

        .detail-box {
          margin-top: 22px;
          background: #fff;
          border: 4px solid #0055c4;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 12px 18px rgba(0,0,0,0.14);
          line-height: 1.7;
        }
        .detail-box h2 { margin: 0 0 8px; color: #ff0101; }
        .detail-box ul { padding-left: 18px; margin: 6px 0; }

        @media (max-width: 820px) {
          .poster { grid-template-columns: 1fr; }
          .poster-copy h1 { font-size: 28px; }
        }
        @media (max-width: 560px) {
          .cta { width: 100%; text-align: center; }
        }
      `}</style>
    </main>
  );
}
