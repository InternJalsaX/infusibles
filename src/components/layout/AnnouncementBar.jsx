import { SITE } from '../../data/site';

const REPEAT = 6;

/**
 * Continuous running-line announcement (maroon bar, white Lora text).
 * Two identical tracks translate by -50% so the loop is seamless; the
 * animation pauses on hover and respects reduced-motion preferences.
 */
export default function AnnouncementBar({ message = SITE.announcement }) {
  const track = Array.from({ length: REPEAT }, (_, i) => (
    <span key={i} className="shrink-0 pr-[68px]">
      {message}
    </span>
  ));

  return (
    <div className="relative z-50 overflow-hidden bg-maroon text-white" role="region" aria-label="Announcement">
      <p className="sr-only">{message}</p>
      <div
        className="pause-on-hover flex w-max animate-marquee items-center whitespace-nowrap py-[8px] font-heading text-[18px] font-bold leading-[24px] tracking-[0.69px] motion-reduce:animate-none md:text-[19px]"
        style={{ '--marquee-duration': '60s' }}
        aria-hidden="true"
      >
        <div className="flex">{track}</div>
        <div className="flex">{track}</div>
      </div>
    </div>
  );
}
