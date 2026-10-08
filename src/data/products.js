// Product catalogue. Codes, prices (AED per roll), variants, widths and GSM
// ranges follow the live store; descriptions are written from those specs.

const SHADES = ['White', 'Cream', 'Off White', 'Blue White'];

// Collection handles used in routes and the catalogue below.
export const C = {
  THOBE: 'arabic-thobe-interlinings',
  SHIRT: 'shirt-interlinings',
  JACKET: 'jackets-blazers-interlinings',
  EMBROIDERY: 'embroidery-interlinings',
  NONWOVEN: 'non-woven-interlinings',
  ACCESSORIES: 'accessories',
};

const USE = {
  [C.THOBE]: 'thobe collars, cuffs and plackets',
  [C.SHIRT]: 'shirt collars, cuffs and front plackets',
  [C.JACKET]: 'jacket fronts, lapels and facings',
  [C.EMBROIDERY]: 'embroidery backing on abayas, jalabiyas and fashion pieces',
  [C.NONWOVEN]: 'waistbands, plackets and everyday casualwear',
};

const FEEL_NOTE = {
  Soft: 'a soft, pliable handle that keeps the garment comfortable against the skin',
  'Medium Soft': 'a medium-soft handle that balances drape with definition',
  Firm: 'a firm handle that holds sharp lines through repeated wear and washing',
  Hard: 'a hard, high-body handle for stand-up collars and the crispest finishes',
  'Soft & Grainy': 'a soft, slightly grainy handle that moulds naturally to tailored shapes',
};

