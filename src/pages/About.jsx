import Breadcrumbs from '../components/ui/Breadcrumbs';
import Image from '../components/ui/Image';
import Reveal from '../components/ui/Reveal';
import RichText from '../components/ui/RichText';
import FAQ from '../components/ui/FAQ';
import RichTextSection from '../components/sections/RichTextSection';
import ImageWithText from '../components/sections/ImageWithText';
import CtaBanner from '../components/sections/CtaBanner';
import { ABOUT } from '../data/content';
import { ABOUT_FAQS } from '../data/faqs';
import { cdnUrl } from '../lib/images';
import { useSeo } from '../hooks/useSeo';

export default function About() {
  useSeo({
    title: 'About Us',
    description: 'Infuse is a women-led interlining distributor in the UAE supplying the GCC, India and South Africa with woven and non-woven fusibles, fabrics and trims.',
    image: ABOUT.banner.image,
    path: '/about',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'About Us' }]} />
      <h1 className="sr-only">About Infuse</h1>
      <Image src={ABOUT.banner.image} alt={ABOUT.banner.alt} ratio="6667 / 2050" priority sizes="100vw" widths={[640, 960, 1280, 1600, 1920, 2560]} />

      <RichTextSection segments={ABOUT.intro} className="!py-[34px] md:!py-[46px]" />

      {ABOUT.blocks.map((block) => (
        <ImageWithText
          key={block.title}
          image={block.image}
          ratio={block.ratio}
          alt={block.alt}
          imageSide={block.imageSide}
          wide={block.wide || block.framed}
          framed={Boolean(block.framed)}
          heading={block.title}
        >
          <RichText paragraphs={block.body} className="max-w-[620px] text-pretty" />
        </ImageWithText>
      ))}

      <CtaBanner
        font="heading"
        title={ABOUT.mission.title}
        text={ABOUT.mission.text}
        image={ABOUT.mission.image}
        button={ABOUT.mission.button}
        minHeight="min-h-[300px] md:min-h-[336px]"
      />

      <section className="section-y py-12 md:py-[80px]" aria-labelledby="why-clients">
        <div className="page-width grid items-center gap-8 md:grid-cols-[minmax(0,587px)_1fr] md:gap-[80px]">
          <Reveal>
            <Image src={ABOUT.why.image} ratio={ABOUT.why.ratio} alt={ABOUT.why.alt} sizes="(min-width: 750px) 46vw, 100vw" />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="why-clients" className="h2 mb-6 text-ink md:mb-[34px]">
              {ABOUT.why.title}
            </h2>
            <ul className="list-disc space-y-4 pl-[25px] marker:text-ink/70">
              {ABOUT.why.points.map(([label, text]) => (
                <li key={label}>
                  <strong className="font-bold text-ink/85">{label}</strong> â€“ {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBanner font="heading" title={ABOUT.sustainability.title} text={ABOUT.sustainability.text} image={ABOUT.sustainability.image} minHeight="min-h-[240px] md:min-h-[258px]" />

      <section aria-labelledby="values-title">
        <div className="bg-surface-muted py-10 md:pb-[50px] md:pt-[40px]">
          <Reveal className="page-width text-center">
            <h2 id="values-title" className="h1 mb-5 text-black md:mb-[30px]">
              {ABOUT.values.title}
            </h2>
            <p className="mx-auto max-w-[720px] text-black/75">{ABOUT.values.text}</p>
          </Reveal>
        </div>
        <ul className="page-width grid gap-10 py-10 md:grid-cols-3 md:gap-6 md:py-[36px]">
          {ABOUT.values.items.map((value, i) => (
            <Reveal as="li" key={value.title} delay={i * 0.07} className="flex flex-col items-center text-center">
              <img src={cdnUrl(value.icon, 200)} alt="" width="72" height="72" loading="lazy" className="mb-[18px] h-[72px] w-[72px] object-contain" />
              <h3 className="mb-1 font-body text-[17px] font-bold tracking-[0.69px] text-black">{value.title}</h3>
              <p className="text-[15px] tracking-[0.69px] text-black/80">{value.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBanner font="heading" title={ABOUT.vision.title} text={ABOUT.vision.text} image={ABOUT.vision.image} minHeight="min-h-[220px] md:min-h-[231px]" />

      <FAQ items={ABOUT_FAQS} tone="maroon" titleSize="h2 md:!text-[40px]" />
    </>
  );
}
