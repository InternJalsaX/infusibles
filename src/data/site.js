// Global store configuration: brand, contact details, navigation and markets.

export const SITE = {
  name: 'Infuse',
  storeName: 'Fusibles',
  legalName: 'Fusibles LLC',
  tagline: 'Edge in Fashion',
  url: 'https://www.fusibles.ae',
  email: 'info@fusibles.ae',
  phone: '+971 50 152 4880',
  phoneHref: 'tel:+971501524880',
  whatsappHref: 'https://wa.me/971501524880',
  location: 'Ajman, UAE',
  logo: 'Infuse_Interlining_Logo.jpg',
  announcement: 'Infuse: Global By Design. 5 meter and 10 meter rolls also available.',
  defaultTitle: 'Infuse – Best Fusible Interlinings in Gulf, India & South Africa – Fusibles',
  defaultDescription:
    'Infuse distributes premium woven and non-woven fusible interlinings, fabrics and trims to apparel manufacturers, fashion houses and tailors across the GCC, India and South Africa.',
  defaultImage: 'Infuse_Interlining_Home_Page_Banner.jpg',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  ],
};

// Store behaviour flags.
export const STORE_CONFIG = {
  // The live store hides prices from guests ("Login | Register to see price").
  // Set to true to restore that B2B gate; signing in on /account unlocks prices.
  requireLoginForPrice: false,
  currency: { code: 'AED', symbol: 'Dhs.', label: 'AED د.إ' },
  productsPerPage: 16,
};

export const SHOP_MENU = [
  { label: 'Arabic Thobe Interlinings', to: '/collections/arabic-thobe-interlinings' },
  { label: 'Shirt Interlinings', to: '/collections/shirt-interlinings' },
  { label: 'Jackets & Blazers Interlinings', to: '/collections/jackets-blazers-interlinings' },
  { label: 'Embroidery Interlinings', to: '/collections/embroidery-interlinings' },
  { label: 'Non-Woven Interlinings', to: '/collections/non-woven-interlinings' },
  { label: 'Accessories', to: '/collections/accessories' },
];

export const MAIN_NAV = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Product', to: '/products' },
  { label: 'Shop Now', to: '/collections/arabic-thobe-interlinings', children: SHOP_MENU },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_MENUS = [
  {
    title: 'Products',
    links: [
      { label: 'Arabic Thobe Interlinings', to: '/collections/arabic-thobe-interlinings' },
      { label: 'Shirt Interlinings', to: '/collections/shirt-interlinings' },
      { label: 'Embroidery Interlinings', to: '/collections/embroidery-interlinings' },
      { label: 'Jackets & Blazers Interlinings', to: '/collections/jackets-blazers-interlinings' },
      { label: 'Non-Woven Interlinings', to: '/collections/non-woven-interlinings' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Profile', to: '/account' },
    ],
  },
];

export const POLICY_LINKS = [
  { label: 'Privacy policy', to: '/policies/privacy-policy' },
  { label: 'Terms of service', to: '/policies/terms-of-service' },
  { label: 'Refund policy', to: '/policies/refund-policy' },
  { label: 'Shipping policy', to: '/policies/shipping-policy' },
];

// Markets offered by the country selector. The store trades in AED everywhere.
export const COUNTRIES = [
  { code: 'BH', name: 'Bahrain' },
  { code: 'EG', name: 'Egypt' },
  { code: 'IN', name: 'India' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'OM', name: 'Oman' },
  { code: 'QA', name: 'Qatar' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'AE', name: 'United Arab Emirates' },
];

export const DEFAULT_COUNTRY = 'AE';
