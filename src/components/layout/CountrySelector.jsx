import { useCallback, useId, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import { useClickOutside } from '../../hooks/useClickOutside';

/**
 * Country / currency picker ("United Arab Emirates | AED د.إ").
 * placement: 'down' for the header, 'up' for the mobile drawer footer.
 */
export default function CountrySelector({ placement = 'down', align = 'right', className = '', compact = false }) {
  const { country, countries, currency, setCountry } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const listId = useId();

  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  const choose = (code) => {
    setCountry(code);
    setOpen(false);
  };

  const onListKey = (event) => {
    const items = [...event.currentTarget.querySelectorAll('button')];
    const index = items.indexOf(document.activeElement);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    }
  };

  const position = `${placement === 'up' ? 'bottom-full mb-2' : 'top-full mt-1'} ${align === 'right' ? 'right-0' : 'left-0'}`;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <h2 className="sr-only">Country/region</h2>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={listId}
        className="group inline-flex items-center gap-2 py-[11px] text-nav text-navy transition-colors hover:text-navy/80"
      >
        <span className={compact ? 'max-w-[150px] truncate' : ''}>
          {country.name} | {currency.label}
        </span>
        <ChevronDown
          className={`h-[14px] w-[14px] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={listId}
            initial={{ opacity: 0, y: placement === 'up' ? 6 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === 'up' ? 6 : -6 }}
            transition={{ duration: 0.18 }}
            className={`absolute z-50 w-[280px] max-w-[calc(100vw-34px)] border border-line bg-white py-2 shadow-popup ${position}`}
          >
            <ul className="scroll-thin max-h-[316px] overflow-y-auto" role="listbox" aria-label="Country/region" onKeyDown={onListKey}>
              {countries.map((c) => {
                const active = c.code === country.code;
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => choose(c.code)}
                      className={`flex w-full items-center gap-2.5 px-4 py-[9px] text-left text-[15px] tracking-[0.5px] transition-colors hover:bg-surface-subtle focus:bg-surface-subtle focus:outline-none ${
                        active ? 'text-ink' : 'text-ink-soft'
                      }`}
                    >
                      <Check className={`h-4 w-4 shrink-0 ${active ? 'opacity-100' : 'opacity-0'}`} strokeWidth={1.75} aria-hidden="true" />
                      <span className="flex-1">{c.name}</span>
                      <span className="text-[13px] text-ink/50">{currency.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
