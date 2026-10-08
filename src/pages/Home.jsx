import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/home/HeroSlideshow';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ApplicationAreas from '../components/home/ApplicationAreas';
import WhyChooseUs from '../components/home/WhyChooseUs';
import RichTextSection from '../components/sections/RichTextSection';
import ImageWithText from '../components/sections/ImageWithText';
import CtaBanner from '../components/sections/CtaBanner';
import RichText from '../components/ui/RichText';
import FAQ from '../components/ui/FAQ';
import { HERO_SLIDES, HOME } from '../data/content';
import { HOME_FAQS } from '../data/faqs';
import { TOP_PRODUCTS } from '../data/products';
import { SITE } from '../data/site';
import { useSeo } from '../hooks/useSeo';

const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.legalName,
  brand: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  address: { '@type': 'PostalAddress', addressLocality: 'Ajman', addressCountry: 'AE' },
  areaServed: ['AE', 'SA', 'OM', 'QA', 'BH', 'KW', 'IN', 'EG', 'JO', 'ZA'],
};

export default function Home() {
  useSeo({ path: '/', jsonLd: ORG_LD });

  return (
    <>
      <h1 className="sr-only">Infuse – premium fusible interlinings for the Gulf, India and South Africa</h1>
      <HeroSlideshow slides={HERO_SLIDES} />

      <RichTextSection title={HOME.intro.title} segments={HOME.intro.body} />

      <ImageWithText image={HOME.story.image} ratio={HOME.story.ratio} alt={HOME.story.alt} heading={HOME.story.title}>
        <RichText paragraphs={HOME.story.body} className="text-justify [hyphens:auto]" />
      </ImageWithText>

      <ImageWithText
        image={HOME.precision.image}
        ratio={HOME.precision.ratio}
        alt={HOME.precision.alt}
        imageSide="right"
        heading={HOME.precision.title}
      >
        <RichText paragraphs={HOME.precision.body} />
      </ImageWithText>

      <FeaturedProducts products={TOP_PRODUCTS} viewAllTo="/collections/all" />

      <CtaBanner title={HOME.cta.title} text={HOME.cta.text} image={HOME.cta.image} button={HOME.cta.button} />

      <ApplicationAreas items={HOME.applications} />

      <ImageWithText image={HOME.ourProducts.image} ratio={HOME.ourProducts.ratio} alt={HOME.ourProducts.alt} heading={HOME.ourProducts.title}>
        <ul className="list-disc space-y-0 pl-[48px] marker:text-ink/70">
          {HOME.ourProducts.items.map((item) => (
            <li key={item.label}>
              <Link to={item.to} className="underline-offset-[0.3rem] transition-colors hover:text-navy hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </ImageWithText>

      <WhyChooseUs items={HOME.why} />

      <FAQ items={HOME_FAQS} tone="maroon" titleSize="h1" />
    </>
  );
}
