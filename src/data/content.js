import { C } from './products';

// Editorial content for the home, about, product-overview and contact pages.
// Images are store files on the Shopify CDN; `ratio` is width / height and
// reserves space so nothing shifts while photos load.
// Rich text is written as segments: [text] or [text, true] for bold.

export const HOME_SCENES = {
  hero: {
    image: {
      src: 'articles/give_me_an_image_of_shirt_with_crisp_collar_b0e515ef-9430-4b17-9567-8d0d5972b072.jpg',
      alt: 'Close-up of a crisp white shirt collar',
    },
    // The brand's own campaign line, from the original home banner.
    kicker: 'Behind every garment',
    title: ['The Invisible', 'Strength'],
    notes: [
      { label: 'The range', value: 'Woven & non-woven interlinings, fabrics and trims' },
      { label: 'Supplying', value: 'GCC · India · South Africa' },
    ],
    actions: [
      { label: 'Explore the range', to: '/products' },
      { label: 'Wholesale enquiry', to: '/contact' },
    ],
  },
  kinetic: {
    // Words drawn from the brand copy ("shape and strength", "structure").
    words: ['Structure · Shape ·', 'Strength · Structure'],
    images: [
      { src: 'Img_-_11_46cf5d2a-0ee9-40c6-85fc-31e6c69b2f48.png', ratio: 2032 / 1852, alt: 'Shirt collar, pocket and cuff pieces over a maroon circle' },
      { src: 'man_sewing_interlining_inside_fabric.png', ratio: 1024 / 812, alt: 'Tailor hand-stitching interlining inside a jacket front' },
      { src: 'packaging_of_infuse_interlining.jpg', ratio: 1512 / 997, alt: 'Infuse branded packaging and swatch tags' },
    ],
    link: { label: 'About Infuse', to: '/about' },
  },
  zoom: {
    image: { src: 'Blazer_interlining_roll.png', alt: 'Black, white and cream blazer interlining rolls' },
    link: { label: 'See the product range', to: '/products' },
  },
  // The store's "Top Products" collection.
  topHandles: ['if1035hf', 'if2366', 'web', 'if2344', 'if32-23hf', 'ifa85', 'if660d', 'if180'],
};

export const HOME = {
  intro: {
    eyebrow: 'Interlinings · Fabrics · Trims',
    title: 'Infuse - Edge In Fashion',
    // Facts already stated elsewhere on the site (markets, range, roll sizes, dispatch).
    facts: [
      { value: 'GCC · India · South Africa', label: 'Markets we supply' },
      { value: 'Woven & non-woven', label: 'Interlinings, fabrics & trims' },
      { value: '5 m & 10 m rolls', label: 'Alongside full rolls' },
      { value: '1–3 business days', label: 'Dispatch on stocked items' },
    ],
    body: [
      ['Infuse', true],
      [' supplies '],
      ['premium woven and non-woven interlinings, fabrics and trims', true],
      [' to the factories, fashion houses and tailoring workshops that dress the Gulf, Africa and South Asia. We measure ourselves on '],
      ['quality, consistency and responsiveness', true],
      [' — the things that keep a production line moving.'],
    ],
  },
  story: {
    title: 'Our Story',
    image: 'Img_-_11_46cf5d2a-0ee9-40c6-85fc-31e6c69b2f48.png',
    ratio: 2032 / 1852,
    alt: 'Shirt collar, pocket and cuff pieces arranged over a maroon circle',
    body: [
      [['Infuse is a women-led company based in the UAE. We started with a simple belief: the parts of a garment nobody sees deserve as much care as the parts everyone does.']],
      [['Today we look after the people who make clothes — designers, pattern cutters, factory owners and tailors — with interlinings, fabrics and trims that arrive checked, coded and ready for the cutting table, plus advice they can actually use.']],
    ],
  },
  precision: {
    title: 'Precision in Every Layer',
    image: 'shirt_interlining_white_color_roll.jpg',
    ratio: 2010 / 2544,
    alt: 'A roll of white shirt interlining beside a folded white dress shirt',
    body: [
      [['A tailored jacket holds its line and a thobe collar stands tall for one reason: the layer inside. We began by serving the Gulf’s garment makers with dependable interlinings and local know-how, and the same approach now takes us to customers across Africa and South Asia.']],
      [
        ['From '],
        ['Arabic thobes and corporate uniforms to formalwear and dresses', true],
        [', we help you choose the support each garment needs — and keep it in stock when you need it again.'],
      ],
    ],
  },
  cta: {
    title: 'Need Samples or Bulk Orders?',
    text: 'Talk to our team about swatches, trial lengths or full-roll pricing for your next collection.',
    image: 'Parallax_Banner.jpg',
    button: { label: 'Contact Us', to: '/contact' },
  },
  applications: [
    { label: 'Arabic Thobe', note: 'Collars, cuffs & plackets', icon: 'thobe_interlining.png', to: `/collections/${C.THOBE}` },
    { label: 'Shirts', note: 'Collars, cuffs & fronts', icon: 'shirt_icon_for_mens_interlining.png', to: `/collections/${C.SHIRT}` },
    { label: 'Jackets & Blazers', note: 'Fronts, lapels & facings', icon: 'jacket_image.png', to: `/collections/${C.JACKET}` },
    { label: 'Trousers', note: 'Waistbands & pocketing', icon: 'trouser_image.png', to: `/collections/${C.NONWOVEN}` },
    { label: 'Women’s Wear', note: 'Abayas, dresses & fronts', icon: 'womens_dress_image.png', to: `/collections/${C.SHIRT}` },
    { label: 'Embroidery', note: 'Stable backing for stitching', icon: 'embroidery_image.png', to: `/collections/${C.EMBROIDERY}` },
  ],
  ourProducts: {
    title: 'Our Products',
    image: 'interlining_collage_1.png',
    ratio: 1003 / 903,
    alt: 'Collage of an interlining roll, shoulder pads, a sleeve head and a fused shirt collar',
    items: [
      { label: 'Arabic Thobe Interlinings', to: `/collections/${C.THOBE}` },
      { label: 'Woven Interlinings', to: `/collections/${C.SHIRT}` },
      { label: 'Non-woven interlinings', to: `/collections/${C.NONWOVEN}` },
      { label: 'Stretched & Knitted Interlinings', to: '/products#stretch-knitted' },
      { label: 'Shirt Interlinings', to: `/collections/${C.SHIRT}` },
      { label: 'Trims & Accessories', to: `/collections/${C.ACCESSORIES}` },
      { label: 'Fabrics', to: `/collections/${C.JACKET}` },
    ],
  },
  why: [
    { label: 'Family-Driven Values With Global Standards', icon: 'Img_-_12.png' },
    { label: 'Trusted Partner Across GCC, India & South African Markets', icon: 'Logo_gcc.png' },
  ],
};

