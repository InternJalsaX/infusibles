import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from '../ui/Image';
import Button from '../ui/Button';

const INTERVAL = 6000;

/**
 * Full-width slideshow. Desktop overlays the CTA on the banner artwork;
 * mobile stacks the button in a maroon panel below the image (Dawn's
 * "text below on mobile"). Autoplays, pauses on hover/focus and when the
 * tab is hidden, and supports swipe + keyboard.
 */
export default function HeroSlideshow({ slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(null);
  const count = slides.length;

  const go = useCallback((i) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce || count < 2) return undefined;
    const t = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, INTERVAL);
    return () => window.clearInterval(t);
  }, [paused, count]);

  const onTouchStart = (e) => {
    touch.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touch.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
    >
      <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="flex transition-transform duration-700 ease-out-slow" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, i) => (
            <div
              key={slide.image}
              className="relative w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              inert={i !== index ? '' : undefined}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                ratio="6667 / 2050"
                priority={i === 0}
                sizes="100vw"
                widths={[640, 960, 1280, 1600, 1920, 2560]}
              />
              {/* Desktop overlay CTA */}
              <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
                <div className="pointer-events-auto translate-y-[18%]">
                  {slide.buttonStyle === 'outline' ? (
                    <Button to={slide.cta.to} variant="secondary" className="!border-[#111] !text-[#111] hover:!bg-white/40">
                      {slide.cta.label}
                    </Button>
                  ) : (
                    <Button to={slide.cta.to} variant="light">
                      {slide.cta.label}
                    </Button>
                  )}
                </div>
              </div>
              {/* Mobile panel CTA */}
              <div className="flex items-center justify-center bg-maroon py-[46px] md:hidden">
                <Button to={slide.cta.to} variant="light">
                  {slide.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="flex h-[46px] items-center justify-center gap-1">
          <button type="button" onClick={() => go(index - 1)} className="inline-flex h-11 w-11 items-center justify-center text-ink-soft/80 hover:text-ink" aria-label="Previous slide">
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-1">
            {slides.map((s, i) => (
              <button key={s.image} type="button" onClick={() => go(i)} className="inline-flex h-11 w-[33px] items-center justify-center" aria-label={`Load slide ${i + 1} of ${count}`} aria-current={i === index}>
                <span className={`block h-[11.5px] w-[11.5px] rounded-full border border-ink-soft/50 transition-colors ${i === index ? 'bg-ink-soft' : 'bg-transparent'}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} className="inline-flex h-11 w-11 items-center justify-center text-ink-soft/80 hover:text-ink" aria-label="Next slide">
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </section>
  );
}
