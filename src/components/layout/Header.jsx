import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Logo from '../ui/Logo';
import Navigation from './Navigation';
import CountrySelector from './CountrySelector';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { useAccount } from '../../context/AccountContext';
import { useHeaderState } from '../../hooks/useHeaderVisibility';

const iconBtn =
  'relative inline-flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors duration-200 hover:bg-navy/[0.06] md:h-12 md:w-12';

function CartButton() {
  const { count } = useCart();
  const { open } = useUI();
  return (
    <button type="button" className={iconBtn} onClick={() => open('cart')} aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
      <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.4} aria-hidden="true" />
      {count > 0 && (
        <span
          key={count}
          className="absolute right-[3px] top-[4px] flex h-[18px] min-w-[18px] animate-fade-up items-center justify-center rounded-full bg-maroon px-1 text-[10.5px] font-medium leading-none text-white ring-2 ring-white"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

/**
 * Sticky header. Expanded state gives the brand mark real presence
 * (150px on desktop); after a short scroll the header eases into a compact
 * state — smaller logo, tighter rows, hairline shadow — while staying
 * visible. A thin maroon bar along the bottom tracks scroll progress.
 */
export default function Header() {
  const { overlay, open, toggle } = useUI();
  const { customer } = useAccount();
  const { compact, progressRef } = useHeaderState();
  const menuOpen = overlay === 'menu';

  return (
    <header
      data-compact={compact || undefined}
      className={`sticky top-[var(--announcement-height)] z-40 bg-white/95 backdrop-blur-[6px] transition-shadow duration-500 ${
        compact ? 'shadow-[0_8px_24px_-18px_rgb(4_44_100_/_0.45)]' : 'shadow-none'
      }`}
    >
      <div
        className={`page-width grid grid-cols-[1fr_auto_1fr] items-center transition-[padding] duration-500 ease-brand ${
          compact ? 'py-1.5 lg:py-1.5' : 'py-2.5 lg:pb-2 lg:pt-5'
        }`}
      >
        {/* Left: menu (mobile) · search + market (desktop) */}
        <div className="flex items-center gap-1 lg:gap-3">
          <button
            type="button"
            className={`${iconBtn} -ml-2 lg:hidden`}
            onClick={() => toggle('menu')}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-6 w-6" strokeWidth={1.4} /> : <Menu className="h-[25px] w-[25px]" strokeWidth={1.3} />}
          </button>
          <button type="button" className={`${iconBtn} -ml-3 hidden lg:inline-flex`} onClick={() => open('search')} aria-label="Search">
            <Search className="h-[22px] w-[22px]" strokeWidth={1.4} />
          </button>
          <span className="hidden h-5 w-px bg-navy/15 xl:block" aria-hidden="true" />
          <CountrySelector className="hidden xl:block" align="left" />
        </div>

        {/* Logo */}
        <div className="flex justify-center px-4 leading-none">
          <Logo imgClassName={compact ? 'w-[80px] lg:w-[96px]' : 'w-[104px] md:w-[124px] lg:w-[150px]'} />
        </div>

        {/* Right */}
        <div className="flex items-center justify-end gap-0.5 lg:gap-2">
          <CountrySelector className="mr-1 hidden lg:block xl:hidden" compact />
          <button type="button" className={`${iconBtn} lg:hidden`} onClick={() => open('search')} aria-label="Search">
            <Search className="h-[22px] w-[22px]" strokeWidth={1.4} />
          </button>
          <Link to="/account" className={`${iconBtn} hidden lg:inline-flex`} aria-label={customer ? 'Account' : 'Log in'}>
            <User className="h-[22px] w-[22px]" strokeWidth={1.4} />
          </Link>
          <div className="-mr-2 lg:-mr-3">
            <CartButton />
          </div>
        </div>
      </div>

      <Navigation compact={compact} />

      {/* Reading progress */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-navy/[0.06]" aria-hidden="true">
        <div ref={progressRef} className="h-full origin-left scale-x-0 bg-maroon will-change-transform" />
      </div>
    </header>
  );
}