export const ABOUT = {
  banner: {
    image: 'About_Us_Banner_Final.jpg',
    alt: 'Infuse interlining — the silent architect of every silhouette. Collars, rolls, shoulder pads and tapes.',
  },
  intro: [
    ['InFuse: Edge in Fashion', true],
    [' is the interlining brand of '],
    ['Fusibles Textiles', true],
    [' — a curated range of fusibles, fabrics and trims for garments that need to look sharp and last.'],
  ],
  blocks: [
    {
      title: 'Our Story',
      image: 'man_sewing_interlining_inside_fabric.png',
      ratio: 1024 / 812,
      alt: 'Tailor hand-stitching interlining inside a jacket front',
      imageSide: 'right',
      body: [
        [
          ['Before InFuse, our team worked in engineering — a field where small tolerances make a big difference. Interlinings turned out to reward exactly that mindset. Today we bring a '],
          ['measured, technical approach', true],
          [' and '],
          ['a designer’s eye', true],
          [' to the materials that keep garments looking their best.'],
        ],
      ],
    },
    {
      title: 'Technical Assistance',
      image: 'collage_of_interlining_fusing_process.png',
      ratio: 1012 / 809,
      alt: 'Collage of interlining swatches, peeling a fused sample and pressing with an iron',
      imageSide: 'left',
      framed: true,
      body: [
        [['Good materials are only half the job. Our commercial team offers hands-on technical support — selecting the right quality, setting up fusing parameters and troubleshooting on the line — so every customer ends up with a solution that suits their fabric and process.']],
      ],
    },
    {
      title: 'Quality & Delivery Policy',
      image: 'packaging_of_infuse_interlining.jpg',
      ratio: 1512 / 997,
      alt: 'Infuse branded packaging, swatch and hang tags for IF-180 interlining',
      imageSide: 'right',
      wide: true,
      body: [
        [['Each roll is inspected, labelled with its code and packed to arrive in the condition it left our warehouse — the same standard on the first order and the fiftieth.']],
      ],
    },
  ],
  mission: {
    title: 'Mission',
    text: 'Bringing dependable, high-quality interlinings to the Gulf apparel industry with local stock and know-how — and building long-term partnerships as we grow into Africa and South Asia.',
    image: 'about_us_cta_banner_mission.jpg',
  },
  why: {
    title: 'Why Clients Choose Us',
    image: 'box_of_interlining_samples.png',
    ratio: 1506 / 991,
    alt: 'Stack of folded shirts beside an Infuse shipping box',
    points: [
      ['Suited to every climate', 'ranges selected for hot, humid and temperate markets alike, so garments wear comfortably wherever they are sold.'],
      ['Fast, reliable supply', 'regional stock held in the UAE for quick dispatch to customers throughout the GCC, India and South Africa.'],
      ['Bulk & custom orders', 'from full-roll factory volumes to 5 m and 10 m rolls for sampling and boutique runs.'],
      ['Technical support', 'fusing settings, fabric compatibility and product selection advice from people who know interlinings.'],
    ],
  },
  sustainability: {
    title: 'Sustainability',
    text: 'Fewer handovers, smarter shipping and careful stock planning help us cut waste while keeping quality and delivery dependable.',
    image: 'about_us_page_cta_sustainability_banner.jpg',
  },
  values: {
    title: 'Our Core Values',
    text: 'Three principles guide how we work with each other, with our suppliers and with every customer.',
    items: [
      { title: 'Build Together, Win Together', text: 'Partnership at the heart of everything we do.', icon: 'infuse_value_1.png' },
      { title: 'Pursuit of Improvement', text: 'Every season, a little better than the last.', icon: 'infuse_value_2.png' },
      { title: 'Customer – Centricity', text: 'We listen first, then tailor our service.', icon: 'infuse_value_3.png' },
    ],
  },
  vision: {
    title: 'Our Vision',
    text: 'To become the first name garment makers in the GCC, India and South Africa turn to for interlinings.',
    image: 'about_us_cta_vision.jpg',
  },
};

