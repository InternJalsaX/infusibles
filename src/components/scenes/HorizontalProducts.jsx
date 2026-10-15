import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import QuickAddModal from '../product/QuickAddModal';

/**
 * Best sellers as a horizontal gallery. The section is pinned while the
 * track slides sideways with vertical scrolling, so the page height equals
 * the track's overflow. With reduced motion it becomes a normal swipeable
 * row instead.
 */
export default function HorizontalProducts({ eyebrow, title, intro, products, viewAllTo }) {
  const section = useRef(null);
  const track = useRef(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [quick, setQuick] = useState(null);
  const closeQuick = useCallback(() => setQuick(null), []);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el || reduce) return undefined;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const panels = (
    <>
      <div className="flex w-[78vw] shrink-0 flex-col justify-center pr-6 sm:w-[46vw] md:w-[34vw] lg:w-[30vw] lg:pr-16">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display mb-5 text-ink">{title}</h2>
        <p className="mb-7 max-w-[360px] text-ink-body">{intro}</p>
        <Link to={viewAllTo} className="group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-navy">
          <span className="link-draw pb-1">View all products</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
        </Link>
        {!reduce && (
          <p className="mt-10 hidden items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/45 md:flex" aria-hidden="true">
            Keep scrolling <span className="block h-px w-12 bg-ink/30" />
          </p>
        )}
      </div>

      {products.map((p) => (
        <div key={p.handle} className="w-[68vw] shrink-0 sm:w-[40vw] md:w-[28vw] lg:w-[21vw] lg:max-w-[340px]">
          <ProductCard product={p} onQuickAdd={setQuick} sizes="(min-width: 990px) 21vw, (min-width: 750px) 28vw, 68vw" />
        </div>
      ))}

      <Link
        to={viewAllTo}
        className="group flex w-[60vw] shrink-0 flex-col items-center justify-center gap-5 sm:w-[34vw] md:w-[24vw] lg:w-[18vw]"
        data-cursor="All"
      >
        <span className="flex h-[150px] w-[150px] items-center justify-center rounded-full border border-navy/25 text-navy transition-all duration-500 ease-brand group-hover:scale-105 group-hover:border-navy group-hover:bg-navy group-hover:text-white md:h-[180px] md:w-[180px]">
          <ArrowRight className="h-7 w-7" strokeWidth={1.25} />
        </span>
        <span className="font-heading text-[22px] text-navy">View all products</span>
      </Link>
    </>
  );

  if (reduce) {
    return (
      <section className="section-lg bg-surface-tint" aria-label={title}>
        <div className="no-scrollbar flex gap-6 overflow-x-auto px-gutter md:px-gutter-lg">{panels}</div>
        <QuickAddModal product={quick} onClose={closeQuick} />
      </section>
    );
  }

  return (
    <section
      ref={section}
      className="relative bg-surface-tint"
      style={{ height: `calc(${distance}px + 100svh - var(--chrome, 120px) + var(--chrome, 120px))` }}
      aria-label={title}
    >
      <div className="sticky top-[var(--chrome,120px)] flex h-[calc(100svh-var(--chrome,120px))] flex-col justify-center overflow-hidden">
        <m.div ref={track} className="flex w-max items-center gap-5 px-gutter will-change-transform md:gap-8 md:px-gutter-lg" style={{ x }}>
          {panels}
        </m.div>
        <div className="page-width absolute inset-x-0 bottom-6" aria-hidden="true">
          <div className="h-px w-full bg-navy/10">
            <m.div className="h-full origin-left bg-maroon" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
      <QuickAddModal product={quick} onClose={closeQuick} />
    </section>
  );
}
