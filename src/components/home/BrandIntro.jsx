import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { Segments } from '../ui/RichText';
import PinkedEdge from '../sections/PinkedEdge';

/**
 * Brand statement directly under the hero: large display heading set in
 * masked lines, the intro copy, and a row of key facts. Sits on the brand's
 * light neutral with a faint woven texture; a pinking-shear edge joins it
 * to the hero above.
 */
export default function BrandIntro({ intro }) {
  const [first, second] = intro.title.split(' - ');

  return (
    <section className="relative bg-surface-muted texture-weave" aria-labelledby="intro-title">
      <PinkedEdge tone="muted" className="absolute -top-2 left-0" />
      <div className="page-width section-lg">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <div>
            <Reveal variant="fade">
              <p className="eyebrow">{intro.eyebrow}</p>
            </Reveal>
            <h2 id="intro-title" className="display text-ink">
              <span className="line-mask">
                <span style={{ animationDelay: '0.15s' }}>{first}</span>
              </span>
              <span className="line-mask">
                <span className="italic text-navy" style={{ animationDelay: '0.3s' }}>
                  {second}
                </span>
              </span>
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:pt-10">
            <p className="text-[17px] leading-[1.85] text-black/75 md:text-[19px]">
              <Segments segments={intro.body} />
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/products" className="group inline-flex items-center gap-2 text-[15px] font-medium uppercase tracking-[0.14em] text-navy">
                <span className="link-draw pb-1">Explore our range</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
              </Link>
              <Link to="/about" className="text-[15px] font-medium uppercase tracking-[0.14em] text-ink/70 hover:text-ink">
                <span className="link-draw pb-1">Our story</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <dl className="mt-14 grid grid-cols-2 border-t border-navy/15 md:mt-20 lg:grid-cols-4">
          {intro.facts.map((fact, i) => (
            <Reveal
              key={fact.label}
              delay={i * 0.08}
              className={`flex flex-col border-navy/15 py-6 pr-4 md:py-8 ${i % 2 === 1 ? 'pl-5 border-l' : ''} ${
                i > 0 ? 'lg:border-l lg:pl-8' : ''
              } ${i >= 2 ? 'border-t lg:border-t-0' : ''}`}
            >
              <dt className="order-2 mt-2 text-[13px] uppercase tracking-[0.12em] text-ink/55">{fact.label}</dt>
              <dd className="font-heading text-[19px] leading-snug text-navy md:text-[22px]">{fact.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
