import { useEffect } from 'react';
import { SITE } from '../data/site';
import { cdnUrl } from '../lib/images';

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-route document metadata: title, description, canonical, Open Graph
 * and optional JSON-LD structured data.
 */
export function useSeo({ title, description, image, path = '', type = 'website', jsonLd } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} – ${SITE.storeName}` : SITE.defaultTitle;
    const desc = description || SITE.defaultDescription;
    const url = `${SITE.url}${path}`;
    const img = cdnUrl(image || SITE.defaultImage, 1200);

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setCanonical(url);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', img);

    let script;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = 'route';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => script?.remove();
  }, [title, description, image, path, type, jsonLd]);
}
