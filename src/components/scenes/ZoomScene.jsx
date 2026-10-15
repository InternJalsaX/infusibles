import { Link } from 'react-router-dom';
import { m, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from '../ui/Image';
import RichText from '../ui/RichText';
import { sceneLayout, useIsDesktop, useScene } from './useScene';

/**
 * Zoom reveal. A small framed photograph sits centre-stage between the two
 * halves of the heading; scrolling opens it out to full-screen while the
 * heading halves slide apart and fade, then the copy rises over the image.
 */
export default function ZoomScene({ eyebrow, heading, image, body, link }) {
  const { ref, reduce, progress } = useScene(1);
  const desktop = useIsDesktop();
  const layout = sceneLayout(reduce, 2.4);
  const [left, right] = heading;

  const clip = useTransform(
    progress,
    [0.05, 0.6],
    desktop ? ['inset(30% 38% 30% 38%)', 'inset(0% 0% 0% 0%)'] : ['inset(32% 22% 32% 22%)', 'inset(0% 0% 0% 0%)'],
  );
  const scale = useTransform(progress, [0.05, 0.65], [1.35, 1]);
  const xLeft = useTransform(progress, [0.05, 0.5], ['0%', '-35%']);
  const xRight = useTransform(progress, [0.05, 0.5], ['0%', '35%']);
  const headOpacity = useTransform(progress, [0.3, 0.5], [1, 0]);
  const shade = useTransform(progress, [0.5, 0.75], [0, 0.55]);
  const copyOpacity = useTransform(progress, [0.62, 0.82], [0, 1]);
  const copyY = useTransform(progress, [0.62, 0.82], [40, 0]);

  return (
    <section ref={ref} {...layout.section} aria-label={heading.join(' ')}>
      <div className={`${layout.stage} bg-surface-tint`}>
        <m.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: clip }}>
          <m.div className="absolute inset-0 will-change-transform" style={{ scale }}>
            <Image src={image.src} alt={image.alt} fill sizes="100vw" widths={[640, 960, 1280, 1600]} />
          </m.div>
          <m.div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" style={{ opacity: shade }} aria-hidden="true" />
        </m.div>

        {/* Split heading */}
        <m.div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-[34vh] font-heading text-[clamp(44px,8vw,128px)] leading-none tracking-[-0.02em] text-navy lg:flex-row lg:gap-[26vw]"
          style={{ opacity: headOpacity }}
          aria-hidden="true"
        >
          <m.span style={{ x: xLeft }}>{left}</m.span>
          <m.span className="italic" style={{ x: xRight }}>
            {right}
          </m.span>
        </m.div>

        {/* Copy over the opened image */}
        <m.div className="absolute inset-x-0 bottom-[8%] z-20" style={{ opacity: copyOpacity, y: copyY }}>
          <div className="page-width">
            <div className="max-w-[640px] text-white">
              <p className="eyebrow eyebrow-light">{eyebrow}</p>
              <h2 className="mb-5 font-heading text-[clamp(32px,4.4vw,60px)] leading-[1.05] text-white">{heading.join(' ')}</h2>
              <RichText paragraphs={body} className="text-[15px] leading-[1.75] text-white/85 md:text-[17px] [&_strong]:text-white" />
              <Link to={link.to} className="btn btn-light mt-7 !text-navy">
                {link.label}
                <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
