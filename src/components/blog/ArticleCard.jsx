import { Link } from 'react-router-dom';
import Image from '../ui/Image';
import { formatDate } from '../../lib/format';

/**
 * Journal card. `featured` cards span the full width with centred text,
 * standard cards sit in a 2-column row (Dawn "collage" blog layout).
 */
export default function ArticleCard({ article, featured = false, showImage = true }) {
  const url = `/blog/${article.slug}`;
  return (
    <article className={`group ${featured ? 'text-center' : ''}`}>
      {showImage && article.image && (
        <Link to={url} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
          <Image
            src={article.image}
            alt=""
            ratio={featured ? 2 : 16 / 9}
            sizes={featured ? '(min-width: 990px) 1265px, 100vw' : '(min-width: 750px) 630px, 100vw'}
            imgClassName="transition-transform duration-700 ease-out-slow group-hover:scale-[1.03]"
          />
        </Link>
      )}
      <div className={featured ? 'mx-auto max-w-[940px] px-2 pt-6 md:pt-[30px]' : 'px-0 pt-5 md:px-[35px] md:pt-[34px]'}>
        <h2 className={`h2 mb-3 text-ink ${featured ? '' : 'md:text-[34px] md:leading-[1.25]'}`}>
          <Link to={url} className="underline-offset-[0.3rem] hover:underline">
            {article.title}
          </Link>
        </h2>
        <p className="mb-2 text-[13px] uppercase tracking-[1.3px] text-ink/55">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
        <p className="text-ink-body">{article.excerpt}</p>
      </div>
    </article>
  );
}
