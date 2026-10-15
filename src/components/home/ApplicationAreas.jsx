import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { cdnUrl } from '../../lib/images';

/**
 * "Application Areas": a hairline-ruled 3×2 grid (2 columns on mobile) of
 * garment types using the brand's own line icons. Each tile names where the
 * interlining goes in that garment and links to the matching collection;
 * hover tints the tile, lifts the icon and draws the arrow.
 */
export default function ApplicationAreas({ title = 'Application Areas', items }) {
  return (
    <section className="section-lg bg-white" aria-labelledby="applications-title">
      <div className="page-width">
        <div className="mx-auto mb-12 max-w-[640px] text-center md:mb-16">
          <Reveal variant="fade">
            <p className="eyebrow justify-center">Where our interlinings go</p>
          </Reveal>
          <Reveal>
            <h2 id="applications-title" className="h2 text-ink md:text-[40px]">
              {title}
            </h2>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 border-l border-t border-navy/10 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={(i % 3) * 0.08} className="border-b border-r border-navy/10">
              <Link
                to={item.to}
                className="group relative flex h-full flex-col items-center px-4 py-9 text-center transition-colors duration-500 ease-brand hover:bg-surface-tint md:py-12"
              >
                <ArrowUpRight
                  className="absolute right-4 top-4 h-4 w-4 -translate-x-1 translate-y-1 text-maroon opacity-0 transition-all duration-500 ease-brand group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="relative mb-5 flex h-[86px] w-[86px] items-center justify-center rounded-full bg-maroon/[0.05] transition-[transform,background-color] duration-500 ease-brand group-hover:-translate-y-1 group-hover:bg-maroon/[0.09] md:h-[100px] md:w-[100px]">
                  <img src={cdnUrl(item.icon, 200)} alt="" width="60" height="60" loading="lazy" className="h-[52px] w-auto md:h-[60px]" />
                </span>
                <span className="font-heading text-[18px] text-navy md:text-[21px]">{item.label}</span>
                {item.note && <span className="mt-1.5 text-[13px] tracking-[0.04em] text-ink/55 md:text-[14px]">{item.note}</span>}
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
