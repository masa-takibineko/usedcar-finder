import { useEffect, useMemo, useState } from "react";
import { loadAllFromManifest, type Listing } from "./lib/normalize";
import "./styles.css";
import Header from "./components/Header";
import FloatingLine from "./components/FloatingLine";
import { Link } from "react-router-dom";

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
  const [draft, setDraft] = useState<Filters>({ transmission: "ALL", shaken: "all", equip: {} });
  const [applied, setApplied] = useState<Filters>({ transmission: "ALL", shaken: "all", equip: {} });

  useEffect(() => { loadAllFromManifest("data/manifest.json").then(setAll); }, []);
  

  // プルダウン候補（ドラフトに連動）
  const makers = useMemo(() => {
    const rows = all.filter(r =>
      (!draft.model  || r.model === draft.model) &&
        (!draft.grade  || r.grade === draft.grade) &&
        (!draft.trim   || r.trim  === draft.trim)
      );
    return [...new Set(rows.map(r => r.maker))].sort();
  }, [all, draft.model, draft.grade, draft.trim]);
  
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
    <>
      {/* 上部ナビ（会社概要・プライバシー + 件数バッジ） */}
      <Header rightBadge={<>CSV: {all.length}件</>} />

      <section className="hero">
        <div className="best-fee-banner">
          <strong>代行手数料 業界最安値 35,800円（税込）</strong>
        </div>
        <div className="notice">
          <h2>「オークション直販」で、中古車購入の常識を変える。</h2>
          <p>
            オークション相場を知れば、もう高値で買わされない。中間マージンをカットし、
            <strong>適正価格</strong>で理想の車を手に入れましょう。
          </p>
        </div>
        {/* ▼ 公式LINEボタン（固定配置） */}
        <a
          href="https://lin.ee/xxxxx"  // ← あなたのLINE公式URLに置き換え
          target="_blank"
          rel="noopener noreferrer"
          className="line-banner"
        >
          💬 「LINEでお問い合わせ」
        </a>

        {/* ▼ 使い方ガイド */}
        <div className="prose">
          <h3>ご利用の流れ</h3>
          <p style={{marginTop: 8}}>
            オークション代行の注意点については  
            <Link to="/risks" className="prose-link">こちら</Link> をご確認ください。
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
            <Link to="/price" className="prose-link">オークション代行手数料</Link>{" "}
            をご覧ください。<br />
            実際にかかる費用の例は{" "}
            <Link to="/example" className="prose-link">こちら</Link>。
          </p>

        </div>

        {/* 既存の見出し＆説明（そのままでOK） */}
        <h1> </h1>
        <p>条件を選んで「検索」を押すと、該当の行データを全て表示します。</p>
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

            <div className="card" style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {["sr","ac","pw","ps","aw","leather"].map(key => (
                <label key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={!!(draft.equip as any)?.[key]}
                    onChange={e => setDraft({ ...draft, equip: { ...draft.equip, [key]: e.target.checked } })}
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
        <div className="kpis"><div className="kpi">該当件数: {filtered.length}</div></div>

        {filtered.length > 0 && (
          <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid rgba(255,255,255,.12)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>
                  {tableHeaders.map(h => (
                    <th key={h} style={{ textAlign:"left", padding:"10px 8px", borderBottom:"1px solid rgba(255,255,255,.12)" }}>{h}</th>
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
    </>
  );
}
