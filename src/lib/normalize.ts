import Papa from "papaparse";

export type Listing = {
  maker: string; model: string; grade?: string; trim?: string;
  year?: number; mileage_km?: number; engine_cc?: number;
  transmission?: string; color?: string;
  shaken_raw?: string; shaken_flag?: boolean;
  updated_month?: string;
  price_man_yen: number;
  equip: { sr:boolean; ac:boolean; pw:boolean; ps:boolean; aw:boolean; leather:boolean };
  raw: Record<string, any>; // ← 元CSVの全カラム
};

const z2h = (s: string) => (s ? s.normalize("NFKC") : s);
const resolveAssetUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path;

  const trimmed = path.replace(/^\/+/, "");
  const baseRaw = import.meta.env.BASE_URL ?? "/";

  if (typeof window !== "undefined" && window.location) {
    const baseUrl = new URL(baseRaw, window.location.origin);
    return new URL(trimmed, baseUrl).toString();
  }

  const base = baseRaw.replace(/\/+$/, "");
  if (!base) return trimmed;
  return `${base}/${trimmed}`;
};

const parsePriceMan = (s: string) => {
  if (!s) return NaN;
  const nums = (s.replace(/\s/g, "").match(/\d+(\.\d+)?/g) || []).map(Number);
  if (!nums.length) return NaN;
  return nums.reduce((a,b)=>a+b,0)/nums.length;
};
const parseKm = (s: string) => {
  if (!s) return undefined;
  const m = s.replace(/,|km|㎞/g,'').match(/\d+/);
  return m ? Number(m[0]) : undefined;
};
const parseCc = (s: string) => {
  if (!s) return undefined;
  const m = s.replace(/,|cc|㎤/g,'').match(/\d+/);
  return m ? Number(m[0]) : undefined;
};
const equipDict = (s: string) => {
  const set = new Set((s||'').split(/\s+/).map(z2h));
  return { sr:set.has('SR'), ac:set.has('AC'), pw:set.has('PW'), ps:set.has('PS'), aw:set.has('AW'), leather:set.has('革') };
};
const shakenFlag = (raw?: string) => {
  if (!raw) return false;
  const t = String(raw).trim();
  return !(t===''||t==='なし'||t==='無'||t==='—'||t==='-');
};

export async function loadAndNormalize(csvPath: string): Promise<Listing[]> {
  const url = resolveAssetUrl(csvPath);
  const res = await fetch(url);
  let text = await res.text();
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1); // BOM除去

  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  const rows = parsed.data as Record<string, any>[];

  return rows.map(r => {
    const trans = z2h(String(r['シフト'] || '')).toUpperCase();
    const updated = String(r['更新年月 ▲'] ?? r['更新年月'] ?? '').trim();
    return {
      maker: String(r['メーカー']||'').trim(),
      model: String(r['車種']||'').trim(),
      grade: String(r['グレード']||'').trim() || undefined,
      trim:  String(r['型式']||'').trim() || undefined,
      year:  Number(String(r['年式']||'').match(/\d{4}/)?.[0] || '') || undefined,
      mileage_km: parseKm(String(r['走行']||'')),
      engine_cc: parseCc(String(r['排気量']||'')),
      transmission: trans || undefined,
      color: String(r['色']||'').trim() || undefined,
      shaken_raw:  String(r['車検']||'').trim() || undefined,
      shaken_flag: shakenFlag(String(r['車検']||'')),
      updated_month: updated || undefined,
      price_man_yen: parsePriceMan(String(r['価格']||'')),
      equip: equipDict(String(r['装備']||'')),
      raw: r, // ← そのまま保持
    }
  }).filter(r => r.maker && r.model && !Number.isNaN(r.price_man_yen));
}
// src/lib/normalize.ts の末尾あたりに追記
export async function loadAllFromManifest(
  manifestPath: string,
  onManifestLoaded?: (files: string[]) => void,
): Promise<Listing[]> {
  // BASE_URL を考慮して manifest をロード
  const manifestUrl = resolveAssetUrl(manifestPath);
  const res = await fetch(manifestUrl);
  const files: string[] = await res.json(); // ["abaruto_fixed.csv", "maker_xxx.csv", ...]

  // プルダウン候補用に manifest の読み込み完了を通知
  onManifestLoaded?.(files);

  // 同時ロードで初期化時間を短縮
  const all = await Promise.all(files.map(fname => loadAndNormalize(`data/${fname}`)));
  return all.flat();
}
