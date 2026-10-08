import { Fragment } from 'react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Image from '../components/ui/Image';
import Button from '../components/ui/Button';
import RichText from '../components/ui/RichText';
import ImageWithText from '../components/sections/ImageWithText';
import WaveDivider from '../components/sections/WaveDivider';
import { PRODUCT_OVERVIEW } from '../data/content';
import { useSeo } from '../hooks/useSeo';

/** "Product" page: banner, then each interlining family with a Shop Now link. */
export default function Products() {
  const { banner, categories, accessories } = PRODUCT_OVERVIEW;
  useSeo({
    title: 'Product',
    description: 'Explore Infuse interlinings by category: Arabic thobe, shirt, jackets & blazers, non-woven, embroidery, stretch & knitted interlinings and accessories.',
    image: banner.image,
    path: '/products',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Product' }]} />
      <h1 className="sr-only">Our interlining products</h1>
      <Image src={banner.image} alt={banner.alt} ratio="6667 / 2050" priority sizes="100vw" widths={[640, 960, 1280, 1600, 1920, 2560]} />

      {categories.map((cat, i) => (
        <Fragment key={cat.id}>
          {i > 0 && <WaveDivider />}
          <ImageWithText
            id={cat.id}
            image={cat.image}
            ratio={cat.ratio}
            alt={cat.alt}
            imageSide={i % 2 === 0 ? 'right' : 'left'}
            framed={false}
            heading={cat.title}
            className="!py-[24px] md:!py-[36px]"
          >
            <RichText paragraphs={cat.text} className="text-justify [hyphens:auto]" />
            {cat.to && (
              <Button to={cat.to} variant="blue" className="mt-7 md:mt-[40px]">
                Shop Now
              </Button>
            )}
          </ImageWithText>
        </Fragment>
      ))}

      <WaveDivider />
      <ImageWithText
        id="accessories"
        image={accessories.image}
        ratio={accessories.ratio}
        alt={accessories.alt}
        imageSide="right"
        wide
        heading={accessories.title}
        className="!pb-14 md:!pb-[70px]"
      >
        <ul className="list-disc space-y-0 pl-[48px] marker:text-ink/70">
          {accessories.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Button to={accessories.to} variant="blue" className="mt-7 md:mt-[40px]">
          Shop Now
        </Button>
      </ImageWithText>
    </>
  );
}
