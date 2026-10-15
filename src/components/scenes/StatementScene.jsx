import { m, useTransform } from 'framer-motion';
import { sceneLayout, useScene } from './useScene';

function Word({ word, bold, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <m.span style={{ opacity }} className={bold ? 'italic text-navy' : 'text-ink'}>
      {word}{' '}
    </m.span>
  );
}

/**
 * Pinned brand statement. Each word brightens in reading order as you
 * scroll; brand phrases are set in navy italic. The key facts row fades
 * up once the sentence is complete.
 */
export default function StatementScene({ eyebrow, segments, facts }) {
  const { ref, reduce, progress } = useScene(1);
  const layout = sceneLayout(reduce, 2.2);

  const words = segments.flatMap(([text, bold]) =>
    text
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => ({ w, bold: Boolean(bold) })),
  );
  const span = 0.72 / words.length;
  const factsOpacity = useTransform(progress, [0.78, 0.92], [0, 1]);
  const factsY = useTransform(progress, [0.78, 0.92], [30, 0]);

  return (
    <section ref={ref} {...layout.section} aria-label="About Infuse">
      <div className={`${layout.stage} flex flex-col justify-center bg-white texture-weave`}>
        <div className="page-width py-10">
          <p className="eyebrow">{eyebrow}</p>
          <p className="max-w-[1180px] font-heading text-[clamp(26px,3.6vw,54px)] leading-[1.22] tracking-[-0.01em]">
            {words.map(({ w, bold }, i) => (
              <Word key={`${w}-${i}`} word={w} bold={bold} progress={progress} range={[0.05 + i * span, 0.05 + (i + 1) * span]} />
            ))}
          </p>

          <m.dl className="mt-10 grid grid-cols-2 border-t border-navy/15 md:mt-16 lg:grid-cols-4" style={{ opacity: factsOpacity, y: factsY }}>
            {facts.map((fact, i) => (
              <div key={fact.label} className={`flex flex-col py-5 pr-4 md:py-7 ${i % 2 === 1 ? 'border-l border-navy/15 pl-5' : ''} ${i > 0 ? 'lg:border-l lg:pl-8' : ''} ${i >= 2 ? 'border-t border-navy/15 lg:border-t-0' : ''}`}>
                <dd className="font-heading text-[18px] leading-snug text-navy md:text-[22px]">{fact.value}</dd>
                <dt className="mt-1.5 text-[12px] uppercase tracking-[0.12em] text-ink/55">{fact.label}</dt>
              </div>
            ))}
          </m.dl>
        </div>
      </div>
    </section>
  );
}
