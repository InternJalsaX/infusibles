import Image from '../ui/Image';
import Reveal from '../ui/Reveal';

/**
 * Editorial image + text block. The image keeps at least its natural ratio
 * but stretches to the text column's height (Dawn "adapt"); it reveals with
 * a curtain mask, and a hairline frame offset behind it adds depth. Text
 * columns rise in slightly later. `wide` gives the image half the width.
 */
export default function ImageWithText({
  image,
  ratio,
  alt,
  imageSide = 'left',
  wide = false,
  framed = true,
  eyebrow,
  heading,
  headingAs: HeadingTag = 'h2',
  id,
  children,
  className = '',
  contentClassName = '',
}) {
  const imageCols = wide ? 'md:w-1/2' : 'md:w-[38%]';
  const textCols = wide ? 'md:w-1/2' : 'md:w-[62%]';
  const sizes = wide ? '(min-width: 750px) 50vw, 100vw' : '(min-width: 750px) 38vw, 100vw';
  const right = imageSide === 'right';

  return (
    <section id={id} className={`scroll-mt-40 py-12 md:py-20 lg:py-24 ${className}`}>
      <div className="page-width">
        <div className={`flex flex-col md:items-stretch ${right ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
          <div className={`relative w-full ${imageCols}`}>
            {framed && (
              <span
                aria-hidden="true"
                className={`absolute inset-0 hidden translate-y-4 border border-navy/20 md:block ${right ? '-translate-x-4' : 'translate-x-4'}`}
              />
            )}
            <Reveal variant="mask" className="relative h-full overflow-hidden bg-surface-subtle">
              {/* Spacer reserves the natural ratio; the image fills the stretched column. */}
              <div aria-hidden="true" style={{ paddingBottom: `${100 / ratio}%` }} />
              <Image src={image} alt={alt} fill sizes={sizes} />
            </Reveal>
          </div>
          <div className={`w-full ${textCols} flex flex-col justify-center pt-10 md:py-8 ${right ? 'md:pr-12 lg:pr-24' : 'md:pl-12 lg:pl-24'} ${contentClassName}`}>
            {eyebrow && (
              <Reveal variant="fade">
                <p className="eyebrow">{eyebrow}</p>
              </Reveal>
            )}
            {heading && (
              <Reveal>
                <HeadingTag className="h2 mb-6 text-ink md:text-[40px] md:leading-[1.15]">{heading}</HeadingTag>
              </Reveal>
            )}
            <Reveal delay={0.12}>{children}</Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
