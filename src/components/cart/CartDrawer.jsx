import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';
import Drawer from '../ui/Drawer';
import Button from '../ui/Button';
import CartLineItem from './CartLineItem';
import CheckoutNotice from './CheckoutNotice';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { useLocale } from '../../context/LocaleContext';
import { SHOP_MENU } from '../../data/site';

/** Slide-in cart from the right with line items, subtotal and actions. */
export default function CartDrawer() {
  const { overlay, close } = useUI();
  const { items, count, subtotal } = useCart();
  const { format } = useLocale();
  const [checkingOut, setCheckingOut] = useState(false);
  const open = overlay === 'cart';

  return (
    <Drawer open={open} onClose={close} side="right" label="Your cart" className="w-full max-w-[440px]">
      <div className="flex items-center justify-between border-b border-line px-6 py-5">
        <h2 className="h3 text-ink">
          Your cart {count > 0 && <span className="font-body text-[15px] text-ink/60">({count})</span>}
        </h2>
        <button type="button" onClick={close} className="inline-flex h-11 w-11 items-center justify-center text-ink hover:scale-110" aria-label="Close cart">
          <X className="h-6 w-6" strokeWidth={1.3} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center">
          <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-muted text-navy">
            <ShoppingBag className="h-9 w-9" strokeWidth={1.2} aria-hidden="true" />
          </span>
          <p className="h3 mb-2 text-ink">Your cart is empty</p>
          <p className="mb-7 max-w-[300px] text-[15px] text-ink/65">
            Browse our interlinings by garment type, or ask our team for samples and bulk pricing.
          </p>
          <Button onClick={close} to="/collections/arabic-thobe-interlinings">
            Continue shopping
          </Button>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[14px]">
            {SHOP_MENU.slice(0, 4).map((c) => (
              <li key={c.to}>
                <Link to={c.to} onClick={close} className="text-navy underline-offset-4 hover:underline">
                  {c.label.replace(' Interlinings', '')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <ul className="flex-1 overflow-y-auto px-6">
            {items.map((item) => (
              <CartLineItem key={item.key} item={item} compact onNavigate={close} />
            ))}
          </ul>
          <div className="border-t border-line bg-white px-6 pb-6 pt-5">
            <div className="mb-1 flex items-baseline justify-between">
              <span className="font-heading text-[19px] text-ink">Subtotal</span>
              <span className="text-[17px] text-ink">{format(subtotal)}</span>
            </div>
            <p className="mb-5 text-[13.5px] text-ink/60">Taxes and shipping calculated at checkout.</p>
            <Button fullWidth onClick={() => setCheckingOut(true)}>
              Check out
            </Button>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button variant="secondary" to="/cart" onClick={close} className="!min-h-[46px] !px-4 !text-[15px]">
                View cart
              </Button>
              <Button variant="secondary" onClick={close} className="!min-h-[46px] !px-4 !text-[15px]">
                Continue shopping
              </Button>
            </div>
          </div>
        </>
      )}
      <CheckoutNotice open={checkingOut} onClose={() => setCheckingOut(false)} />
    </Drawer>
  );
}
