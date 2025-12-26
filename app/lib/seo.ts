export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://usedcar-finder.vercel.app";

export const lang = "ja-JP";

export const webPageJsonLd = (path: string, name: string, description: string) => {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}#organization` },
  };
};

export const breadcrumbJsonLd = (path: string, name: string) => {
  if (path === "/") return null;
  const url = `${SITE_URL}${path}`;
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
};

