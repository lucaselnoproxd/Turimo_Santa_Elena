import { useEffect } from 'react';

export const SITE_URL = 'https://turismo-santa-elena.vercel.app';

export type JsonLdObject = Record<string, unknown> & { '@type': string };

export interface PageHeadProps {
  title: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: JsonLdObject | JsonLdObject[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${CSS.escape(key)}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// SEO por página sin dependencias: deja los <title>/<meta> listos para
// que los rastreadores lean el HTML renderizado (client side rendering).
export default function PageHead({ title, description, image, noindex, jsonLd }: PageHeadProps) {
  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description ?? '');
    upsertMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow');

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description ?? '');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:image', image ?? `${SITE_URL}/favicon.svg`);
    upsertMeta('property', 'og:url', `${SITE_URL}${window.location.pathname}`);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description ?? '');
    upsertMeta('name', 'twitter:image', image ?? `${SITE_URL}/favicon.svg`);

    upsertCanonical(`${SITE_URL}${window.location.pathname}`);

    document.head
      .querySelectorAll('script[data-jsonld]')
      .forEach((el) => el.remove());
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-jsonld', '');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, image, noindex, jsonLd]);

  return null;
}