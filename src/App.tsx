'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { loadAllFromManifest, type Listing } from "./lib/normalize";
import Header from "./components/Header";
import FloatingLine from "./components/FloatingLine";


type Filters = {
  maker?: string; model?: string; grade?: string; trim?: string;
  yearMin?: number; yearMax?: number;
  mileageMin?: number; mileageMax?: number;
  priceMin?: number; priceMax?: number;
  engineCc?: number;
  transmission?: "ALL" | "AT" | "MT" | "5MT" | "6MT" | "CVT";
  color?: string;
  shaken?: "all" | "has" | "none";
  equip?: Partial<Listing["equip"]>;
};

// モデル名にメーカー名が含まれている時は重複を消す（例: "アバルト アバルト500" → "500"）
const dedupeMakerInModel = (maker?: string, model?: string) => {
  if (!maker || !model) return model || "";
  const m = maker.trim();
  const s = model.trim();
  const re = new RegExp(`^${m}[\\s　]*`);
  return s.replace(re, "").trim();
};

// 装備の日本語ラベル
const equipLabel = {
  sr: "サンルーフ",
  ac: "AC",
  pw: "パワーウィンドウ",
  ps: "パワステ",
  aw: "アルミ",
  leather: "本革",
} as const;


const YEARS = Array.from({ length: 2025 - 1985 + 1 }, (_, i) => 1985 + i);

