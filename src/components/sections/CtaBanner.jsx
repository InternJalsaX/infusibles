import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { cdnSrcSet, cdnUrl } from '../../lib/images';

const FONTS = {
  display: { title: 'font-display text-[32px] leading-[1.2] md:text-[48px] md:leading-[1.15]', text: 'font-body text-[16px] leading-[1.7] md:text-[19px]' },
  heading: { title: 'font-heading text-[32px] md:text-[46px]', text: 'font-body text-[16px] leading-[1.75] md:text-[19px]' },
};

/**
 * Full-bleed banner over the brand's maroon/navy artwork. The photograph
 * sits on an oversized layer that drifts on scroll (parallax via transform
 * only) and the copy rises in. Optional primary + secondary actions.
 */
export default function CtaBanner({
  eyebrow,
  title,
  text,
  image,
  button,
  secondary,
  font = 'display',
  minHeight = 'min-h-[340px] md:min-h-[420px]',
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%']);
  const f = FONTS[font];

  return (
    <section ref={ref} className={`relative isolate flex items-center overflow-hidden bg-maroon ${minHeight}`}>
      <m.div className="absolute inset-x-0 -inset-y-[15%] -z-10 will-change-transform" style={{ y }} aria-hidden="true">
        <img
          src={cdnUrl(image, 1600)}
          srcSet={cdnSrcSet(image, [960, 1600, 2400])}
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </m.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-transparent to-black/25" aria-hidden="true" />

      <div className="page-width relative py-16 text-center text-white md:py-20">
        {eyebrow && (
          <Reveal variant="fade">
            <p className="eyebrow eyebrow-light justify-center">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal>
          <h2 className={`mx-auto mb-4 max-w-[900px] text-balance text-white ${f.title}`}>{title}</h2>
        </Reveal>
        {text && (
          <Reveal delay={0.1}>
            <p className={`mx-auto max-w-[760px] text-pretty text-white/90 ${f.text}`}>{text}</p>
          </Reveal>
        )}
        {(button || secondary) && (
          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {button && (
              <Button to={button.to} variant="navy" className="!px-[42px]">
                {button.label}
                <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Button>
            )}
            {secondary && (
              <a href={secondary.href} target="_blank" rel="noreferrer" className="btn btn-outline-light !px-[34px]">
                {secondary.label}
              </a>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
