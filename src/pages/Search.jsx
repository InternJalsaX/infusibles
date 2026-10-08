import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import ArticleCard from '../components/blog/ArticleCard';
import Button from '../components/ui/Button';
import { searchProducts } from '../data/products';
import { articles } from '../data/blog';
import { useSeo } from '../hooks/useSeo';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const [input, setInput] = useState(q);

  useEffect(() => setInput(q), [q]);

  const products = useMemo(() => searchProducts(q), [q]);
  const posts = useMemo(() => {
    const term = q.trim().toLowerCase();
    return term ? articles.filter((a) => `${a.title} ${a.excerpt}`.toLowerCase().includes(term)) : [];
  }, [q]);

  useSeo({ title: q ? `Search: ${q}` : 'Search', path: `/search${q ? `?q=${encodeURIComponent(q)}` : ''}` });

  const submit = (e) => {
    e.preventDefault();
    setParams(input.trim() ? { q: input.trim() } : {});
  };

  const total = products.length + posts.length;

  return (
    <section className="page-width pb-16 pt-10 md:pb-[80px] md:pt-[50px]">
      <h1 className="h1 mb-7 text-center text-ink">Search results</h1>
      <form onSubmit={submit} role="search" className="relative mx-auto mb-4 max-w-[640px]">
        <label htmlFor="search-page" className="sr-only">
          Search
        </label>
        <input
          id="search-page"
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search"
          className="h-[52px] w-full border border-line-strong bg-transparent pl-4 pr-14 text-body-lg text-ink outline-none focus:shadow-[0_0_0_1px_rgb(17_17_17_/_0.55)]"
        />
        <button type="submit" className="absolute right-0 top-0 flex h-[52px] w-[52px] items-center justify-center" aria-label="Search">
          <SearchIcon className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </form>
      {q && (
        <p className="mb-10 text-center text-ink/70" role="status">
          {total} {total === 1 ? 'result' : 'results'} for “{q}”
        </p>
      )}

      {q && total === 0 && (
        <div className="py-10 text-center">
          <p className="mb-6 text-ink-body">Check the spelling or try a product code like IF2344, or browse all products.</p>
          <Button to="/collections/all">View all products</Button>
        </div>
      )}

      {products.length > 0 && (
        <div className="mb-14">
          <h2 className="h3 mb-6 text-ink">Products</h2>
          <ProductGrid products={products} />
        </div>
      )}
      {posts.length > 0 && (
        <div>
          <h2 className="h3 mb-6 text-ink">Articles</h2>
          <div className="grid gap-12 md:grid-cols-2 md:gap-2">
            {posts.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
