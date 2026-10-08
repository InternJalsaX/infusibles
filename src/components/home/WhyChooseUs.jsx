import Reveal from '../ui/Reveal';
import { cdnUrl } from '../../lib/images';

/** "Why Choose Us?": centred heading with two icon + label value points. */
export default function WhyChooseUs({ title = 'Why Choose Us?', items }) {
  return (
    <section className="bg-white pb-6 pt-[30px] md:pb-[32px] md:pt-[40px]" aria-labelledby="why-title">
      <div className="page-width">
        <Reveal>
          <h2 id="why-title" className="h2 mb-8 text-center text-ink md:mb-[36px]">
            {title}
          </h2>
        </Reveal>
        <ul className="grid gap-8 md:grid-cols-2 md:gap-6">
          {items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 0.08} className="flex flex-col items-center text-center">
              <img src={cdnUrl(item.icon, 200)} alt="" width="70" height="70" loading="lazy" className="mb-[13px] h-[70px] w-[70px] object-contain" />
              <h3 className="font-body text-[16px] font-bold leading-[1.3] tracking-[0.69px] text-[#242833] md:text-[18px]">{item.label}</h3>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
