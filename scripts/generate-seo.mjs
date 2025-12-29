import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const pkgPath = path.join(repoRoot, "package.json");
const publicDir = path.join(repoRoot, "public");

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const homepage = String(pkg.homepage ?? "").trim();
if (!homepage) {
  throw new Error('package.json に "homepage" がありません。例: https://example.com/usedcar-finder');
}

const siteRoot = homepage.endsWith("/") ? homepage : `${homepage}/`;

const routes = [
  "/",
  "/price",
  "/example",
  "/risks",
  "/company",
  "/privacy",
  "/faq",
];

const toUrl = (routePath) => {
  if (routePath === "/") return siteRoot;
  const normalized = routePath.replace(/^\//, "");
  return `${siteRoot}${normalized}`;
};

const now = new Date().toISOString().slice(0, 10);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => {
    const loc = toUrl(r);
    const priority = r === "/" ? "1.0" : "0.7";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /
Disallow: /data/

Sitemap: ${siteRoot}sitemap.xml
`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

console.log(`[SEO] Generated sitemap.xml and robots.txt for ${siteRoot}`);
