/** Format an AED amount the way the reference store does: "Dhs. 252.00 AED". */
export function formatMoney(amount, currency = { code: 'AED', symbol: 'Dhs.' }) {
  const value = Number(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${currency.symbol} ${value} ${currency.code}`;
}

/** Turn "Jackets & Blazers" into "jackets-blazers". */
export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Clamp a string to `max` characters on a word boundary, adding an ellipsis. */
export function truncate(text, max = 160) {
  if (!text || text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(' ', max))}…`;
}
