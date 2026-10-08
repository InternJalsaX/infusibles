import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import Drawer from '../ui/Drawer';
import Image from '../ui/Image';
import { useUI } from '../../context/UIContext';
import { searchProducts } from '../../data/products';
import { collections } from '../../data/collections';
import { articles } from '../../data/blog';

const POPULAR = ['IF2344', 'Shirt', 'Non-woven', 'Embroidery', 'Tapes'];

/**
 * Predictive search overlay (Dawn style): a bar drops down over the header
 * with a bordered field; results update as you type and Enter opens the
 * full results page.
 */
export default function SearchModal() {
  const { overlay, close } = useUI();
  const open = overlay === 'search';
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    return {
      products: searchProducts(q).slice(0, 6),
      collections: collections.filter((c) => c.title.toLowerCase().includes(q)).slice(0, 3),
      articles: articles.filter((a) => a.title.toLowerCase().includes(q)).slice(0, 3),
    };
  }, [query]);

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    close();
  };

  const total = results ? results.products.length + results.collections.length + results.articles.length : 0;

  return (
    <Drawer open={open} onClose={close} side="top" label="Search" className="max-h-[85vh]">
      <div className="page-width flex items-center gap-3 py-5 md:py-[38px]">
        <form onSubmit={submit} role="search" className="relative mx-auto flex w-full max-w-[740px] items-center">
          <label htmlFor="site-search" className="sr-only">
            Search
          </label>
          <input
            id="site-search"
            data-autofocus
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="h-[52px] w-full border border-line-strong bg-white pl-[17px] pr-14 text-body-lg text-ink outline-none transition-shadow placeholder:text-ink/55 focus:shadow-[0_0_0_1px_rgb(17_17_17_/_0.55)]"
          />
          <button type="submit" className="absolute right-0 top-0 flex h-[52px] w-[52px] items-center justify-center text-ink" aria-label="Search">
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </form>
        <button type="button" onClick={close} className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink hover:scale-110" aria-label="Close search">
          <X className="h-6 w-6" strokeWidth={1.3} />
        </button>
      </div>

      <div className="overflow-y-auto border-t border-line">
        <div className="mx-auto w-full max-w-[740px] px-gutter pb-8 pt-5 md:px-0">
          {!results && (
            <div>
              <p className="mb-3 text-[13px] uppercase tracking-[1.3px] text-ink/60">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="rounded-pill border border-line-strong/40 px-4 py-1.5 text-[15px] text-ink transition-colors hover:border-ink"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results && total === 0 && (
            <p className="text-ink-body" role="status">
              No results found for “{query}”. Try a product code such as IF2344, or browse a collection.
            </p>
          )}

          {results && total > 0 && (
            <div className="grid gap-8 md:grid-cols-[1fr_220px]" role="status" aria-live="polite">
              <div>
                <p className="mb-3 border-b border-line pb-2 text-[13px] uppercase tracking-[1.3px] text-ink/60">Products</p>
                {results.products.length ? (
                  <ul className="space-y-1">
                    {results.products.map((p) => (
                      <li key={p.handle}>
                        <Link to={`/products/${p.handle}`} onClick={close} className="group flex items-center gap-4 rounded p-1.5 hover:bg-surface-subtle">
                          <Image src={p.images[0]} alt="" ratio={5 / 4} sizes="72px" widths={[120, 180]} className="w-[72px] shrink-0" />
                          <span>
                            <span className="block font-heading text-[18px] text-ink group-hover:underline">{p.title}</span>
                            <span className="text-[14px] text-ink/60">{p.specs.Type}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[15px] text-ink/60">No matching products.</p>
                )}
              </div>
              <div className="space-y-6">
                {results.collections.length > 0 && (
                  <div>
                    <p className="mb-3 border-b border-line pb-2 text-[13px] uppercase tracking-[1.3px] text-ink/60">Collections</p>
                    <ul className="space-y-2">
                      {results.collections.map((c) => (
                        <li key={c.handle}>
                          <Link to={`/collections/${c.handle}`} onClick={close} className="text-[15px] text-ink hover:underline">
                            {c.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {results.articles.length > 0 && (
                  <div>
                    <p className="mb-3 border-b border-line pb-2 text-[13px] uppercase tracking-[1.3px] text-ink/60">Articles</p>
                    <ul className="space-y-2">
                      {results.articles.map((a) => (
                        <li key={a.slug}>
                          <Link to={`/blog/${a.slug}`} onClick={close} className="text-[15px] text-ink hover:underline">
                            {a.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button type="button" onClick={submit} className="flex items-center gap-2 text-[15px] text-ink hover:underline md:col-span-2">
                Search for “{query}” <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
}
