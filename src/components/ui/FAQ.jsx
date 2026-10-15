import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const TONES = {
  maroon: { text: 'text-maroon', accent: 'bg-maroon', border: 'border-maroon/15' },
  ink: { text: 'text-ink', accent: 'bg-navy', border: 'border-ink/10' },
};

function PlusMinus({ open, tone }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
        open ? `${TONES[tone].accent} border-transparent text-white` : `${TONES[tone].border} ${TONES[tone].text}`
      }`}
    >
      <span className="absolute h-px w-3.5 bg-current" />
      <span className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ease-brand ${open ? 'scale-y-0' : 'scale-y-100'}`} />
    </span>
  );
}

function FAQItem({ item, index, tone, isOpen, onToggle }) {
  const id = useId();
  const t = TONES[tone];
  return (
    <div className={`border-b ${t.border}`}>
      <h3 className="m-0">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className={`group flex w-full items-start gap-4 py-6 text-left md:gap-6 ${t.text}`}
        >
          <span className="mt-1 w-7 shrink-0 font-body text-[13px] tabular-nums tracking-[0.1em] opacity-60">{String(index + 1).padStart(2, '0')}</span>
          <span className="flex-1 font-heading text-[18px] leading-snug transition-transform duration-300 ease-brand group-hover:translate-x-1 md:text-[21px]">
            {item.q}
          </span>
          <PlusMinus open={isOpen} tone={tone} />
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-brand ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden" inert={isOpen ? undefined : ''}>
          <p className="max-w-[640px] pb-7 pl-11 pr-12 leading-[1.8] text-ink-body md:pl-[52px]">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * FAQ: heading + help copy on the left (sticky on desktop), numbered
 * accordion on the right. Items open independently; height animates with a
 * CSS grid-rows transition so it stays smooth and never gets stuck.
 */
export default function FAQ({ title = 'Frequently Asked Questions', items, tone = 'maroon', className = '' }) {
  const [open, setOpen] = useState(() => new Set());
  const t = TONES[tone];

  const toggle = (index) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };

  return (
    <section className={`section-lg ${className}`} aria-label={title}>
      <div className="page-width grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--announcement-height)+150px)] lg:self-start">
          <Reveal variant="fade">
            <p className="eyebrow">Good to know</p>
          </Reveal>
          <Reveal>
            <h2 className={`display mb-5 ${t.text}`}>{title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-6 max-w-[360px] text-ink-body">Can’t find what you’re looking for? Our team is happy to help with samples, specifications and bulk orders.</p>
            <Link to="/contact" className={`group inline-flex items-center gap-2 text-[14px] font-medium uppercase tracking-[0.14em] ${t.text}`}>
              <span className="link-draw pb-1">Ask a question</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.05} className={`border-t ${t.border}`}>
          {items.map((item, index) => (
            <FAQItem key={item.q} item={item} index={index} tone={tone} isOpen={open.has(index)} onToggle={() => toggle(index)} />
          ))}
        </Reveal>
      </div>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </section>
  );
}
