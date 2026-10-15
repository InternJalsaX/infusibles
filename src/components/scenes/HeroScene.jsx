import { Link } from 'react-router-dom';
import { m, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from '../ui/Image';
import { sceneLayout, useIsDesktop, useScene } from './useScene';

/**
 * Opening scene. A full-bleed collar photograph is pinned; as you scroll it
 * eases back from a slight zoom and pulls in to a framed panel while the
 * title lifts away. Market and range notes, then the calls to action, settle
 * in around the frame.
 */
export default function HeroScene({ image, title, kicker, notes, actions }) {
  const { ref, reduce, progress } = useScene(1);
  const desktop = useIsDesktop();
  const layout = sceneLayout(reduce, 2.4);

  const clip = useTransform(
    progress,
    [0, 0.65],
    desktop ? ['inset(0% 0% 0% 0%)', 'inset(9% 26% 15% 26%)'] : ['inset(0% 0% 0% 0%)', 'inset(13% 6% 30% 6%)'],
  );
  const scale = useTransform(progress, [0, 0.7], [1.18, 1]);
  const shade = useTransform(progress, [0, 0.5], [0.5, 0.05]);
  const titleY = useTransform(progress, [0, 0.4], ['0%', '-60%']);
  const titleOpacity = useTransform(progress, [0.05, 0.35], [1, 0]);
  const notesOpacity = useTransform(progress, [0.45, 0.7], [0, 1]);
  const notesY = useTransform(progress, [0.45, 0.7], [24, 0]);
  const actionsOpacity = useTransform(progress, [0.6, 0.85], [0, 1]);
  const actionsY = useTransform(progress, [0.6, 0.85], [24, 0]);

  return (
    <section ref={ref} {...layout.section} aria-label="Introduction">
      <div className={`${layout.stage} bg-surface-tint`}>
        {/* Photograph */}
        <m.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: clip }}>
          <m.div className="absolute inset-0 will-change-transform" style={{ scale }}>
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" widths={[640, 960, 1280, 1600]} />
          </m.div>
          <m.div className="absolute inset-0 bg-navy-900" style={{ opacity: shade }} aria-hidden="true" />
        </m.div>

        {/* Title */}
        <m.div className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 text-white" style={{ y: titleY, opacity: titleOpacity }}>
          <div className="page-width">
            <p className="eyebrow eyebrow-light mb-6">{kicker}</p>
            <h1 className="font-heading text-[clamp(56px,11vw,176px)] font-normal leading-[0.92] tracking-[-0.02em] text-white">
              {title.map((line, i) => (
                <span key={line} className="line-mask">
                  <span style={{ animationDelay: `${0.15 + i * 0.15}s` }} className={i === 1 ? 'italic' : ''}>
                    {line}
                    {i < title.length - 1 && <span className="sr-only"> </span>}
                  </span>
                </span>
              ))}
            </h1>
          </div>
        </m.div>

        {/* Notes beside the framed photo */}
        <m.div className="pointer-events-none absolute inset-0 z-10" style={{ opacity: notesOpacity, y: notesY }}>
          <div className="page-width relative h-full">
            {notes.map((note, i) => (
              <div
                key={note.label}
                className={`absolute max-w-[220px] ${
                  i === 0
                    ? 'left-gutter-lg top-[34%] hidden lg:block'
                    : 'left-[17.25px] top-[3%] max-w-none md:left-gutter-lg lg:bottom-[34%] lg:left-auto lg:right-gutter-lg lg:top-auto lg:max-w-[220px] lg:text-right'
                }`}
              >
                <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-maroon">{note.label}</p>
                <p className="font-heading text-[17px] leading-snug text-navy lg:text-[22px]">{note.value}</p>
              </div>
            ))}
          </div>
        </m.div>

        {/* Calls to action */}
        <m.div className="absolute inset-x-0 bottom-[6%] z-20 flex flex-wrap items-center justify-center gap-3 px-gutter" style={{ opacity: actionsOpacity, y: actionsY }}>
          {actions.map((a, i) => (
            <Link key={a.to} to={a.to} className={`btn ${i === 0 ? 'btn-navy' : 'btn-secondary'}`}>
              {a.label}
              {i === 0 && <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
            </Link>
          ))}
        </m.div>
      </div>
    </section>
  );
}
