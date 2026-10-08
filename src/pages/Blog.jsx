import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Reveal from '../components/ui/Reveal';
import ArticleCard from '../components/blog/ArticleCard';
import { articles, ARTICLES_PER_PAGE } from '../data/blog';
import { useSeo } from '../hooks/useSeo';

/** Groups articles into rows: one featured, then a pair, repeating. */
function toRows(list) {
  const rows = [];
  for (let i = 0; i < list.length; ) {
    rows.push([list[i]]);
    i += 1;
    if (i < list.length) {
      rows.push(list.slice(i, i + 2));
      i += 2;
    }
  }
  return rows;
}

export default function Blog() {
  const [params] = useSearchParams();
  const pages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const page = Math.min(Math.max(1, Number(params.get('page')) || 1), pages);
  const list = articles.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);
  const rows = toRows(list);

  useSeo({
    title: page > 1 ? `Blog – Page ${page}` : 'Blog',
    description: 'Guides and insights on interlinings for thobes, shirts, tailoring, embroidery and uniforms from the Infuse team.',
    image: articles[0].image,
    path: page > 1 ? `/blog?page=${page}` : '/blog',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Blog' }]} />
      <div className="page-width pb-12 pt-6 md:pb-[60px] md:pt-[34px]">
        <h1 className="h1 mb-5 text-ink-soft md:mb-[22px]">Blog</h1>

        <div className="space-y-12 md:space-y-[60px]">
          {rows.map((row, r) => (
            <Reveal key={row.map((a) => a.slug).join('|')} delay={0.04}>
              {r % 2 === 0 ? (
                <ArticleCard article={row[0]} featured />
              ) : (
                <div className="grid gap-12 md:grid-cols-2 md:gap-2">
                  {row.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2 md:mt-[70px]">
            {page > 1 && (
              <Link to={page - 1 === 1 ? '/blog' : `/blog?page=${page - 1}`} className="inline-flex h-11 w-11 items-center justify-center text-ink/80 hover:text-ink" aria-label="Previous page">
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            )}
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                to={n === 1 ? '/blog' : `/blog?page=${n}`}
                aria-current={n === page ? 'page' : undefined}
                className={`inline-flex h-11 min-w-[44px] items-center justify-center text-[16px] ${
                  n === page ? 'text-ink underline decoration-1 underline-offset-[10px]' : 'text-ink/70 hover:text-ink'
                }`}
              >
                {n}
              </Link>
            ))}
            {page < pages && (
              <Link to={`/blog?page=${page + 1}`} className="inline-flex h-11 w-11 items-center justify-center text-ink/80 hover:text-ink" aria-label="Next page">
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            )}
          </nav>
        )}
      </div>
    </>
  );
}
