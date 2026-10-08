import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import { cdnUrl } from '../../lib/images';

/**
 * "Application Areas": garment-type icons in a 3-column grid (2 on mobile),
 * each linking to the matching collection with a gentle lift on hover.
 */
export default function ApplicationAreas({ title = 'Application Areas', items }) {
  return (
    <section className="bg-white pb-4 pt-[45px] md:pb-[16px] md:pt-[60px]" aria-labelledby="applications-title">
      <div className="page-width">
        <Reveal>
          <h2 id="applications-title" className="h2 mb-8 text-center text-ink md:mb-[40px]">
            {title}
          </h2>
        </Reveal>
        <ul className="grid grid-cols-2 gap-y-1 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={(i % 3) * 0.06}>
              <Link
                to={item.to}
                className="group mx-auto flex max-w-[260px] flex-col items-center rounded-lg px-3 py-4 text-center transition-transform duration-300 ease-out-slow hover:-translate-y-1 md:py-[14px]"
              >
                <span className="relative mb-[13px] flex h-[62px] items-center justify-center md:h-[70px]">
                  <span className="absolute inset-[-10px] scale-75 rounded-full bg-maroon/[0.06] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" aria-hidden="true" />
                  <img src={cdnUrl(item.icon, 200)} alt="" width="70" height="70" loading="lazy" className="relative h-full w-auto" />
                </span>
                <span className="text-[16px] font-bold leading-[1.3] tracking-[0.69px] text-navy underline-offset-4 group-hover:underline md:text-[18px]">
                  {item.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
