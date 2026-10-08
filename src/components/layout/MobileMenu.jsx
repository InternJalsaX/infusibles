import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowLeft, ChevronRight, Instagram, Linkedin, Search, User } from 'lucide-react';
import { MAIN_NAV, SITE } from '../../data/site';
import { useUI } from '../../context/UIContext';
import { useAccount } from '../../context/AccountContext';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import CountrySelector from './CountrySelector';

const itemClass =
  'flex w-full items-center justify-between px-[24px] py-[12px] text-left text-[19px] tracking-[0.69px] text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ink md:px-[34.5px] md:text-[20.7px]';

const SOCIAL_ICONS = { instagram: Instagram, linkedin: Linkedin };

/**
 * Mobile navigation drawer. Opens beneath the header (the header's
 * hamburger turns into a close button), with an inline search field,
 * a sliding "Shop Now" submenu and account/country controls at the bottom.
 */
export default function MobileMenu() {
  const { overlay, close } = useUI();
  const { customer } = useAccount();
  const open = overlay === 'menu';
  const [submenu, setSubmenu] = useState(null);
  const [query, setQuery] = useState('');
  const [top, setTop] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useLockBodyScroll(open);

  // Sit flush under the (sticky) header, whatever its current height.
  useEffect(() => {
    if (!open) return undefined;
    const measure = () => setTop(document.querySelector('header')?.getBoundingClientRect().bottom ?? 0);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [open]);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) setSubmenu(null);
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 z-30 lg:hidden"
          style={{ top }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/30" onClick={close} aria-hidden="true" />
          <m.nav
            aria-label="Mobile"
            className="relative flex h-full w-full flex-col overflow-hidden bg-white sm:max-w-[400px]"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="relative flex-1 overflow-y-auto overflow-x-hidden pt-3">
              <form onSubmit={submit} role="search" className="px-[24px] pb-3 md:px-[34.5px]">
                <label htmlFor="mobile-search" className="sr-only">
                  Search products
                </label>
                <div className="flex h-[48px] items-center border border-line-strong">
                  <input
                    id="mobile-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="h-full flex-1 bg-transparent px-4 text-[16px] text-ink outline-none placeholder:text-ink/50"
                  />
                  <button type="submit" className="flex h-full w-12 items-center justify-center text-navy" aria-label="Submit search">
                    <Search className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>
              </form>

              <AnimatePresence initial={false} mode="popLayout">
                {!submenu ? (
                  <m.ul
                    key="root"
                    initial={{ x: '-30%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-30%', opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="py-2"
                  >
                    {MAIN_NAV.map((item) => (
                      <li key={item.label}>
                        {item.children ? (
                          <button type="button" className={itemClass} onClick={() => setSubmenu(item)} aria-expanded="false">
                            {item.label}
                            <ChevronRight className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
                          </button>
                        ) : (
                          <NavLink
                            to={item.to}
                            end
                            className={({ isActive }) => `${itemClass} ${isActive ? 'bg-ink/[0.04] text-ink' : ''}`}
                          >
                            {item.label}
                          </NavLink>
                        )}
                      </li>
                    ))}
                  </m.ul>
                ) : (
                  <m.div
                    key="sub"
                    initial={{ x: '40%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '40%', opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="py-2"
                  >
                    <button type="button" className={`${itemClass} justify-start gap-3`} onClick={() => setSubmenu(null)}>
                      <ArrowLeft className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
                      {submenu.label}
                    </button>
                    <ul>
                      {submenu.children.map((child) => (
                        <li key={child.to}>
                          <NavLink to={child.to} className={({ isActive }) => `${itemClass} ${isActive ? 'bg-ink/[0.04] text-ink' : ''}`}>
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-line bg-ink/[0.03] px-[24px] pb-6 pt-4 md:px-[34.5px]">
              <NavLink to="/account" className="mb-1 inline-flex items-center gap-3 py-2 text-[16px] text-ink-soft hover:text-ink">
                <User className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                {customer ? `Hi, ${customer.firstName || 'there'}` : 'Log in'}
              </NavLink>
              <CountrySelector placement="up" align="left" />
              <ul className="mt-2 flex gap-4" aria-label="Social">
                {SITE.social.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon];
                  return (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex p-1 text-ink-soft hover:text-ink" aria-label={s.label}>
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </m.nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}
