import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import HeroSlideshow from '../components/home/HeroSlideshow';
import BrandIntro from '../components/home/BrandIntro';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ApplicationAreas from '../components/home/ApplicationAreas';
import WhyChooseUs from '../components/home/WhyChooseUs';
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

      <BrandIntro intro={HOME.intro} />

      <ImageWithText eyebrow="Who we are" image={HOME.story.image} ratio={HOME.story.ratio} alt={HOME.story.alt} heading={HOME.story.title}>
        <RichText paragraphs={HOME.story.body} className="max-w-[620px] text-pretty" />
      </ImageWithText>

      <ImageWithText
        eyebrow="Our craft"
        image={HOME.precision.image}
        ratio={HOME.precision.ratio}
        alt={HOME.precision.alt}
        imageSide="right"
        heading={HOME.precision.title}
        className="bg-surface-tint"
      >
        <RichText paragraphs={HOME.precision.body} className="max-w-[620px] text-pretty" />
      </ImageWithText>

      <FeaturedProducts products={TOP_PRODUCTS} viewAllTo="/collections/all" />

      <CtaBanner
        eyebrow="Wholesale enquiries"
        title={HOME.cta.title}
        text={HOME.cta.text}
        image={HOME.cta.image}
        button={HOME.cta.button}
        secondary={{ label: 'Chat on WhatsApp', href: SITE.whatsappHref }}
      />

      <ApplicationAreas items={HOME.applications} />

      <ImageWithText
        eyebrow="The range"
        image={HOME.ourProducts.image}
        ratio={HOME.ourProducts.ratio}
        alt={HOME.ourProducts.alt}
        heading={HOME.ourProducts.title}
        className="bg-surface-tint"
      >
        <ul className="divide-y divide-navy/10 border-y border-navy/10">
          {HOME.ourProducts.items.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="group flex items-center justify-between gap-4 py-3.5 text-ink/80 transition-colors duration-200 hover:text-navy"
              >
                <span className="transition-transform duration-300 ease-brand group-hover:translate-x-1.5">{item.label}</span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-navy/40 transition-all duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-maroon"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </ImageWithText>

      <WhyChooseUs items={HOME.why} />

      <FAQ items={HOME_FAQS} tone="maroon" />
    </>
  );
}
