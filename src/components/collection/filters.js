// Pure helpers for collection filtering/sorting driven by URL search params.

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best selling' },
  { value: 'title-asc', label: 'Alphabetically, A-Z' },
  { value: 'title-desc', label: 'Alphabetically, Z-A' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price, high to low' },
];

// Proxy "best selling" ranking: top products first, then in-stock by price.
function bestSellingScore(p) {
  return (p.top ? 0 : 1000) + (p.available ? 0 : 500) + p.price / 10;
}

export function readFilters(params) {
  return {
    availability: params.getAll('availability'),
    feel: params.getAll('feel'),
    min: params.get('min') ? Number(params.get('min')) : null,
    max: params.get('max') ? Number(params.get('max')) : null,
    sort: params.get('sort') || 'featured',
  };
}

export function applyFilters(products, f) {
  let list = products.filter((p) => {
    if (f.availability.length === 1) {
      if (f.availability[0] === 'in' && !p.available) return false;
      if (f.availability[0] === 'out' && p.available) return false;
    }
    if (f.feel.length && !f.feel.includes(p.specs['Hand feel'])) return false;
    if (f.min != null && p.price < f.min) return false;
    if (f.max != null && p.price > f.max) return false;
    return true;
  });

  const by = {
    'title-asc': (a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }),
    'title-desc': (a, b) => b.title.localeCompare(a.title, undefined, { numeric: true }),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'best-selling': (a, b) => bestSellingScore(a) - bestSellingScore(b),
  }[f.sort];

  if (by) list = [...list].sort(by);
  return list;
}

export function facetCounts(products) {
  const feels = new Map();
  products.forEach((p) => {
    const feel = p.specs['Hand feel'];
    if (feel) feels.set(feel, (feels.get(feel) || 0) + 1);
  });
  return {
    inStock: products.filter((p) => p.available).length,
    outOfStock: products.filter((p) => !p.available).length,
    feels: [...feels.entries()].sort((a, b) => a[0].localeCompare(b[0])),
    maxPrice: Math.ceil(Math.max(0, ...products.map((p) => p.price))),
  };
}
