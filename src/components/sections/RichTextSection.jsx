import Reveal from '../ui/Reveal';
import { Segments } from '../ui/RichText';

/** Centered heading + paragraph block (Dawn rich text), optionally on a tinted band. */
export default function RichTextSection({ title, segments, children, tone = 'muted', headingAs: Heading = 'h2', className = '' }) {
  const bg = tone === 'muted' ? 'bg-surface-muted' : 'bg-white';
  return (
    <section className={`${bg} pb-[27px] pt-[30px] md:pb-[36px] md:pt-[40px] ${className}`}>
      <div className="page-width text-center">
        {title && (
          <Reveal>
            <Heading className="h2 mx-auto mb-5 max-w-[900px] text-black md:mb-[32px]">{title}</Heading>
          </Reveal>
        )}
        {(segments || children) && (
          <Reveal delay={0.05}>
            <div className="mx-auto max-w-[900px] text-black/75">
              {segments ? (
                <p>
                  <Segments segments={segments} />
                </p>
              ) : (
                children
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
