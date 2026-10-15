import { Link } from 'react-router-dom';
import { m, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from '../ui/Image';
import { Segments } from '../ui/RichText';
import { sceneLayout, useScene } from './useScene';

// Position, size and drift speed for each floating photograph.
const FLOATS = [
  { box: 'right-[6%] top-[8%] w-[38vw] md:w-[21vw]', from: '35%', to: '-55%', rotate: [-3, 2] },
  { box: 'right-[34%] top-[46%] hidden w-[16vw] md:block', from: '60%', to: '-110%', rotate: [2, -2] },
  { box: 'left-[48%] top-[64%] w-[30vw] md:left-[58%] md:w-[15vw]', from: '90%', to: '-150%', rotate: [0, 3] },
];

function Float({ img, cfg, progress }) {
  const y = useTransform(progress, [0, 1], [cfg.from, cfg.to]);
  const rotate = useTransform(progress, [0, 1], cfg.rotate);
  return (
    <m.div className={`absolute z-10 ${cfg.box}`} style={{ y, rotate }}>
      <div className="shadow-[0_30px_60px_-30px_rgb(0_0_0_/_0.7)]">
        <Image src={img.src} alt={img.alt} ratio={img.ratio} sizes="(min-width: 750px) 22vw, 40vw" widths={[360, 540, 720]} />
      </div>
    </m.div>
  );
}

/**
 * "Our Story" as a kinetic scene on brand navy: two lines of oversized type
 * travel in opposite directions — one solid, one outlined — while three
 * photographs drift upward at different speeds. The story copy sits in a
 * fixed column so it stays readable throughout.
 */
export default function KineticScene({ words, heading, body, images, link }) {
  const { ref, reduce, progress } = useScene(0.45);
  const layout = sceneLayout(reduce, 2.6);
  const x1 = useTransform(progress, [0, 1], ['8%', '-48%']);
  const x2 = useTransform(progress, [0, 1], ['-46%', '4%']);
  const copyOpacity = useTransform(progress, [0.08, 0.25], [0, 1]);

  return (
    <section ref={ref} {...layout.section} aria-label={heading}>
      <div className={`${layout.stage} bg-gradient-to-br from-navy-600 to-navy-900 text-white`}>
        <div className="texture-weave pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

        <div className="pointer-events-none absolute inset-x-0 top-[10%] select-none font-heading leading-[0.86] tracking-[-0.02em]" aria-hidden="true">
          <m.p className="whitespace-nowrap text-[clamp(84px,17vw,280px)] text-white/[0.92]" style={{ x: x1 }}>
            {words[0]}
          </m.p>
          <m.p
            className="whitespace-nowrap text-[clamp(84px,17vw,280px)] italic text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255_/_0.55)]"
            style={{ x: x2 }}
          >
            {words[1]}
          </m.p>
        </div>

        {images.map((img, i) => (
          <Float key={img.src} img={img} cfg={FLOATS[i]} progress={progress} />
        ))}

        <m.div className="absolute bottom-[7%] left-0 z-20 w-full" style={{ opacity: copyOpacity }}>
          <div className="page-width">
            <div className="max-w-[440px] bg-navy-900/70 p-6 backdrop-blur-sm md:p-8">
              <p className="eyebrow eyebrow-light">Who we are</p>
              <h2 className="mb-4 font-heading text-[30px] leading-tight text-white md:text-[40px]">{heading}</h2>
              <p className="text-[15px] leading-[1.75] text-white/80 md:text-[16px]">
                <Segments segments={body} />
              </p>
              <Link to={link.to} className="group mt-6 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-white">
                <span className="link-draw pb-1">{link.label}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
