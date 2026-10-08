import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MAIN_NAV } from '../../data/site';
import { useClickOutside } from '../../hooks/useClickOutside';

const linkBase = 'inline-flex items-center p-[13.8px] text-nav text-navy/75 transition-colors hover:text-navy';
const activeUnderline = 'underline underline-offset-[0.3rem] decoration-1 text-navy';

/** "Shop Now" dropdown: opens on hover (with intent delay), click or keyboard. */
function DropdownItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timer = useRef(0);
  const { pathname } = useLocation();
  const isActive = item.children.some((c) => pathname.startsWith(c.to));

  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  useEffect(() => close(), [pathname, close]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const enter = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), 80);
  };
  const leave = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 160);
  };

  return (
    <li ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className={`${linkBase} gap-1.5 ${open || isActive ? 'text-navy' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={open || isActive ? activeUnderline : 'hover:underline hover:underline-offset-[0.3rem]'}>
          {item.label}
        </span>
        <ChevronDown
          className={`h-[14px] w-[14px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <m.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 top-full z-40 w-[230px] border border-line bg-white py-[18px] shadow-popup"
          >
            {item.children.map((child) => (
              <li key={child.to}>
                <NavLink
                  to={child.to}
                  className={({ isActive: a }) =>
                    `block px-[23px] py-[8px] text-nav leading-[1.3] transition-colors hover:text-ink hover:underline hover:underline-offset-[0.3rem] ${
                      a ? 'text-ink underline underline-offset-[0.3rem]' : 'text-ink-soft'
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Centered desktop menu row (≥990px). */
export default function Navigation() {
  return (
    <nav aria-label="Main" className="hidden pb-1 lg:mt-2 lg:block">
      <ul className="flex flex-wrap items-center justify-center">
        {MAIN_NAV.map((item) =>
          item.children ? (
            <DropdownItem key={item.label} item={item} />
          ) : (
            <li key={item.label}>
              <NavLink to={item.to} end className={linkBase}>
                {({ isActive }) => (
                  <span className={isActive ? activeUnderline : 'hover:underline hover:underline-offset-[0.3rem]'}>
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