// Compact source rows -------------------------------------------------------
// price: base AED per roll | upcharge: extra AED for specific colours
const ROWS = [
  // Arabic thobe & shirt interlinings (woven fusibles)
  { code: 'IF2344', collections: [C.THOBE, C.SHIRT], price: 252, colors: SHADES, length: '25', feel: 'Soft', width: '44"', gsm: '180–210', composition: '80% Polyester / 20% Cotton', images: ['IF2344.png', 'IF-2344_Spec_sheet-1.jpg'], top: true },
  { code: 'IF3903', collections: [C.THOBE, C.SHIRT], price: 200, colors: SHADES, length: '25', feel: 'Soft', width: '44"', gsm: '170–200', images: ['IF3903.png', 'IF-3903_Spec_sheet-1.jpg'] },
  { code: 'IF84', collections: [C.THOBE, C.SHIRT], price: 225, colors: SHADES, length: '25', feel: 'Soft', width: '44"', gsm: '200–225', images: ['IF84.png', 'Sheet.png'] },
  { code: 'IF2777', collections: [C.THOBE, C.SHIRT], price: 199, colors: [...SHADES, 'Black'], upcharge: { Black: 26 }, length: '25', feel: 'Firm', width: '44"', gsm: '250–300', images: ['IF2777.png', 'IF-2777_Spec_sheet-1.jpg'] },
  { code: 'IF3013', collections: [C.THOBE, C.SHIRT], price: 180, colors: SHADES, length: '20', feel: 'Firm', width: '44"', gsm: '180–200', images: ['IF3013.png', '48_c7fd6c33-80c0-4501-b6cd-38f3d3135d34.png', 'IF3013_Spec_sheet-1.jpg'], soldOut: true },
  { code: 'IF32-23HF', collections: [C.THOBE, C.SHIRT], price: 185, colors: [...SHADES, 'Black'], upcharge: { Black: 15 }, length: '25', feel: 'Firm', width: '44"', gsm: '160–200', images: ['IF3223HF.png', 'IF32-23HF_Spec_sheet-1.jpg'] },
  { code: 'IF2466', collections: [C.THOBE], price: 475, colors: SHADES, length: '25', feel: 'Hard', width: '44"', gsm: '600–650', images: ['IF2466.png', 'IF-2466_Spec_sheet-1_a2c64d04-b1e7-44a0-9420-48cf4633b16e.jpg'] },
  { code: 'IF2355', collections: [C.THOBE], price: 325, colors: SHADES, length: '25', feel: 'Firm', width: '44"', gsm: '300–335', images: ['IF2355.png', 'IF2355_Spec_sheet-1.jpg'] },
  { code: 'IF6020', collections: [C.THOBE, C.SHIRT], price: 189, colors: SHADES, length: '25', width: '44"', gsm: '150–180', images: ['IF6020.png', 'IF-6020_Spec_sheet-1.jpg'] },
  { code: 'IF1035HF', collections: [C.THOBE, C.EMBROIDERY], price: 30, colors: ['White', 'Black'], upcharge: { Black: 2 }, length: '23', width: '40"', type: 'Non-woven', images: ['Copy_of_Tech_Spec_2.png', 'IF1035HF.png', 'Copy_of_Tech_Spec_3.png', 'IF1035-HF_Spec_Sheet-1.jpg'], top: true },
  { code: 'IF2366', collections: [C.THOBE], price: 625, colors: [...SHADES, 'Snow White', 'Black'], upcharge: { Black: 35 }, length: '25', feel: 'Hard', width: '44"', gsm: '680–700', images: ['Copy_of_Tech_Spec.png', 'IF2366.png', 'IF-2366_Spec_sheet_page-0001.jpg'], top: true },
  { code: 'IF9815', collections: [C.THOBE], price: 510, colors: SHADES, length: '25', feel: 'Hard', width: '36"', gsm: '700–720', images: ['IF9815.png', 'IF9815_Spec_Sheet-1_aee32ce2-9cf4-4c96-b8bc-f32ecd1cea70.jpg'] },
  { code: 'IF92', collections: [C.THOBE, C.SHIRT], price: 375, colors: [...SHADES, 'Snow White'], length: '25', feel: 'Hard', width: '44"', gsm: '500–550', images: ['47_09536184-9085-4238-b8ee-fc5326881754.png', 'IF92_Spec_sheet-1.jpg'] },
  { code: 'IF1333', collections: [C.THOBE, C.SHIRT], price: 205, colors: SHADES, length: '25', feel: 'Firm', width: '44"', gsm: '200–220', images: ['50.png', 'IF-1333_Spec_sheet-1.jpg'] },
  { code: 'IF9303', collections: [C.THOBE, C.SHIRT], price: 225, colors: SHADES, length: '25', feel: 'Medium Soft', width: '44"', gsm: '190–210', images: ['IF9303.png', 'IF9303_Spec_sheet-1_dff48e84-ab58-47fc-8d98-c7f97b736e99.jpg'] },
  { code: 'IF3535', collections: [C.THOBE], price: 205, colors: ['White', 'Cream', 'Off White'], length: '25', width: '44"', images: ['Sheet.png'] },
  { code: 'IF4223H', collections: [C.SHIRT], price: 205, colors: ['White', 'Cream', 'Off White'], length: '25', feel: 'Firm', gsm: '200–220', images: ['51.png', 'IF-4223H_Spech_sheet-1.jpg'] },
  { code: 'IF180', collections: [C.SHIRT], price: 187, colors: SHADES, length: '25', feel: 'Soft', width: '44"', gsm: '150–170', images: ['52.png', 'IF-180_Spec_sheet-1.jpg'] },
  { code: 'IF3807', collections: [C.SHIRT], price: 185, colors: SHADES, length: '25', feel: 'Soft', width: '44"', gsm: '150–170', images: ['IF3807.png', 'IF-3807_Spec_sheet-1.jpg'] },
  { code: 'IF977', collections: [C.SHIRT], price: 199, colors: SHADES, length: '25', feel: 'Soft', width: '36"', gsm: '170–200', images: ['CopyofTechSpec.png', 'IF977_page-0001.jpg'] },

  // Jackets & blazers
  { code: 'IF50', collections: [C.JACKET], price: 110, colors: ['White', 'Black'], length: '25', feel: 'Soft & Grainy', width: '60"', gsm: '65', images: ['IF50.png', 'IF-50_Spec_sheet-1.jpg'] },
  { code: 'IFPD933', collections: [C.JACKET], price: 101, colors: ['White', 'Black'], length: '25', feel: 'Soft & Grainy', width: '60"', gsm: '50–60', images: ['IFPD933.png', 'IF-PD933_Spec_sheet-1.jpg'] },
  { code: 'Plain Pocketing', handle: 'plain-pocketing', collections: [C.JACKET], price: 94, colors: ['Black'], length: '25', feel: 'Soft', width: '60"', type: 'Pocketing fabric', images: ['Plain-Pocket.png', 'Plain_Pocketing_Spec_sheet-1.jpg'] },
  { code: 'IF30-23SD', collections: [C.JACKET], price: 110, colors: ['White', 'Black'], length: '25', feel: 'Soft & Grainy', width: '60"', gsm: '50–60', images: ['IF3023SD.png', 'IF30-23SD_Spec_sheet-1_5875724a-4f21-4a0d-8e99-1cc531e424fc.jpg'] },
  { code: 'IFA95', collections: [C.JACKET], price: 210, colors: ['Off White', 'Black'], length: '25', feel: 'Soft & Grainy', width: '60"', gsm: '80–95', images: ['Copy_of_Tech_Spec_1.png', 'Sheet_5af14269-e60c-4038-a8dc-8875fc4d06f5.png'] },
  { code: 'IF660D', collections: [C.JACKET], price: 170, colors: ['Black', 'Off White', 'White'], length: '20', feel: 'Soft', width: '60"', images: ['IF660D.png', 'IF-660D_Spec_sheet-1.jpg'] },
  { code: 'IFA55', collections: [C.JACKET], price: 150, colors: ['White'], length: '25', feel: 'Soft & Grainy', width: '60"', gsm: '55–60', images: ['IFA55.png', 'IF-A55_Spec_sheet-1.jpg'] },
  { code: 'IFA85', collections: [C.JACKET], price: 180, colors: ['Black', 'Off White'], length: '25', feel: 'Soft & Grainy', width: '60"', gsm: '70–80', images: ['IFA85.png', 'IF-A85_Spec_sheet-1_f154768a-ae62-407b-8e18-21afbb82c7e8.jpg'] },

  // Embroidery
  { code: 'IF1035H', collections: [C.EMBROIDERY], price: 30, colors: ['White'], length: '23', width: '40"', type: 'Non-woven', images: ['IF2366_4.png', 'IF1035H_spec_sheet-1.jpg'] },
  { code: 'IF1050H', collections: [C.EMBROIDERY], price: 45, colors: ['White'], width: '40"', type: 'Non-woven', images: ['IF2366_2.png', 'IF1050-H_Spec_sheet-1.jpg'] },
  { code: 'IF102', collections: [C.EMBROIDERY], price: 290, colors: ['White'], length: '25', gsm: '60', type: 'Non-woven', images: ['Copy_of_Tech_Spec_4.png', 'Sheet.png'] },

  // Non-woven
  { code: 'IF-ABX30', collections: [C.NONWOVEN], price: 45, colors: ['White', 'Charcoal'], length: '25', width: '36"', type: 'Non-woven', images: ['ABX30.png', 'IFABX30.jpg'] },
  { code: 'IF-ABX45', collections: [C.NONWOVEN], price: 22.5, colors: ['White'], length: '25', width: '36"', type: 'Non-woven', images: ['Sheet_5af14269-e60c-4038-a8dc-8875fc4d06f5.png'] },
  { code: 'Web', handle: 'web', collections: [C.NONWOVEN], price: 49, colors: ['White'], length: '25', width: '44"', type: 'Fusible web', images: ['Web.png', 'Web_Spec_Sheet-1.jpg'], top: true },

  // Accessories
  { code: 'Mobilin Tapes', handle: 'mobilin-tapes', collections: [C.ACCESSORIES], price: 210, type: 'Tape', images: ['2_d30c6e83-932f-44d8-b55a-b7c7342acec7.png', 'Tech_Spec_a632f2be-9f14-49fa-bcff-337ed3eb8c4d.png'] },
  { code: 'Arm Hole Tapes', handle: 'arm-hole-tapes', collections: [C.ACCESSORIES], price: 89, colors: ['White', 'Black'], extraOptions: [{ name: 'Tape', values: ['Single Sided', 'Double Sided'] }], type: 'Tape', images: ['Armhole_Tape.png', 'Sheet.png'] },
  { code: 'Arm Hole Tapes Laminated', handle: 'arm-hole-tapes-laminated', collections: [C.ACCESSORIES], price: 300, colors: ['White'], type: 'Tape', images: ['Sheet.png'] },
  { code: 'Bottom Fold Tapes', handle: 'bottom-fold-tapes', collections: [C.ACCESSORIES], price: 150, colors: ['White', 'Black'], type: 'Tape', images: ['Mobilin_Tape_Black_Color.png', 'Sheet.png'] },
];

