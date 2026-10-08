import { useCallback, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Image from '../components/ui/Image';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import FAQ from '../components/ui/FAQ';
import ProductGrid from '../components/product/ProductGrid';
import CollectionToolbar from '../components/collection/CollectionToolbar';
import BulkOrderCta from '../components/sections/BulkOrderCta';
import { applyFilters, facetCounts, readFilters } from '../components/collection/filters';
import { getCollection } from '../data/collections';
import { getProductsByCollection, products as allProducts } from '../data/products';
import { STORE_CONFIG } from '../data/site';
import { HOME_FAQS } from '../data/faqs';
import { useSeo } from '../hooks/useSeo';
import NotFound from './NotFound';

const ALL = {
  handle: 'all',
  title: 'All Products',
  description: 'Every interlining, fabric and trim in the Infuse range — woven and non-woven fusibles for thobes, shirts, tailoring and embroidery, plus finishing tapes.',
  seoDescription: 'Shop the full Infuse range of woven and non-woven interlinings, fabrics and accessories.',
  faqs: HOME_FAQS.slice(0, 4),
};

export default function Collection() {
  const { handle } = useParams();
  const [params, setParams] = useSearchParams();
  const collection = handle === 'all' ? ALL : getCollection(handle);
  const [visible, setVisible] = useState(STORE_CONFIG.productsPerPage);

  const base = useMemo(() => (handle === 'all' ? allProducts : getProductsByCollection(handle)), [handle]);
  const filters = useMemo(() => readFilters(params), [params]);
  const results = useMemo(() => applyFilters(base, filters), [base, filters]);
  const counts = useMemo(() => facetCounts(base), [base]);

  const setParam = useCallback(
    (changes) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(changes).forEach(([key, value]) => {
            next.delete(key);
            if (Array.isArray(value)) value.forEach((v) => next.append(key, v));
            else if (value != null && value !== '') next.set(key, String(value));
          });
          return next;
        },
        { replace: true, preventScrollReset: true },
      );
      setVisible(STORE_CONFIG.productsPerPage);
    },
    [setParams],
  );

  const clearAll = useCallback(() => {
    setParams((prev) => {
      const next = new URLSearchParams();
      if (prev.get('sort')) next.set('sort', prev.get('sort'));
      return next;
    }, { replace: true, preventScrollReset: true });
  }, [setParams]);

  useSeo({
    title: collection?.title,
    description: collection?.seoDescription,
    image: collection?.banner,
    path: `/collections/${handle}`,
    jsonLd: collection && {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: collection.title,
      description: collection.seoDescription,
      numberOfItems: base.length,
    },
  });

  if (!collection) return <NotFound />;

  const shown = results.slice(0, visible);
  const remaining = results.length - shown.length;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Shop Now', to: handle === 'all' ? undefined : '/collections/all' }, ...(handle === 'all' ? [] : [{ label: collection.title }])]} />

      {collection.banner && <Image src={collection.banner} alt={collection.title} ratio="5000 / 1537" priority sizes="100vw" widths={[640, 960, 1280, 1600, 1920, 2560]} />}

      <section className="page-width pb-6 pt-8 text-center md:pb-[40px] md:pt-[46px]">
        <Reveal>
          <h1 className="h1 mb-4 text-ink md:mb-[26px]">{collection.title}</h1>
          <p className="mx-auto max-w-[880px] text-ink-body">{collection.description}</p>
        </Reveal>
      </section>

      <section className="page-width pb-4 md:pt-[30px]" aria-label="Products">
        <CollectionToolbar filters={filters} counts={counts} total={results.length} setParam={setParam} clearAll={clearAll} />

        {results.length ? (
          <ProductGrid products={shown} priorityCount={4} />
        ) : (
          <div className="py-16 text-center">
            <p className="h3 mb-3 text-ink">No products found</p>
            <p className="mb-6 text-ink-body">Try removing a filter or widening the price range.</p>
            <Button variant="secondary" onClick={clearAll}>
              Remove all filters
            </Button>
          </div>
        )}

        {remaining > 0 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="text-[14px] text-ink/60">
              Showing {shown.length} of {results.length} products
            </p>
            <Button variant="secondary" onClick={() => setVisible((v) => v + STORE_CONFIG.productsPerPage)}>
              Load more
            </Button>
          </div>
        )}
      </section>

      <BulkOrderCta />

      {collection.faqs?.length > 0 && <FAQ items={collection.faqs} tone="ink" titleSize="h1" />}
    </>
  );
}
