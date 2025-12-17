import { useEffect } from "react";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

type SeoProps = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  noIndex?: boolean;
  jsonLd?: JsonLd;
};

const SITE_NAME = "MOQ商会 | 中古車オークション代行";
const BRAND_NAME = "MOQ商会";
const DEFAULT_IMAGE_PATH = "/og-image.jpg";
const LOCALE = "ja_JP";

const getBasePath = () => {
  const raw = import.meta.env.BASE_URL ?? "/";
  const trimmed = raw.replace(/\/+$/, "");
  return trimmed || "/";
};

const getSiteBaseUrl = () => {
  const basePath = getBasePath();
  const base = basePath === "/" ? "" : basePath;
  return `${window.location.origin}${base}`;
};

const toCanonicalUrl = (path: string) => {
  const baseUrl = getSiteBaseUrl();
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${safePath === "/" ? "/" : safePath}`;
};

const upsertMeta = (key: { name?: string; property?: string }, content: string) => {
  const selector = key.name ? `meta[name="${key.name}"]` : `meta[property="${key.property!}"]`;

  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    if (key.name) element.setAttribute("name", key.name);
    if (key.property) element.setAttribute("property", key.property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const upsertLink = (rel: string, attrs: Record<string, string>) => {
  const selector = `link[rel="${rel}"]`;
  let element = document.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  for (const [k, v] of Object.entries(attrs)) element.setAttribute(k, v);
};

const upsertJsonLd = (json: Record<string, unknown>) => {
  const id = "ld-json";
  let element = document.getElementById(id) as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.text = JSON.stringify(json);
};

const buildDefaultJsonLd = (canonicalUrl: string, title: string, path: string) => {
  const siteUrl = toCanonicalUrl("/");

  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: BRAND_NAME,
      url: siteUrl,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: SITE_NAME,
      publisher: { "@id": `${siteUrl}#organization` },
      inLanguage: "ja-JP",
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#organization` },
      inLanguage: "ja-JP",
    },
  ];

  if (path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
        { "@type": "ListItem", position: 2, name: title, item: canonicalUrl },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

export default function Seo({ title, description, path, imagePath, noIndex, jsonLd }: SeoProps) {
  useEffect(() => {
    const canonicalUrl = toCanonicalUrl(path);
    const absoluteImageUrl = `${getSiteBaseUrl()}${imagePath ?? DEFAULT_IMAGE_PATH}`;

    document.documentElement.lang = "ja";
    document.title = title;

    upsertMeta({ name: "description" }, description);
    upsertMeta(
      { name: "robots" },
      noIndex
        ? "noindex,nofollow"
        : "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"
    );

    upsertLink("canonical", { href: canonicalUrl });
    upsertLink("alternate", { href: canonicalUrl, hreflang: "ja" });

    upsertMeta({ property: "og:type" }, "website");
    upsertMeta({ property: "og:site_name" }, SITE_NAME);
    upsertMeta({ property: "og:title" }, title);
    upsertMeta({ property: "og:description" }, description);
    upsertMeta({ property: "og:url" }, canonicalUrl);
    upsertMeta({ property: "og:image" }, absoluteImageUrl);
    upsertMeta({ property: "og:image:alt" }, `${SITE_NAME} OGP画像`);
    upsertMeta({ property: "og:locale" }, LOCALE);

    upsertMeta({ name: "twitter:card" }, "summary_large_image");
    upsertMeta({ name: "twitter:title" }, title);
    upsertMeta({ name: "twitter:description" }, description);
    upsertMeta({ name: "twitter:image" }, absoluteImageUrl);
    upsertMeta({ name: "twitter:image:alt" }, `${SITE_NAME} OGP画像`);

    const defaultJson = buildDefaultJsonLd(canonicalUrl, title, path);
    if (jsonLd) {
      const graph = (defaultJson["@graph"] as Array<Record<string, unknown>>).slice();
      const extra = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      graph.push(...extra);
      upsertJsonLd({ "@context": "https://schema.org", "@graph": graph });
    } else {
      upsertJsonLd(defaultJson);
    }
  }, [title, description, path, imagePath, noIndex, jsonLd]);

  return null;
}
