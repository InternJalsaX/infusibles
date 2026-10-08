import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { SITE } from '../../data/site';

/**
 * Breadcrumb trail with a house icon for "Home", as on the reference store.
 * items: [{ label, to? }] — the last item is the current page.
 */
export default function Breadcrumbs({ items }) {
  const trail = [{ label: 'Home', to: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.to && { item: `${SITE.url}${item.to}` }),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="page-width py-3 md:py-[14px]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] tracking-[0.69px] text-navy/80 md:text-[16px]">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="px-1 text-[13px] text-navy/70">
                  ›
                </span>
              )}
              {last || !item.to ? (
                <span aria-current={last ? 'page' : undefined} className="text-navy/80">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="inline-flex items-center gap-1.5 text-navy/80 hover:text-navy">
                  {i === 0 && <Home className="h-[18px] w-[18px] fill-navy/80 text-navy/80" strokeWidth={1.5} aria-hidden="true" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </nav>
  );
}
