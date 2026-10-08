import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Logo from '../ui/Logo';
import Navigation from './Navigation';
import CountrySelector from './CountrySelector';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { useAccount } from '../../context/AccountContext';
import { useHeaderVisibility } from '../../hooks/useHeaderVisibility';

const iconBtn =
  'relative inline-flex h-[51px] w-[51px] items-center justify-center text-navy transition-transform duration-200 hover:scale-[1.07]';

function CartButton() {
  const { count } = useCart();
  const { open } = useUI();
  return (
    <button type="button" className={iconBtn} onClick={() => open('cart')} aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
      <ShoppingBag className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
      {count > 0 && (
        <span className="absolute bottom-[9px] right-[8px] flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-navy px-1 text-[11px] font-medium leading-none text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

/**
 * Header: logo centred on top, menu centred below (desktop); hamburger,
 * logo, search and cart on mobile. Hides while scrolling down and returns
 * on scroll up, like the reference store.
 */
export default function Header() {
  const { overlay, open, toggle } = useUI();
  const { customer } = useAccount();
  const { hidden } = useHeaderVisibility();
  const menuOpen = overlay === 'menu';

  return (
    <header
      className={`sticky top-[var(--announcement-height)] z-40 border-b border-line/0 bg-white transition-transform duration-300 ease-out ${
        hidden && !overlay ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="page-width grid grid-cols-[1fr_auto_1fr] items-center py-0.5 pl-[21px] pr-[29px] md:px-gutter-lg lg:py-1">
        {/* Left */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={`${iconBtn} lg:hidden`}
            onClick={() => toggle('menu')}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-6 w-6" strokeWidth={1.4} /> : <Menu className="h-[26px] w-[26px]" strokeWidth={1.3} />}
          </button>
          <button type="button" className={`${iconBtn} hidden lg:inline-flex`} onClick={() => open('search')} aria-label="Search">
            <Search className="h-6 w-6" strokeWidth={1.4} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center leading-none">
          <Logo width={90} />
        </div>

        {/* Right */}
        <div className="flex items-center justify-end gap-0 lg:gap-1">
          <CountrySelector className="mr-2 hidden xl:block" />
          <CountrySelector className="mr-1 hidden lg:block xl:hidden" compact />
          <button type="button" className={`${iconBtn} lg:hidden`} onClick={() => open('search')} aria-label="Search">
            <Search className="h-6 w-6" strokeWidth={1.4} />
          </button>
          <Link to="/account" className={`${iconBtn} hidden lg:inline-flex`} aria-label={customer ? 'Account' : 'Log in'}>
            <User className="h-6 w-6" strokeWidth={1.4} />
          </Link>
          <div className="lg:-mr-[5px]">
            <CartButton />
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
}
