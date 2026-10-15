import Reveal from '../ui/Reveal';
import { cdnUrl } from '../../lib/images';

/**
 * "Why Choose Us?": a split editorial layout — heading on the left, the
 * brand's strengths as numbered, hairline-ruled rows on the right, each
 * with its original emblem.
 */
export default function WhyChooseUs({ title = 'Why Choose Us?', items }) {
  return (
    <section className="section-lg relative overflow-hidden bg-gradient-to-br from-navy-600 to-navy-900 text-white" aria-labelledby="why-title">
      <div className="texture-weave pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="page-width relative grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
        <div>
          <Reveal variant="fade">
            <p className="eyebrow eyebrow-light">Our promise</p>
          </Reveal>
          <Reveal>
            <h2 id="why-title" className="display text-white">
              {title}
            </h2>
          </Reveal>
        </div>
        <ol className="border-t border-white/15">
          {items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 0.1} className="group flex items-center gap-5 border-b border-white/15 py-7 md:gap-8 md:py-9">
              <span className="w-10 shrink-0 font-heading text-[15px] tabular-nums text-white/50 md:w-14 md:text-[18px]">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-brand group-hover:scale-105 md:h-[76px] md:w-[76px]">
                <img src={cdnUrl(item.icon, 200)} alt="" width="56" height="56" loading="lazy" className="h-[44px] w-[44px] object-contain md:h-[52px] md:w-[52px]" />
              </span>
              <h3 className="font-heading text-[20px] leading-snug text-white md:text-[26px]">{item.label}</h3>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
