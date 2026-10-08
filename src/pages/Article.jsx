import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Image from '../components/ui/Image';
import Button from '../components/ui/Button';
import ArticleCard from '../components/blog/ArticleCard';
import { articles, getArticle } from '../data/blog';
import { SITE } from '../data/site';
import { cdnUrl } from '../lib/images';
import { formatDate } from '../lib/format';
import { useSeo } from '../hooks/useSeo';
import NotFound from './NotFound';

export default function Article() {
  const { slug } = useParams();
  const article = getArticle(slug);

  useSeo({
    title: article?.title,
    description: article?.excerpt,
    image: article?.image,
    path: `/blog/${slug}`,
    type: 'article',
    jsonLd: article && {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      datePublished: article.date,
      image: cdnUrl(article.image, 1200),
      author: { '@type': 'Organization', name: SITE.name },
      publisher: { '@type': 'Organization', name: SITE.legalName },
    },
  });

  if (!article) return <NotFound />;

  const index = articles.indexOf(article);
  const more = [articles[(index + 1) % articles.length], articles[(index + 2) % articles.length]];

  return (
    <>
      <Breadcrumbs items={[{ label: 'Blog', to: '/blog' }, { label: article.title }]} />
      <article>
        <div className="page-width">
          <Image src={article.image} alt={article.title} ratio={2.2} priority sizes="(min-width: 1380px) 1265px, 100vw" className="mt-2" />
        </div>
        <header className="page-width pt-8 text-center md:pt-[46px]">
          <div className="mx-auto max-w-[860px]">
            <h1 className="h1 mb-4 text-ink">{article.title}</h1>
            <p className="text-[13px] uppercase tracking-[1.3px] text-ink/55">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </p>
          </div>
        </header>
        <div className="page-width py-10 md:py-[50px]">
          <div className="rte mx-auto max-w-[760px] text-ink-body">
            {article.body.map((block, i) =>
              block.type === 'h2' ? <h2 key={i}>{block.text}</h2> : <p key={i}>{block.text}</p>,
            )}
          </div>
          <div className="mx-auto mt-10 flex max-w-[760px] flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[16px] text-ink hover:underline">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Back to blog
            </Link>
            <Button to="/contact" variant="navy">
              Talk to our team
            </Button>
          </div>
        </div>
      </article>

      <section className="border-t border-line py-12 md:py-[60px]" aria-labelledby="more-articles">
        <div className="page-width">
          <h2 id="more-articles" className="h2 mb-8 text-ink">
            More from the blog
          </h2>
          <div className="grid gap-12 md:grid-cols-2 md:gap-2">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
