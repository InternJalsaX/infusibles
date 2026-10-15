import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';

const NAVY = '#0C3B85';
const MAROON = '#8B1A1A';

/**
 * Vector brand mark drawn from the original collar logo: same outline,
 * proportions and colours. The "Edge in Fashion" tagline, which is only a
 * few pixels tall in the source artwork at header sizes, is set beneath the
 * collar at a legible size. Strokes are slightly heavier so the mark stays
 * crisp when small. Scales via `imgClassName` width utilities.
 */
export function LogoMark({ className = '', title = `${SITE.name} – ${SITE.tagline}` }) {
  return (
    <svg viewBox="0 0 900 790" role="img" aria-label={title} className={`block h-auto ${className}`}>
      <title>{title}</title>
      <g fill="none" stroke={NAVY} strokeWidth="10" strokeLinejoin="round" strokeLinecap="round">
        {/* Outer collar */}
        <path d="M108 120 C 190 38, 320 8, 450 8 C 580 8, 710 38, 792 120 C 800 128, 806 138, 810 150 L 878 262 C 892 286, 893 312, 878 334 L 622 600 C 612 612, 596 616, 590 602 L 520 412 L 410 412 L 330 602 C 324 616, 308 612, 298 600 L 22 334 C 7 312, 8 286, 22 262 L 90 150 C 94 138, 100 128, 108 120 Z" />
        {/* Collar stand */}
        <path d="M118 160 C 205 78, 330 46, 450 44 C 570 46, 695 78, 782 160 L 502 376 L 398 376 Z" />
      </g>

      <text x="450" y="206" textAnchor="middle" fontFamily="Roboto, Arial, sans-serif" fontWeight="700" fontSize="126" letterSpacing="1">
        <tspan fill={MAROON}>IN</tspan>
        <tspan fill={NAVY}>FUSE</tspan>
      </text>

      <text x="450" y="752" textAnchor="middle" fontFamily="'Kaushan Script', 'Brush Script MT', cursive" fontSize="118">
        <tspan fill={NAVY}>Edge </tspan>
        <tspan fill={MAROON}>in</tspan>
        <tspan fill={NAVY}> Fashion</tspan>
      </text>
    </svg>
  );
}

/** Brand mark linking home. Width comes from `imgClassName` and animates between header states. */
export default function Logo({ className = '', imgClassName = 'w-[90px]', onClick }) {
  return (
    <Link to="/" onClick={onClick} className={`group inline-flex shrink-0 ${className}`} aria-label={`${SITE.name}, home`}>
      <LogoMark className={`transition-[width,transform] duration-500 ease-brand group-hover:scale-[1.02] ${imgClassName}`} />
    </Link>
  );
}
