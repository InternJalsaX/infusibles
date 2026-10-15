import { useCallback, useEffect, useRef, useState } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from '../ui/Image';
import Button from '../ui/Button';

const INTERVAL = 6500;

/**
 * Hero slideshow. Slides crossfade while the active photograph eases into a
 * slow Ken Burns zoom; the whole banner drifts gently on scroll (parallax).
 * CTAs rise in with each slide. Progress bars double as slide controls.
 * Autoplay pauses on hover/focus, in hidden tabs and for reduced motion.
 */
export default function HeroSlideshow({ slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(null);
  const section = useRef(null);
  const reduce = useReducedMotion();
  const count = slides.length;

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%']);

  const go = useCallback((i) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    if (paused || reduce || count < 2) return undefined;
    const t = window.setTimeout(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, INTERVAL);
    return () => window.clearTimeout(t);
  }, [paused, reduce, count, index]);

  const onTouchStart = (e) => {
    touch.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touch.current = null;
  };

  const progress = (dark) =>
    count > 1 && (
      <div className="flex items-center gap-4" role="tablist" aria-label="Slides">
        <span className={`font-heading text-[15px] tabular-nums ${dark ? 'text-navy' : 'text-white'}`}>
          {String(index + 1).padStart(2, '0')}
          <span className="mx-1.5 opacity-50">/</span>
          {String(count).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1} of ${count}`}
              onClick={() => go(i)}
              className="group py-3"
            >
              <span className={`relative block h-[2px] w-12 overflow-hidden md:w-16 ${dark ? 'bg-navy/20' : 'bg-white/35'}`}>
                {i === index && (
                  <span
                    key={`${index}-${paused}`}
                    className={`absolute inset-0 origin-left ${dark ? 'bg-navy' : 'bg-white'} ${paused || reduce ? 'scale-x-100' : 'animate-progress'}`}
                    style={{ '--slide-duration': `${INTERVAL}ms` }}
                  />
                )}
                {i < index && <span className={`absolute inset-0 ${dark ? 'bg-navy/50' : 'bg-white/60'}`} />}
              </span>
            </button>
          ))}
        </div>
      </div>
    );

  return (
    <section
      ref={section}
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
    >
      <div className="relative aspect-banner overflow-hidden bg-navy" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <m.div className="absolute inset-0 will-change-transform" style={{ y }}>
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <div
                key={slide.image}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                className={`absolute inset-0 transition-opacity duration-[1200ms] ease-brand ${active ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
              >
                <div className={`absolute inset-0 ${active && !reduce ? 'animate-kenburns' : ''}`} key={active ? `on-${index}` : 'off'}>
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    widths={[640, 960, 1280, 1600, 1920, 2560]}
                  />
                </div>
              </div>
            );
          })}
        </m.div>

        {/* Desktop CTAs — re-animate with every slide */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center md:flex">
          <div key={index} className="pointer-events-auto flex translate-y-[46%] animate-fade-up items-center gap-3" style={{ animationDelay: '0.35s' }}>
            {slides[index].buttonStyle === 'outline' ? (
              <Button to={slides[index].cta.to} variant="navy">
                {slides[index].cta.label}
                <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Button>
            ) : (
              <Button to={slides[index].cta.to} variant="light">
                {slides[index].cta.label}
                <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        {/* Desktop controls */}
        <div className="absolute inset-x-0 bottom-0 z-20 hidden md:block">
          <div className="page-width flex items-center justify-between pb-5">
            {progress(slides[index].buttonStyle === 'outline')}
            <div className="flex gap-2">
              {[
                ['Previous slide', ChevronLeft, -1],
                ['Next slide', ChevronRight, 1],
              ].map(([label, Icon, dir]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => go(index + dir)}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-navy/55 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-navy"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: CTA panel below the artwork */}
      <div className="flex flex-col items-center gap-5 bg-maroon px-gutter pb-6 pt-8 md:hidden">
        <Button to={slides[index].cta.to} variant="light">
          {slides[index].cta.label}
          <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </Button>
        {progress(false)}
      </div>
    </section>
  );
}
