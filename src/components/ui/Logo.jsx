import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';
import { cdnUrl } from '../../lib/images';

// Intrinsic ratio of the original logo artwork (2395 × 1691).
const RATIO = 1691 / 2395;

/**
 * Brand mark — the original collar logo artwork, never redrawn or cropped.
 * The source is a JPG on white, so `mix-blend-multiply` drops the white box
 * on light backgrounds. Size comes from `imgClassName` width utilities and
 * animates smoothly between header states.
 */
export default function Logo({ className = '', imgClassName = 'w-[90px]', onClick, eager = true }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group inline-flex shrink-0 ${className}`}
      aria-label={`${SITE.name} – ${SITE.tagline}, home`}
    >
      <img
        src={cdnUrl(SITE.logo, 480)}
        srcSet={`${cdnUrl(SITE.logo, 240)} 240w, ${cdnUrl(SITE.logo, 360)} 360w, ${cdnUrl(SITE.logo, 480)} 480w, ${cdnUrl(SITE.logo, 720)} 720w`}
        sizes="180px"
        width={240}
        height={Math.round(240 * RATIO)}
        alt={`${SITE.name} – ${SITE.tagline}`}
        className={`block h-auto mix-blend-multiply transition-[width,transform] duration-500 ease-brand group-hover:scale-[1.02] ${imgClassName}`}
        loading={eager ? 'eager' : 'lazy'}
        fetchpriority={eager ? 'high' : undefined}
      />
    </Link>
  );
}
