import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PackageX, Truck } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Reveal from '../components/ui/Reveal';
import ProductGallery from '../components/product/ProductGallery';
import ProductForm from '../components/product/ProductForm';
import ProductGrid from '../components/product/ProductGrid';
import { getProduct, getRelatedProducts } from '../data/products';
import { getCollection } from '../data/collections';
import { SITE, STORE_CONFIG } from '../data/site';
import { cdnUrl } from '../lib/images';
import { useSeo } from '../hooks/useSeo';
import NotFound from './NotFound';

function TrustBadges() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-2 rounded-[8px] border border-ink/15 px-3 py-5 text-center">
      <div className="flex flex-col items-center">
        <Truck className="mb-2 h-7 w-7 text-ink" strokeWidth={1.3} aria-hidden="true" />
        <p className="text-[15px] font-bold leading-tight tracking-[0.5px] text-maroon md:text-[16px]">Dispatches Within</p>
        <p className="text-[13.5px] tracking-[0.5px] text-navy/90">1-3 Business Days</p>
      </div>
      <div className="flex flex-col items-center">
        <PackageX className="mb-2 h-7 w-7 text-ink" strokeWidth={1.3} aria-hidden="true" />
        <p className="text-[15px] font-bold leading-tight tracking-[0.5px] text-maroon md:text-[16px]">Returns &amp; Exchanges</p>
        <p className="text-[13.5px] tracking-[0.5px] text-navy/90">Not Accepted</p>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { handle } = useParams();
  const product = getProduct(handle);
  const collection = product && getCollection(product.collections[0]);
  const related = useMemo(() => (product ? getRelatedProducts(product) : []), [product]);

  const jsonLd = useMemo(
    () =>
      product && {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        sku: product.handle.toUpperCase(),
        brand: { '@type': 'Brand', name: SITE.name },
        image: product.images.map((src) => cdnUrl(src, 1200)),
        description: product.description.join(' '),
        offers: {
          '@type': 'Offer',
          url: `${SITE.url}/products/${product.handle}`,
          priceCurrency: STORE_CONFIG.currency.code,
          price: product.price.toFixed(2),
          availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          seller: { '@type': 'Organization', name: SITE.legalName },
        },
      },
    [product],
  );

  useSeo({
    title: product?.title,
    description: product?.description[0],
    image: product?.images[0],
    path: `/products/${handle}`,
    type: 'product',
    jsonLd,
  });

  if (!product) return <NotFound />;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Shop Now', to: '/collections/all' },
          ...(collection ? [{ label: collection.title, to: `/collections/${collection.handle}` }] : []),
          { label: product.title },
        ]}
      />

      <section className="page-width pb-12 pt-4 md:pb-[60px] md:pt-[36px]">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:gap-10 lg:grid-cols-[minmax(0,820px)_minmax(0,398px)] lg:justify-between">
          <div className="md:sticky md:top-[calc(var(--announcement-height)+24px)] md:self-start">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          <div>
            <Reveal>
              <p className="mb-1 text-[13px] uppercase tracking-[1.3px] text-ink/75">{product.vendor}</p>
              <h1 className="h1 mb-5 text-ink">{product.title}</h1>
              <ProductForm product={product} />
              <TrustBadges />

              <div className="mt-8 space-y-5 text-ink-body">
                {product.description.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
                {product.specs.Width && (
                  <p>
                    <strong className="font-bold text-ink/85">Width Available:</strong> {product.specs.Width}
                  </p>
                )}
                <p>
                  For any questions regarding this product, contact us at{' '}
                  <a href={SITE.phoneHref} className="font-bold text-ink/85 hover:underline">
                    {SITE.phone}
                  </a>{' '}
                  or email us at{' '}
                  <a href={`mailto:${SITE.email}`} className="font-bold text-ink/85 hover:underline">
                    {SITE.email}
                  </a>
                </p>
              </div>

              <div className="mt-8">
                <h2 className="mb-3 font-heading text-[22px] text-ink">Specifications</h2>
                <dl className="divide-y divide-line border-y border-line text-[15px]">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[140px_1fr] gap-4 py-3">
                      <dt className="text-ink/60">{key}</dt>
                      <dd className="text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-[14px] text-ink/60">A full technical specification sheet is supplied with every order.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-y border-t border-line pb-16 md:pb-20" aria-labelledby="related-title">
          <div className="page-width">
            <div className="mb-6 flex items-end justify-between gap-4 md:mb-[34.5px]">
              <h2 id="related-title" className="h2 text-ink">
                You may also like
              </h2>
              {collection && (
                <Link to={`/collections/${collection.handle}`} className="whitespace-nowrap text-[15px] text-ink underline-offset-4 hover:underline">
                  View all
                </Link>
              )}
            </div>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </>
  );
}
