// Image URL helpers. Photography is served from the store's Shopify CDN,
// which resizes on the fly via the `width` query param — that lets every
// <img> ship a proper srcset without bundling large files.

const CDN = 'https://cdn.shopify.com/s/files/1/0943/5453/8806';

const DEFAULT_WIDTHS = [360, 540, 720, 960, 1280, 1600, 1920];

/** Absolute URL for a store file (`files/…`) or article image (`articles/…`). */
export function cdnUrl(path, width) {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  const folder = path.startsWith('articles/') ? '' : 'files/';
  const url = `${CDN}/${folder}${path}`;
  return width ? `${url}?width=${width}` : url;
}

/** `srcset` string for the given widths, capped at the source's intrinsic width. */
export function cdnSrcSet(path, widths = DEFAULT_WIDTHS, maxWidth = Infinity) {
  if (!path || /^https?:\/\//.test(path)) return undefined;
  const list = widths.filter((w) => w <= maxWidth);
  if (!list.length) list.push(Math.min(widths[0], maxWidth));
  return list.map((w) => `${cdnUrl(path, w)} ${w}w`).join(', ');
}
