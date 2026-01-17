import Link from "next/link";

const testimonials = [
  {
    text: "車を買い替える際にどうしたら安く買えるか探していたところ丸印モーターさんに辿りつきました。キャンペーン中で私が見たサイトの中で1番安い手数料だったので使わせて頂きましたが、滞りなく納車でき非常に良い買い物ができました！",
    author: "30代男性",
    location: "大阪",
  },
  {
    text: "知人からの紹介で丸印モーターさんに今回、メルセデスベンツの購入をお願いしました。するとすぐに欲しい車両が見つかりまして予算内で購入できました。レスポンスの早さと誠実な対応はまさにプロフェッショナルでした。",
    author: "20代女性",
    location: "静岡",
  },
  {
    text: "手数料がとにかく安いのに丁寧に教えてくださり、満足です♪\n陸送費用が時期により高くなるらしいので繁忙期は避けた方がいいです。",
    author: "40代男性",
    location: "埼玉",
  },
];

export default function Testimonials() {
  return (
    <main style={{ maxWidth: 860, margin: "40px auto", padding: "0 16px", color: "#e2e8f0" }}>
      <h1 style={{ marginBottom: 10 }}>お客様の声</h1>
      <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
        実際にご利用いただいたお客様からの声をご紹介します。オークション代行サービスへのご感想や体験談をお寄せいただいています。
      </p>

      <div style={{ marginTop: 30 }}>
        {testimonials.map((item, idx) => (
          <section
            key={idx}
            style={{
              marginBottom: 28,
              padding: "20px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <p
              style={{
                margin: "0 0 16px",
                color: "#e2e8f0",
                lineHeight: 1.8,
                whiteSpace: "pre-line",
              }}
            >
              {item.text}
            </p>
            <div
              style={{
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                color: "#cbd5e1",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {item.author} • {item.location}
            </div>
          </section>
        ))}
      </div>

      <p style={{ marginTop: 32 }}>
        <Link href="/" style={{ color: "#93c5fd", textDecoration: "underline" }}>
          ← トップページに戻る
        </Link>
      </p>
    </main>
  );
}
