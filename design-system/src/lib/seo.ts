type PageMetadata = {
  title: string;
  description: string;
  canonicalPath?: string;
  robots?: string;
};

const siteUrl = "https://www.embarpet.com.br";

function updateMeta(selector: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

/** Keeps page metadata coherent when a SPA route changes. */
export function setPageMetadata({ title, description, canonicalPath = "/", robots = "index,follow" }: PageMetadata) {
  if (typeof document === "undefined") return () => undefined;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const previous = {
    title: document.title,
    description: document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content,
    robots: document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content,
    canonical: canonical?.href,
  };

  document.title = title;
  updateMeta('meta[name="description"]', description);
  updateMeta('meta[name="robots"]', robots);
  updateMeta('meta[property="og:title"]', title);
  updateMeta('meta[property="og:description"]', description);
  updateMeta('meta[property="og:url"]', canonicalUrl);
  updateMeta('meta[name="twitter:title"]', title);
  updateMeta('meta[name="twitter:description"]', description);
  if (canonical) canonical.href = canonicalUrl;

  return () => {
    document.title = previous.title;
    if (previous.description) updateMeta('meta[name="description"]', previous.description);
    if (previous.robots) updateMeta('meta[name="robots"]', previous.robots);
    if (previous.canonical && canonical) canonical.href = previous.canonical;
  };
}
