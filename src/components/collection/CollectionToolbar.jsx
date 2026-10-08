import { useCallback, useId, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import Drawer from '../ui/Drawer';
import Button from '../ui/Button';
import { SORT_OPTIONS } from './filters';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useLocale } from '../../context/LocaleContext';

function Checkbox({ label, count, checked, onChange, disabled }) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 py-1.5 text-[15px] text-ink ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="h-4 w-4 accent-ink" />
      <span>
        {label} <span className="text-ink/55">({count})</span>
      </span>
    </label>
  );
}

function PriceRange({ filters, maxPrice, onChange }) {
  const { currency } = useLocale();
  const [min, setMin] = useState(filters.min ?? '');
  const [max, setMax] = useState(filters.max ?? '');
  const commit = () => onChange({ min: min === '' ? null : Number(min), max: max === '' ? null : Number(max) });

  return (
    <div>
      <p className="mb-3 text-[14px] text-ink/65">
        The highest price is {currency.symbol} {maxPrice.toFixed(2)}
      </p>
      <div className="flex items-center gap-3">
        {[
          ['From', min, setMin],
          ['To', max, setMax],
        ].map(([label, value, set]) => (
          <label key={label} className="flex flex-1 items-center gap-2 text-[15px] text-ink/70">
            <span className="shrink-0">{currency.symbol}</span>
            <input
              type="number"
              min="0"
              max={maxPrice}
              inputMode="decimal"
              placeholder={label === 'From' ? '0' : String(maxPrice)}
              value={value}
              onChange={(e) => set(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => e.key === 'Enter' && commit()}
              aria-label={`${label} price`}
              className="h-[42px] w-full min-w-0 border border-line-strong bg-transparent px-3 text-ink outline-none focus:shadow-[0_0_0_1px_rgb(17_17_17_/_0.55)]"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function buildFilterGroups({ filters, counts, setParam }) {
  const toggleValue = (key, value) => {
    const list = filters[key].includes(value) ? filters[key].filter((v) => v !== value) : [...filters[key], value];
    setParam({ [key]: list });
  };
  return {
    availability: (
      <div>
        <Checkbox label="In stock" count={counts.inStock} checked={filters.availability.includes('in')} onChange={() => toggleValue('availability', 'in')} disabled={!counts.inStock} />
        <Checkbox label="Out of stock" count={counts.outOfStock} checked={filters.availability.includes('out')} onChange={() => toggleValue('availability', 'out')} disabled={!counts.outOfStock} />
      </div>
    ),
    feel: counts.feels.length ? (
      <div>
        {counts.feels.map(([feel, n]) => (
          <Checkbox key={feel} label={feel} count={n} checked={filters.feel.includes(feel)} onChange={() => toggleValue('feel', feel)} />
        ))}
      </div>
    ) : null,
    price: <PriceRange key={`${filters.min}-${filters.max}`} filters={filters} maxPrice={counts.maxPrice} onChange={setParam} />,
  };
}

function Popover({ label, active, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const id = useId();
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="inline-flex items-center gap-2 py-2 text-[16px] tracking-[0.69px] text-ink/75 underline-offset-[0.3rem] hover:text-ink hover:underline"
      >
        {label}
        {active > 0 && <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] text-white">{active}</span>}
        <ChevronDown className={`h-[14px] w-[14px] transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id={id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 top-full z-30 mt-1 w-[320px] border border-line bg-white p-5 shadow-popup"
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Collection filter + sort bar. Inline popovers on desktop, a "Filter and
 * sort" drawer on mobile. State lives in the URL so results are shareable.
 */
export default function CollectionToolbar({ filters, counts, total, setParam, clearAll }) {
  const [drawer, setDrawer] = useState(false);
  const groups = buildFilterGroups({ filters, counts, setParam });
  const priceActive = filters.min != null || filters.max != null ? 1 : 0;

  const chips = [
    ...filters.availability.map((v) => ({ key: `availability-${v}`, label: v === 'in' ? 'In stock' : 'Out of stock', remove: () => setParam({ availability: filters.availability.filter((x) => x !== v) }) })),
    ...filters.feel.map((v) => ({ key: `feel-${v}`, label: v, remove: () => setParam({ feel: filters.feel.filter((x) => x !== v) }) })),
    ...(priceActive ? [{ key: 'price', label: `Price: ${filters.min ?? 0} – ${filters.max ?? counts.maxPrice}`, remove: () => setParam({ min: null, max: null }) }] : []),
  ];

  const sortSelect = (id) => (
    <div className="relative">
      <select
        id={id}
        value={filters.sort}
        onChange={(e) => setParam({ sort: e.target.value === 'featured' ? null : e.target.value })}
        className="h-[40px] cursor-pointer appearance-none bg-transparent pl-2 pr-9 text-[16px] tracking-[0.69px] text-ink/75 outline-none hover:text-ink"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-ink/70" strokeWidth={1.5} aria-hidden="true" />
    </div>
  );

  return (
    <div className="mb-6 md:mb-[26px]">
      {/* Desktop */}
      <div className="hidden items-center justify-between gap-6 md:flex">
        <div className="flex items-center gap-6">
          <span className="text-[16px] tracking-[0.69px] text-ink/75">Filter:</span>
          <Popover label="Availability" active={filters.availability.length}>
            {groups.availability}
          </Popover>
          {groups.feel && (
            <Popover label="Hand feel" active={filters.feel.length}>
              {groups.feel}
            </Popover>
          )}
          <Popover label="Price" active={priceActive}>
            {groups.price}
          </Popover>
        </div>
        <div className="flex items-center gap-6">
          <label htmlFor="sort-desktop" className="flex items-center gap-2 text-[16px] tracking-[0.69px] text-ink/75">
            Sort by: {sortSelect('sort-desktop')}
          </label>
          <p className="text-[16px] tracking-[0.69px] text-ink/75" role="status">
            {total} {total === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden">
        <button type="button" onClick={() => setDrawer(true)} className="inline-flex items-center gap-2 py-2 text-[15px] text-ink">
          <SlidersHorizontal className="h-[18px] w-[18px]" strokeWidth={1.4} aria-hidden="true" />
          Filter and sort
          {chips.length > 0 && <span className="text-ink/60">({chips.length})</span>}
        </button>
        <p className="text-[14px] text-ink/70" role="status">
          {total} {total === 1 ? 'product' : 'products'}
        </p>
      </div>

      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <button key={chip.key} type="button" onClick={chip.remove} className="inline-flex items-center gap-1.5 rounded-pill border border-line-strong/50 px-3 py-1 text-[14px] text-ink hover:border-ink">
              {chip.label}
              <X className="h-3.5 w-3.5" strokeWidth={1.5} aria-label="Remove filter" />
            </button>
          ))}
          <button type="button" onClick={clearAll} className="px-2 text-[14px] text-ink underline underline-offset-4">
            Remove all
          </button>
        </div>
      )}

      <Drawer open={drawer} onClose={() => setDrawer(false)} side="right" label="Filter and sort" className="w-full max-w-[380px]">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="font-heading text-[20px] text-ink">Filter and sort</p>
            <p className="text-[13px] text-ink/60">
              {total} {total === 1 ? 'product' : 'products'}
            </p>
          </div>
          <button type="button" onClick={() => setDrawer(false)} className="inline-flex h-11 w-11 items-center justify-center" aria-label="Close filters">
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <section>
            <h3 className="mb-2 font-body text-[15px] font-medium text-ink">Availability</h3>
            {groups.availability}
          </section>
          {groups.feel && (
            <section>
              <h3 className="mb-2 font-body text-[15px] font-medium text-ink">Hand feel</h3>
              {groups.feel}
            </section>
          )}
          <section>
            <h3 className="mb-2 font-body text-[15px] font-medium text-ink">Price</h3>
            {groups.price}
          </section>
          <section>
            <label htmlFor="sort-mobile" className="mb-1 block font-body text-[15px] font-medium text-ink">
              Sort by
            </label>
            <div className="border border-line-strong">{sortSelect('sort-mobile')}</div>
          </section>
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-line p-5">
          <Button variant="secondary" onClick={clearAll} className="!min-h-[46px] !px-3 !text-[15px]">
            Remove all
          </Button>
          <Button onClick={() => setDrawer(false)} className="!min-h-[46px] !px-3 !text-[15px]">
            Apply
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
