import { useEffect } from 'react';

function setMeta(
  attr: 'name' | 'property',
  value: string,
  content: string,
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${value}"]`,
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets document title and injects SEO meta tags on mount.
 * Requirements: 14.1–14.5
 */
export function useSeoMeta(): void {
  useEffect(() => {
    document.title = 'Firman Nafis — DevOps & AI Engineer';

    const description =
      'Muhammad Firman Nafis Aufa Suyanto — DevOps & AI Engineer and Information Systems student building practical solutions through infrastructure, data, and AI.';

    setMeta('name', 'description', description);

    // Open Graph
    setMeta('property', 'og:title', 'Firman Nafis — DevOps & AI Engineer');
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', 'https://firmannafis.dev');
    setMeta('property', 'og:image', 'https://firmannafis.dev/og-image.png');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', 'Firman Nafis — DevOps & AI Engineer');
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', 'https://firmannafis.dev/og-image.png');

    // Canonical
    setLink('canonical', 'https://firmannafis.dev');
  }, []);
}
