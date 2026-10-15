import { useState } from 'react';
import { Link } from 'react-router-dom';
import { m, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from '../ui/Image';
import { Segments } from '../ui/RichText';
import { sceneLayout, useScene } from './useScene';

/**
 * The range, one family at a time. While pinned, scrolling advances through
 * the product families: the active name lights up in the list, its photo
 * wipes in over the previous one, and its description and link change.
 */
export default function CategoryScene({ eyebrow, title, items }) {
  const { ref, reduce, progress } = useScene(0);
  const layout = sceneLayout(reduce, Math.max(3, items.length * 0.75));
  const [active, setActive] = useState(0);
  const bar = useTransform(progress, [0, 1], [0, 1]);

  useMotionValueEvent(progress, 'change', (v) => {
    const i = Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length * 0.999)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const current = items[active];

  return (
    <section ref={ref} {...layout.section} aria-label={title}>
      <div className={`${layout.stage} bg-white`}>
        <div className="page-width grid h-full grid-rows-[auto_1fr] gap-6 py-6 md:py-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:grid-rows-1 lg:gap-16">
          {/* List + copy */}
          <div className="flex min-h-0 flex-col justify-center">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="sr-only">{title}</h2>

            <ol className="hidden lg:block">
              {items.map((item, i) => (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className={`group flex items-baseline gap-4 whitespace-nowrap py-[3px] font-heading text-[clamp(24px,2.5vw,40px)] leading-[1.12] transition-colors duration-500 ease-brand ${
                      i === active ? 'text-navy' : 'text-ink/15 hover:text-ink/40'
                    }`}
                    aria-current={i === active ? 'step' : undefined}
                  >
                    <span className={`w-8 shrink-0 font-body text-[12px] tabular-nums tracking-[0.1em] transition-colors duration-500 ${i === active ? 'text-maroon' : 'text-transparent'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={i === active ? 'italic' : ''}>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ol>

            {/* Mobile: counter + active title */}
            <div className="lg:hidden">
              <p className="mb-1 font-body text-[12px] tabular-nums tracking-[0.14em] text-maroon">
                {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </p>
              <p key={current.id} className="animate-fade-up font-heading text-[32px] italic leading-tight text-navy">
                {current.title}
              </p>
            </div>

            <div key={current.id} className="mt-5 max-w-[520px] animate-fade-up lg:mt-7 lg:pl-12">
              <p className="line-clamp-4 text-[15px] leading-[1.7] text-ink-body">
                <Segments segments={current.text[0]} />
              </p>
              {current.to && (
                <Link to={current.to} className="group mt-4 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-navy">
                  <span className="link-draw pb-1">Shop {current.title}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>

          {/* Photo stack */}
          <div className="relative min-h-0 lg:py-4">
            <div className="relative h-full overflow-hidden bg-surface-tint" data-cursor="View">
              {items.map((item, i) => (
                <Link
                  key={item.id}
                  to={item.to || '/products'}
                  tabIndex={-1}
                  aria-hidden={i !== active}
                  className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-brand"
                  style={{ clipPath: i <= active ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)', zIndex: i }}
                >
                  <div className={`absolute inset-0 transition-transform duration-[1400ms] ease-brand ${i === active ? 'scale-100' : 'scale-110'}`}>
                    <Image src={item.image} alt={item.alt} fill sizes="(min-width: 990px) 42vw, 92vw" widths={[480, 720, 960, 1280]} />
                  </div>
                </Link>
              ))}
            </div>
            {/* Progress rail */}
            <div className="absolute -left-6 bottom-4 top-4 hidden w-px bg-navy/10 lg:block" aria-hidden="true">
              <m.div className="h-full w-full origin-top bg-maroon" style={{ scaleY: bar }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
