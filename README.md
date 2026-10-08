# Infuse – fusibles.ae rebuild

React 18 + Vite 5 + Tailwind CSS 3 rebuild of the Infuse interlinings storefront.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

```
src/
  components/   layout (header, nav, menus, footer), product, cart, collection, home, sections, ui
  context/      cart, locale (country/currency), account, UI overlays
  data/         site config, products, collections, content, FAQs, blog, policies
  hooks/        localStorage, SEO, scroll lock, header visibility, click-outside
  layouts/      RootLayout (announcement bar, header, drawers, footer)
  lib/          image + formatting helpers
  pages/        one file per route
  styles/       Tailwind layers (typography scale, buttons, fields)
```

Design tokens (colours, type scale, breakpoints, spacing) live in `tailwind.config.js`.

## Configuration

- `src/data/site.js` → `STORE_CONFIG.requireLoginForPrice`: set to `true` to restore the live store's
  "Login | Register to see price" gate (signing in on `/account` unlocks prices).
- Images are served from the store's Shopify CDN via `src/lib/images.js`. To self-host, point `CDN`
  at your own image host using the same file names.
- All copy (descriptions, FAQ answers, articles, policies) is in `src/data/` — policies should be
  reviewed before launch.

## Notes

There is no backend: the cart persists in `localStorage`, checkout sends the order summary to the
sales team via WhatsApp or email, the contact form opens the visitor's mail app, and the account area
is a front-end session (passwords are never stored).
