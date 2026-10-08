import Image from '../ui/Image';
import Reveal from '../ui/Reveal';

/**
 * Dawn "image with text": a framed image in one third of the page width and
 * a text column alongside (stacked on mobile). Like Dawn's "adapt" media,
 * the image keeps at least its natural ratio but stretches to the height of
 * the text column when that is taller. `imageSide` flips the order; `wide`
 * gives the image half the width instead of a third.
 */
export default function ImageWithText({
  image,
  ratio,
  alt,
  imageSide = 'left',
  wide = false,
  framed = true,
  heading,
  headingAs: HeadingTag = 'h2',
  id,
  children,
  className = '',
  contentClassName = '',
}) {
  const imageCols = wide ? 'md:w-1/2' : 'md:w-1/3';
  const textCols = wide ? 'md:w-1/2' : 'md:w-2/3';
  const sizes = wide ? '(min-width: 750px) 50vw, 100vw' : '(min-width: 750px) 33vw, 100vw';

  return (
    <section id={id} className={`section-y scroll-mt-40 ${className}`}>
      <div className="page-width">
        <div className={`flex flex-col md:items-stretch ${imageSide === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
          <Reveal className={`relative w-full ${imageCols} ${framed ? 'border border-ink/5' : ''}`}>
            {/* Spacer reserves the natural ratio; the image fills the stretched column. */}
            <div aria-hidden="true" style={{ paddingBottom: `${100 / ratio}%` }} />
            <Image src={image} alt={alt} fill sizes={sizes} />
          </Reveal>
          <Reveal
            delay={0.08}
            className={`w-full ${textCols} px-[23px] pb-[40px] pt-[46px] xs:px-[40px] md:px-[50px] md:py-[40px] lg:px-[80.5px] lg:pb-[60px] lg:pt-[69px] ${contentClassName}`}
          >
            {heading && <HeadingTag className="h2 mb-5 text-ink md:mb-[26px]">{heading}</HeadingTag>}
            {children}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
