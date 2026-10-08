import { useId, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';

const TONES = {
  maroon: { text: 'text-maroon', border: 'border-line-maroon', icon: 'text-maroon' },
  ink: { text: 'text-ink', border: 'border-line', icon: 'text-ink' },
};

function CheckSquare({ className }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className} fill="none">
      <rect x="1" y="1" width="26" height="26" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 14.5l4 4 8-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FAQItem({ item, tone, isOpen, onToggle }) {
  const id = useId();
  const t = TONES[tone];
  return (
    <div className={`border-t last:border-b ${t.border}`}>
      <h3 className="m-0">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className={`group flex w-full items-center gap-3.5 py-[17px] text-left ${t.text}`}
        >
          <CheckSquare className={`h-6 w-6 shrink-0 md:h-7 md:w-7 ${t.icon}`} />
          <span className="h4 flex-1 text-[18px] leading-snug text-current md:text-h4">{item.q}</span>
          <ChevronDown
            className={`h-[14px] w-[14px] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-[38px] pr-6 text-ink-body md:pl-[42px]">{item.a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Collapsible FAQ list. Items open independently (several can be open at
 * once), like the reference's collapsible-content section.
 */
export default function FAQ({ title = 'Frequently Asked Questions', items, tone = 'maroon', titleSize = 'h1', className = '' }) {
  const [open, setOpen] = useState(() => new Set());

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
    <section className={`section-y ${className}`} aria-label={title}>
      <div className="page-width">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className={`${titleSize} mb-6 text-center md:mb-[34.5px] ${TONES[tone].text}`}>{title}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            {items.map((item, index) => (
              <FAQItem key={item.q} item={item} tone={tone} isOpen={open.has(index)} onToggle={() => toggle(index)} />
            ))}
          </Reveal>
        </div>
      </div>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </section>
  );
}