export default function App() {
  const [all, setAll] = useState<Listing[]>([]);
  const [makerFallback, setMakerFallback] = useState<string[]>([]);
  const [draft, setDraft] = useState<Filters>({ transmission: "ALL", shaken: "all", equip: {} });
  const [applied, setApplied] = useState<Filters>({ transmission: "ALL", shaken: "all", equip: {} });

  useEffect(() => {
    let active = true;

    loadAllFromManifest("data/manifest.json", files => {
      if (!active) return;
      const makers = files
        .map(f => f.replace(/_fixed\.csv$/i, "").replace(/\.csv$/i, ""))
        .filter(Boolean);
      setMakerFallback([...new Set(makers)].sort());
    })
      .then(rows => { if (active) setAll(rows); })
      .catch(err => console.error("データの読み込みに失敗しました", err));

    return () => { active = false; };
  }, []);
  

  // プルダウン候補（ドラフトに連動）
  const makers = useMemo(() => {
    const rows = all.filter(r =>
      (!draft.model  || r.model === draft.model) &&
      (!draft.grade  || r.grade === draft.grade) &&
      (!draft.trim   || r.trim  === draft.trim)
      );
    const fromData = [...new Set(rows.map(r => r.maker))].sort();
    return fromData.length ? fromData : makerFallback;
  }, [all, draft.model, draft.grade, draft.trim, makerFallback]);
  
  const models = useMemo(() => {
    const rows = all.filter(r =>
      (!draft.maker || r.maker === draft.maker) &&
      (!draft.grade || r.grade === draft.grade) &&
      (!draft.trim  || r.trim  === draft.trim)
    );
    return [...new Set(rows.map(r => r.model))].sort();
  }, [all, draft.maker, draft.grade, draft.trim]);
  
  const grades = useMemo(() => {
    const rows = all.filter(r =>
      (!draft.maker || r.maker === draft.maker) &&
      (!draft.model || r.model === draft.model) &&
      (!draft.trim  || r.trim  === draft.trim)
    );
    return [...new Set(rows.map(r => r.grade).filter(Boolean) as string[])].sort();
  }, [all, draft.maker, draft.model, draft.trim]);
  
  const trims = useMemo(() => {
    const rows = all.filter(r =>
     (!draft.maker || r.maker === draft.maker) &&
     (!draft.model || r.model === draft.model) &&
     (!draft.grade || r.grade === draft.grade)
    );
    return [...new Set(rows.map(r => r.trim).filter(Boolean) as string[])].sort();
  }, [all, draft.maker, draft.model, draft.grade]);

  // 検索ボタン押下後にだけ適用
  const filtered = useMemo(() => {
    const f = applied;
    return all.filter(r => {
      if (f.maker && r.maker !== f.maker) return false;
      if (f.model && r.model !== f.model) return false;
      if (f.grade && r.grade !== f.grade) return false;
      if (f.trim && r.trim !== f.trim) return false;

      if (f.yearMin && (r.year ?? 0) < f.yearMin) return false;
      if (f.yearMax && (r.year ?? 9999) > f.yearMax) return false;

      if (f.mileageMin && (r.mileage_km ?? 0) < f.mileageMin) return false;
      if (f.mileageMax && (r.mileage_km ?? 9e12) > f.mileageMax) return false;

      if (f.priceMin && r.price_man_yen < f.priceMin) return false;
      if (f.priceMax && r.price_man_yen > f.priceMax) return false;

      if (f.engineCc && (r.engine_cc ?? 0) !== f.engineCc) return false;

      if (f.transmission && f.transmission !== "ALL") {
        if ((r.transmission ?? "") !== f.transmission) return false;
      }
      if (f.color && (r.color ?? "") !== f.color) return false;

      if (f.shaken === "has" && !r.shaken_flag) return false;
      if (f.shaken === "none" && r.shaken_flag) return false;

      if (f.equip) {
        const e = f.equip;
        if (e?.sr && !r.equip.sr) return false;
        if (e?.ac && !r.equip.ac) return false;
        if (e?.pw && !r.equip.pw) return false;
        if (e?.ps && !r.equip.ps) return false;
        if (e?.aw && !r.equip.aw) return false;
        if (e?.leather && !r.equip.leather) return false;
      }
      return true;
    });
  }, [all, applied]);

  // 結果テーブルは概要 + 価格の2列構成
  const tableHeaders = useMemo(() => ["車両情報", "価格"], []);

  const smartSet = (next: Partial<Filters>) => {
    setDraft(prev => ({ ...prev, ...next }));
  };

  return (
    <div
      className="site-bg"
      style={{ backgroundColor: "#ffed00" }}
    >
    <div className="site-bg-overlay">
      {/* 上部ナビ（会社概要・プライバシー + 件数バッジ） */}
      <Header rightBadge={<>CSV: {all.length}件</>} />

      <section className="hero">
        <div className="hero-visual">
          <img
            src="/advertise.jpg"
            alt="オークション直販イメージ"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div
          style={{
            textAlign: "center",
            background: "#991b1b",
            color: "#fff",
            fontSize: "18px",
            fontWeight: 500,
            padding: "14px",
            borderRadius: "6px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
          }}
        >
          手数料期間限定半額キャンペーン実施中
        </div>
        <div className="best-fee-banner">
          <strong>代行手数料 業界最安値級 35,800円（税抜）〜</strong>
        </div>
        <h1>丸印モーターの中古車オークション代行で相場価格のまま購入</h1>
        <p className="hero-lede">
          「中古車購入を安く、でも状態には妥協したくない」方のための業者オークション検索。
          出品票ベースの相場データから、欲しい車種を透明な価格で探せます。
        </p>
        <div className="privacy-cta-row">
          <Link href="/privacy" className="cta-privacy">プライバシーポリシーを見る</Link>
        </div>
        <div className="seo-bullets">
          <span>中古車購入を安くする代行手数料 35,800円〜</span>
          <span>全国の業者オークション相場を横断チェック</span>
          <span>LINEで無料相談・非公開在庫も提案</span>
        </div>
        <p style={{ marginTop: 12, color: "#0f172a" }}>
          丸印モーターは<span style={{ fontWeight: 700 }}>中古車オークション代行</span>を専門に、相場確認から落札まで一括でサポートします。
        </p>
        <div className="notice" style={{
          background: "rgba(251, 191, 36, 0.08)",
          border: "1px solid rgba(251, 191, 36, 0.25)",
        }}>
          <h2 style={{ color: "#92400e" }}>「オークション直販」で、中古車購入の常識を変える。</h2>
          <p>
            オークション相場を知れば、もう高値で買わされない。中間マージンをカットし、
            <strong>適正価格</strong>で理想の車を手に入れましょう。
          </p>
        </div>

        {/* ヒーロー画像（全幅・見切れ防止） */}
        {/* ▼ 公式LINEボタン（固定配置） */}
        <a
          href="https://lin.ee/l6P8Wvx"  // ← あなたのLINE公式URLに置き換え
          target="_blank"
          rel="noopener noreferrer"
          className="line-banner"
        >
          💬 「LINEでお問い合わせ」
        </a>
        <p style={{marginTop:20}}>
              
        </p>

        {/* オークション解説セクション */}
        <section className="prose" style={{ 
          marginTop: 28, 
          padding: "20px",
          background: "rgba(30, 58, 138, 0.06)",
          borderRadius: "8px",
          border: "1px solid rgba(30, 58, 138, 0.15)"
        }}>
          <h2 style={{ color: "#1e3a8a", marginTop: 0 }}>中古車オークションとは？</h2>
          <p>
            中古車オークションとは、全国の業者が出品する車両を会員制の市場で売買する仕組みです。一般的な中古車販売店では、仕入れ後に店舗維持費や人件費、利益が上乗せされますが、オークションではそれらの中間コストが抑えられるため、市場価格に近い金額で中古車を購入できるという特徴があります。
          </p>
          <h3 style={{ color: "#1e3a8a" }}>なぜ中古車を安く購入できるのか</h3>
          <p>
            中古車オークションが安い理由は、仕入れから販売までの流通経路が短いからです。展示場や広告費を持たない分、車両価格そのものにコストが集中します。さらに、相場は入札形式で決まるため、過剰な価格設定が起きにくく、適正価格での購入が可能になります。
          </p>
          <h3 style={{ color: "#1e3a8a" }}>通常の中古車販売との違い</h3>
          <p>
            一般的な中古車販売では「完成された価格」が提示されますが、オークション代行では
            <strong>「車両落札価格」「オークション代行手数料」「必要な諸費用」</strong>を分けて確認できます。価格の内訳が明確なため、納得感を持って判断できるのが大きな違いです。
          </p>
          <h3 style={{ color: "#1e3a8a" }}>どんな人に向いているか</h3>
          <ul>
            <li>少しでも総額を抑えて車を購入したい方</li>
            <li>相場を見ながら納得して決めたい方</li>
            <li>特定の車種・条件が明確な方</li>
          </ul>
          <p>一方で、「実車を見て即決したい方」には一般販売店の方が向く場合もあります。</p>
          <h3 style={{ color: "#1e3a8a" }}>丸印モーターの強み</h3>
          <p>
            丸印モーターでは、業者オークションの相場データと出品票情報をもとに、価格・状態・リスクを可視化しながらサポートします。初めての方でも安心して利用できるよう、事前説明と相談を重視しています。
          </p>
        </section>

        {/* ▼ 使い方ガイド */}
        <div className="prose" style={{ 
          marginTop: 28,
          padding: "20px",
          background: "rgba(22, 101, 52, 0.06)",
          borderRadius: "8px",
          border: "1px solid rgba(22, 101, 52, 0.15)"
        }}>
          <h2 style={{ color: "#166534", marginTop: 0 }}>ご利用の流れ</h2>
          <p style={{marginTop:20}}>
            オークション代行の注意点については  
            <Link href="/risks" className="prose-link">こちら</Link> をご確認ください。
          </p>
          <ol>
            <li>
              弊社公式LINE登録で利用契約書の締結をしていただきます。締結完了後にご利用開始となります。
            </li>
            <li>
              弊社から案内メールが届きますのでその流れに沿ってご自身の欲しい車両を見つけて下さい。
            </li>
            <li>
              車両が見つかりましたら、希望金額を提示していただき、オークション終了までお待ちください。
            </li>
            <li>
              オークション終了後、落札された場合のみご連絡差し上げます。落札後2営業日以内に総額代金のお振込をお願いします。
            </li>
            <li>
              振り込み確認後、納車手続きとなります。
            </li>
          </ol>

          {/* 手数料ページへのリンク（別ページ） */}
          <p style={{ marginTop: 8 }}>
            料金の目安は{" "}
            <Link href="/price" className="prose-link">オークション代行手数料</Link>{" "}
            をご覧ください。<br />
            実際にかかる費用の例は{" "}
            <Link href="/example" className="prose-link">こちら</Link>。
          </p>

        </div>

        {/* 既存の見出し＆説明（そのままでOK） */}
        <div style={{
          marginTop: 32,
          padding: "18px",
          background: "rgba(30, 58, 138, 0.06)",
          borderRadius: "8px",
          border: "1px solid rgba(30, 58, 138, 0.15)"
        }}>
          <h2 style={{ color: "#1e3a8a", marginTop: 0, marginBottom: 12 }}>🚗 車両検索</h2>
          <p style={{ margin: 0, color: "#4a5568" }}>条件を選んで「検索」を押すと、該当の行データを全て表示します。</p>
        </div>
        {/* …以下、あなたの既存の検索カードUI */}


        <div className="card" style={{ marginTop: 12 }}>
          {/* ドリルダウン */}
          <div className="search-grid">
            <select className="select" value={draft.maker || ""} onChange={e => smartSet({ maker: e.target.value || undefined })}>
              <option value="">メーカー（すべて）</option>
              {makers.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select className="select" value={draft.model || ""} onChange={e => smartSet({ model: e.target.value || undefined })}>
              <option value="">車種（すべて）</option>
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select className="select" value={draft.grade || ""} onChange={e => smartSet({ grade: e.target.value || undefined })}>
              <option value="">グレード（すべて）</option>
              {grades.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select className="select" value={draft.trim || ""} onChange={e => smartSet({ trim: e.target.value || undefined })}>
              <option value="">型式（すべて）</option>
              {trims.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* 年式 1985-2025 */}
          <div className="row" style={{ marginTop: 10 }}>
            <select className="select" value={draft.yearMin ?? ""} onChange={e => setDraft({ ...draft, yearMin: e.target.value ? Number(e.target.value) : undefined })}>
              <option value="">年式(最小)</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <select className="select" value={draft.yearMax ?? ""} onChange={e => setDraft({ ...draft, yearMax: e.target.value ? Number(e.target.value) : undefined })}>
              <option value="">年式(最大)</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <input className="input" type="number" placeholder="排気量(cc)" value={draft.engineCc || ""} onChange={e => setDraft({ ...draft, engineCc: e.target.value ? Number(e.target.value) : undefined })} />
          </div>

          {/* 距離/色/価格/シフト/車検/装備 */}
          <div className="row" style={{ marginTop: 10 }}>
            <input className="input" type="number" placeholder="走行距離(最小km)" value={draft.mileageMin || ""} onChange={e => setDraft({ ...draft, mileageMin: e.target.value ? Number(e.target.value) : undefined })} />
            <input className="input" type="number" placeholder="走行距離(最大km)" value={draft.mileageMax || ""} onChange={e => setDraft({ ...draft, mileageMax: e.target.value ? Number(e.target.value) : undefined })} />
            <input className="input" type="text" placeholder="色（例：白）" value={draft.color || ""} onChange={e => setDraft({ ...draft, color: e.target.value || undefined })} />
          </div>

          <div className="row" style={{ marginTop: 10 }}>
            <input className="input" type="number" placeholder="価格(最小・万円)" value={draft.priceMin || ""} onChange={e => setDraft({ ...draft, priceMin: e.target.value ? Number(e.target.value) : undefined })} />
            <input className="input" type="number" placeholder="価格(最大・万円)" value={draft.priceMax || ""} onChange={e => setDraft({ ...draft, priceMax: e.target.value ? Number(e.target.value) : undefined })} />
            <select className="select" value={draft.transmission || "ALL"} onChange={e => setDraft({ ...draft, transmission: e.target.value as any })}>
              <option value="ALL">シフト（すべて）</option>
              <option value="AT">AT</option>
              <option value="MT">MT</option>
              <option value="5MT">5MT</option>
              <option value="6MT">6MT</option>
              <option value="CVT">CVT</option>
            </select>
          </div>

          <div className="row" style={{ marginTop: 10 }}>
            <select className="select" value={draft.shaken || "all"} onChange={e => setDraft({ ...draft, shaken: e.target.value as any })}>
              <option value="all">車検（すべて）</option>
              <option value="has">あり</option>
              <option value="none">なし</option>
            </select>

            <div className="card" style={{ 
              display: "flex", 
              gap: 8, 
              alignItems: "center",
              flexWrap: "wrap",
              padding: "12px",
              minHeight: "auto"
            }}>
              {["sr","ac","pw","ps","aw","leather"].map(key => (
                <label key={key} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 4,
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  flexShrink: 0
                }}>
                  <input
                    type="checkbox"
                    checked={!!(draft.equip as any)?.[key]}
                    onChange={e => setDraft({ ...draft, equip: { ...draft.equip, [key]: e.target.checked } })}
                    style={{ margin: 0, flexShrink: 0 }}
                  />
                  {key.toUpperCase() === "LEATHER" ? "革" : key.toUpperCase()}
                </label>
              ))}
            </div>

            {/* 検索ボタン */}
            <button
              className="card"
              style={{ cursor: "pointer", fontWeight: 700, textAlign: "center" }}
              onClick={() => setApplied({ ...draft })}
              title="選択中の条件で検索"
            >
              検索
            </button>
          </div>
        </div>
      </section>

      {/* 結果：全カラムをテーブルで表示 */}
      <section className="results">
        <div style={{
          marginTop: 32,
          padding: "18px",
          background: "rgba(153, 27, 27, 0.06)",
          borderRadius: "8px",
          border: "1px solid rgba(153, 27, 27, 0.15)",
          marginBottom: 16
        }}>
          <h2 style={{ color: "#991b1b", marginTop: 0, marginBottom: 12 }}>📊 検索結果</h2>
          <div className="kpis"><div className="kpi">該当件数: {filtered.length}</div></div>
        </div>

        {filtered.length > 0 && (
          <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid rgba(0,0,0,.15)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>
                  {tableHeaders.map(h => (
                    <th key={h} style={{ textAlign:"left", padding:"10px 8px", borderBottom:"1px solid rgba(0,0,0,.15)", background:"rgba(0,0,0,.03)", color:"var(--txt)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0,500).map((row, idx) => {
                  const modelClean = dedupeMakerInModel(row.maker, row.model);

                  const topChips = [
                    { label: row.maker, className: "chip maker" },
                    { label: modelClean, className: "chip model" },
                    row.grade ? { label: `グレード: ${row.grade}`, className: "chip" } : null,
                    row.trim  ? { label: `型式: ${row.trim}`,  className: "chip" } : null,
                  ].filter(Boolean) as {label:string; className:string}[];

                  const bottomParts = [
                    row.year ? `年式: ${row.year}` : null,
                    (row.mileage_km!=null) ? `走行: ${row.mileage_km.toLocaleString()} km` : null,
                    (row.engine_cc!=null) ? `排気量: ${row.engine_cc.toLocaleString()} cc` : null,
                    row.color ? `色: ${row.color}` : null,
                    row.transmission ? `シフト: ${row.transmission}` : null,
                    row.shaken_raw ? `車検: ${row.shaken_raw}` : null,
                    row.updated_month ? `更新: ${row.updated_month}` : null,
                  ].filter(Boolean).join(" ／ ");

                  const equips = Object.entries(row.equip || {})
                    .filter(([, v]) => v)
                    .map(([k]) => (equipLabel as any)[k] || k.toUpperCase());

                  return (
                    <tr key={idx} className="result-row">
                      <td className="info-cell">
                        {/* 1段目：ラベル付きチップで読みやすく */}
                        <div className="row-top">
                          {topChips.map((c, i) => (
                            <span key={i} className={c.className}>{c.label}</span>
                          ))}
                        </div>
                        {/* 2段目：詳細 & 装備 */}
                        <div className="row-bottom">
                          {bottomParts || "—"}
                          <span className="sep">　｜　</span>
                          装備: {equips.length ? equips.join("・") : "なし"}
                        </div>
                      </td>

                      {/* 価格：右端・強調（2行分の高さに合わせて縦センター） */}
                      <td className="price-cell">
                        <div className="price-value">
                          {Number.isFinite(row.price_man_yen) ? `${row.price_man_yen} 万円` : "-"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
            {filtered.length > 500 && (
              <div className="badge" style={{ marginTop: 8, display: "inline-block" }}>
                500件まで表示（パフォーマンス保護）
              </div>
            )}
          </div>
        )}
      </section>
      {/*右下に常時表示される LINE 公式ボタン */}
      <FloatingLine />
    </div>
  </div>
  );
}