// Swatch colours used for the variant picker.
export const SWATCHES = {
  White: '#FFFFFF',
  'Snow White': '#FBFCFF',
  Cream: '#EDE9DD',
  'Off White': '#F1EFE8',
  'Blue White': '#E3EAF3',
  Black: '#1B1B1B',
  Charcoal: '#4B5157',
};

function describe(row) {
  const primary = row.collections[0];

  if (primary === C.ACCESSORIES) {
    return [
      `${row.code} are finishing tapes used on the production line to stabilise edges, seams and hems so garments keep their shape after pressing and washing.`,
      'They are supplied on rolls for continuous use and can be combined with any Infuse interlining. Ask our team for sample lengths before placing a bulk order.',
    ];
  }

  const kind = row.type ? row.type.toLowerCase() : 'woven fusible';
  const weight = row.gsm ? ` with a weight of ${row.gsm} GSM` : '';
  const feel = row.feel ? `, ${FEEL_NOTE[row.feel]}` : '';
  const width = row.width ? ` It is supplied ${row.width.replace('"', ' inches')} wide` : ' It is supplied';
  const roll = row.length ? ` in ${row.length}-metre rolls.` : ' on full rolls.';

  return [
    `${row.code} is a ${kind} interlining${weight}${feel}. It is selected for ${USE[primary]}, giving the finished piece clean structure without stiffness showing through the outer fabric.`,
    `${width}${roll} We recommend a quick fusing test on your own fabric before starting production; a specification sheet with fusing guidance is sent with every order.`,
  ];
}

