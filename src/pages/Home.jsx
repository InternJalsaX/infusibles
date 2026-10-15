import HeroScene from '../components/scenes/HeroScene';
import StatementScene from '../components/scenes/StatementScene';
import KineticScene from '../components/scenes/KineticScene';
import ZoomScene from '../components/scenes/ZoomScene';
import HorizontalProducts from '../components/scenes/HorizontalProducts';
import CategoryScene from '../components/scenes/CategoryScene';
import ApplicationAreas from '../components/home/ApplicationAreas';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CtaBanner from '../components/sections/CtaBanner';
import FAQ from '../components/ui/FAQ';
import { HOME, HOME_SCENES, PRODUCT_OVERVIEW } from '../data/content';
import { HOME_FAQS } from '../data/faqs';
import { getProduct } from '../data/products';
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

const TOP = HOME_SCENES.topHandles.map(getProduct).filter(Boolean);

// Product families for the stepper: the six categories plus accessories.
const FAMILIES = [
  ...PRODUCT_OVERVIEW.categories,
  {
    id: 'accessories',
    title: PRODUCT_OVERVIEW.accessories.title,
    image: PRODUCT_OVERVIEW.accessories.image,
    alt: PRODUCT_OVERVIEW.accessories.alt,
    to: PRODUCT_OVERVIEW.accessories.to,
    text: [[[`${PRODUCT_OVERVIEW.accessories.items.join(', ')} — the finishing components of garment construction.`]]],
  },
];

/**
 * Home is told as a sequence of scroll-driven scenes (pinned stages that
 * animate with scroll), followed by regular sections for application areas,
 * enquiries, reasons to choose Infuse and the FAQ.
 */
export default function Home() {
  useSeo({ path: '/', jsonLd: ORG_LD });
  const { hero, kinetic, zoom } = HOME_SCENES;

  return (
    <>
      <HeroScene image={hero.image} title={hero.title} kicker={hero.kicker} notes={hero.notes} actions={hero.actions} />

      <StatementScene eyebrow={HOME.intro.eyebrow} segments={HOME.intro.body} facts={HOME.intro.facts} />

      <KineticScene words={kinetic.words} heading={HOME.story.title} body={HOME.story.body[0]} images={kinetic.images} link={kinetic.link} />

      <ZoomScene eyebrow="Our craft" heading={['Precision', 'in Every Layer']} image={zoom.image} body={HOME.precision.body} link={zoom.link} />

      <HorizontalProducts
        eyebrow="Best sellers"
        title="Top Products"
        intro="The interlinings our customers reorder most — from soft fusibles to hard collar qualities."
        products={TOP}
        viewAllTo="/collections/all"
      />

      <CtaBanner
        eyebrow="Wholesale enquiries"
        title={HOME.cta.title}
        text={HOME.cta.text}
        image={HOME.cta.image}
        button={HOME.cta.button}
        secondary={{ label: 'Chat on WhatsApp', href: SITE.whatsappHref }}
      />

      <ApplicationAreas items={HOME.applications} />

      <CategoryScene eyebrow="The range" title={HOME.ourProducts.title} items={FAMILIES} />

      <WhyChooseUs items={HOME.why} />

      <FAQ items={HOME_FAQS} tone="maroon" />
    </>
  );
}
