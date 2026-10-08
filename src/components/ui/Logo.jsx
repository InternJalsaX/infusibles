import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';
import { cdnUrl } from '../../lib/images';

/** Brand mark (collar logo). Width/height are set so the header never jumps. */
export default function Logo({ className = '', width = 90, onClick }) {
  const height = Math.round((width * 1691) / 2395);
  return (
    <Link to="/" onClick={onClick} className={`inline-flex shrink-0 p-[8.625px] ${className}`} aria-label={`${SITE.name} – ${SITE.tagline}, home`}>
      <img
        src={cdnUrl(SITE.logo, width * 2)}
        srcSet={`${cdnUrl(SITE.logo, width)} 1x, ${cdnUrl(SITE.logo, width * 2)} 2x, ${cdnUrl(SITE.logo, width * 3)} 3x`}
        width={width}
        height={height}
        alt={`${SITE.name} – ${SITE.tagline}`}
        className="block h-auto"
        style={{ width }}
        fetchpriority="high"
      />
    </Link>
  );
}