export const PRODUCT_OVERVIEW = {
  banner: {
    image: 'product_page_banner_image_final.jpg',
    alt: 'Smart cuts, smooth finishes — interlining that elevates every stitch. Designers working with garments and fabric.',
  },
  categories: [
    {
      id: 'arabic-thobe',
      title: 'Arabic Thobe',
      image: 'Img_-_05_f0f96572-f2e5-4428-b8a6-e0670cc3c1ec.jpg',
      ratio: 1024 / 1536,
      alt: 'Two rolls of white thobe interlining on a maroon background',
      text: [[['Collars that stand, cuffs that stay sharp and plackets that lie flat. Our thobe qualities run from soft to hard handles, so each part of the garment gets exactly the support it needs without losing the thobe’s easy fall.']]],
      to: `/collections/${C.THOBE}`,
    },
    {
      id: 'shirt',
      title: 'Shirt Interlinings',
      image: 'Shirt_interlining_roll.jpg',
      ratio: 1024 / 1536,
      alt: 'Rolls of white and black shirt interlining fanned out on maroon',
      text: [[['From relaxed weekend shirts to starched business collars, our woven shirt fusibles keep collars, cuffs and fronts crisp through wash after wash.']]],
      to: `/collections/${C.SHIRT}`,
    },
    {
      id: 'jackets-blazers',
      title: 'Jackets & Blazers Interlinings',
      image: 'Blazer_interlining_roll.png',
      ratio: 1536 / 1024,
      alt: 'Black, white and cream blazer interlining rolls',
      text: [[['Light, mouldable fusibles for fronts, lapels and facings help tailoring hold its shape and drape — whether it is an unstructured summer jacket or a formal blazer built for long days.']]],
      to: `/collections/${C.JACKET}`,
    },
    {
      id: 'non-woven',
      title: 'Non Woven Interlinings',
      image: 'black_and_white_non_woven_interlining.png',
      ratio: 1536 / 1024,
      alt: 'Charcoal and white non-woven interlining swatches with pinked edges',
      text: [
        [
          ['Bonded rather than woven, non-woven interlinings cut cleanly in any direction and cost less per metre — '],
          ['a practical choice for high-volume casualwear', true],
          [', t-shirt plackets and waistbands. Available in '],
          ['fusible and sew-in', true],
          [' versions.'],
        ],
      ],
      to: `/collections/${C.NONWOVEN}`,
    },
    {
      id: 'embroidery',
      title: 'Embroidery Interlinings',
      image: 'embroidery_interlining_infuse.jpg',
      ratio: 1,
      alt: 'INFUSE embroidered in red and navy on cream fabric in a wooden hoop',
      text: [[['A steady base under the needle: our backings stop light fabrics from stretching and puckering, so detailed motifs come out clean and stay that way.']]],
      to: `/collections/${C.EMBROIDERY}`,
    },
    {
      id: 'stretch-knitted',
      title: 'Stretch & Knitted Interlinings',
      image: 'Stretch_Knitted_Interlining.jpg',
      ratio: 1024 / 1536,
      alt: 'Black and white knitted interlining draped on red',
      text: [
        [
          ['Built for jersey and fleece, these interlinings stretch '],
          ['two ways or four', true],
          [' with the fabric — adding shape to hoods, plackets and waistbands without restricting movement. Ask our team for the current range.'],
        ],
      ],
    },
  ],
  accessories: {
    title: 'Accessories',
    image: 'product_page_collage_1.png',
    ratio: 1257 / 749,
    alt: 'Collage of tapes, shoulder pads and sleeve heads',
    items: ['Pre-Cut Collars', 'Pre-Cut Tapes & Slotted Coils', 'Sleevehead', 'Shoulder Pads', 'Chest Pieces'],
    to: `/collections/${C.ACCESSORIES}`,
  },
};

export const CONTACT = {
  banner: {
    image: 'Infuse_Interlinings_Delivery_Locations.jpg',
    alt: 'World map marking Infuse delivery locations: UAE, Saudi Arabia, Oman, Qatar, Bahrain, Kuwait, Iran, Egypt, Jordan, India and South Africa',
  },
  title: 'Our Valued Relationship Begins Here',
};
