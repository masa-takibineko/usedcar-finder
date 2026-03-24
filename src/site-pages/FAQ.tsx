"use client";
import Image from "next/image";
import Link from "next/link";
import { faqs } from "./faqData";

export default function FAQ() {
  return (
    <main className="pop-page">
      <section className="poster">
        <div className="poster-copy">
          <p className="tagline">初めてでも安心！</p>
          <h1>よくある質問で不安を解消</h1>
          <p className="sub">
            オークション代行の疑問をギュッとまとめました。LINE相談はもちろん無料！
          </p>
          <div className="cta-row">
            <Link href="/" className="cta primary">トップへ戻る</Link>
            <Link href="/price" className="cta secondary">料金を見る</Link>
          </div>
        </div>
        <div className="poster-img">
          <Image
            src="/img9082.jpg"
            alt="オークション車両イメージ"
            width={1200}
            height={800}
            sizes="(max-width: 820px) 100vw, 40vw"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="burst">FAQ</div>
        </div>
      </section>

      <section className="faq-grid">
        {faqs.map((item, idx) => (
          <article key={idx} className="faq-card">
            <div className="q">Q{idx + 1}</div>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </article>
        ))}
      </section>

      <style jsx>{`
        .pop-page {
          max-width: 1080px;
          margin: 32px auto 56px;
          padding: 0 18px;
          color: #0d0d0d;
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

        .faq-grid {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 12px;
        }
        .faq-card {
          background: linear-gradient(135deg, #fff, #fff6cf);
          border: 4px solid #ff0101;
          border-radius: 14px;
          padding: 14px 16px;
          box-shadow: 0 12px 18px rgba(0,0,0,0.16);
        }
        .faq-card .q {
          display: inline-block;
          background: #0055c4;
          color: #fff;
          font-weight: 900;
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 6px;
        }
        .faq-card h3 {
          margin: 0 0 8px;
          color: #ff0101;
        }
        .faq-card p {
          margin: 0;
          font-weight: 700;
        }

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
