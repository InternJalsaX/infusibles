import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { cdnUrl } from '../../lib/images';

const FONTS = {
  display: { title: 'font-display text-[30px] leading-[1.25] md:text-[40px] md:leading-[52px]', text: 'font-display text-[17px] md:text-[18px]' },
  heading: { title: 'font-heading text-[32px] md:text-[42px]', text: 'font-body font-medium text-[16px] leading-[1.7] md:text-[18px]' },
};

/**
 * Full-bleed banner with a background photograph (maroon/navy art), centred
 * white heading, supporting line and optional navy pill button.
 */
export default function CtaBanner({ title, text, image, button, font = 'display', minHeight = 'min-h-[260px] md:min-h-[309px]', overlay = '' }) {
  const f = FONTS[font];
  return (
    <section
      className={`relative flex items-center overflow-hidden bg-maroon bg-cover bg-center ${minHeight}`}
      style={{ backgroundImage: `image-set(url("${cdnUrl(image, 1200)}") 1x, url("${cdnUrl(image, 2400)}") 2x)` }}
    >
      {overlay && <div className={`absolute inset-0 ${overlay}`} aria-hidden="true" />}
      <div className="page-width relative py-12 text-center text-white md:py-[60px]">
        <Reveal>
          <h2 className={`mx-auto mb-3 max-w-[900px] text-white ${f.title}`}>{title}</h2>
          {text && <p className={`mx-auto max-w-[1120px] text-white ${f.text}`}>{text}</p>}
          {button && (
            <div className="mt-6 md:mt-[20px]">
              <Button
                to={button.to}
                variant="navy"
                className={`!min-h-[52px] border border-navy !px-[50px] ${font === 'display' ? 'font-display !text-[18px] !tracking-[0.69px]' : ''}`}
              >
                {button.label}
              </Button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