function buildVariants(row) {
  const options = [];
  if (row.colors?.length) options.push({ name: 'Color Variants', values: row.colors });
  if (row.length) options.push({ name: 'Length (Meters)', values: [row.length] });
  if (row.feel) options.push({ name: 'Hand Feel', values: [row.feel] });
  if (row.extraOptions) options.unshift(...row.extraOptions);
  return options;
}

export const products = ROWS.map((row) => {
  const handle = row.handle || row.code.toLowerCase();
  return {
    id: handle,
    handle,
    title: row.code,
    vendor: 'Fusibles',
    collections: row.collections,
    price: row.price,
    upcharge: row.upcharge || {},
    available: !row.soldOut,
    options: buildVariants(row),
    images: row.images,
    top: Boolean(row.top),
    specs: {
      Type: row.type || 'Woven fusible',
      ...(row.composition && { Composition: row.composition }),
      ...(row.gsm && { 'Weight (GSM)': row.gsm }),
      ...(row.width && { Width: row.width.replace('"', ' inches') }),
      ...(row.length && { 'Roll length': `${row.length} metres` }),
      ...(row.feel && { 'Hand feel': row.feel }),
      ...(row.colors && { Colours: row.colors.join(', ') }),
    },
    description: describe(row),
  };
});

const byHandle = new Map(products.map((p) => [p.handle, p]));

export function getProduct(handle) {
  return byHandle.get(String(handle).toLowerCase());
}

export function getProductsByCollection(collectionHandle) {
  return products.filter((p) => p.collections.includes(collectionHandle));
}

// "Top Products" on the home page, in the same order as the reference.
export const TOP_PRODUCTS = ['if1035hf', 'if2366', 'web', 'if2344'].map(getProduct);

/** Price for a specific selection (colour upcharges apply to Black etc.). */
export function getVariantPrice(product, selection = {}) {
  const color = selection['Color Variants'];
  return product.price + (product.upcharge[color] || 0);
}

export function getRelatedProducts(product, limit = 4) {
  const pool = getProductsByCollection(product.collections[0]).filter((p) => p.handle !== product.handle);
  return pool.slice(0, limit);
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [p.title, p.handle, ...p.collections, ...Object.values(p.specs)].join(' ').toLowerCase();
    return haystack.includes(q);
  });
}
