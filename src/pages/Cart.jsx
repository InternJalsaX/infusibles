import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import CartLineItem from '../components/cart/CartLineItem';
import CheckoutNotice from '../components/cart/CheckoutNotice';
import ProductGrid from '../components/product/ProductGrid';
import { useCart } from '../context/CartContext';
import { useLocale } from '../context/LocaleContext';
import { useAccount } from '../context/AccountContext';
import { TOP_PRODUCTS } from '../data/products';
import { useSeo } from '../hooks/useSeo';

export default function Cart() {
  const { items, subtotal, clear } = useCart();
  const { format } = useLocale();
  const { customer } = useAccount();
  const [note, setNote] = useState('');
  const [checkingOut, setCheckingOut] = useState(false);

  useSeo({ title: 'Your Shopping Cart', path: '/cart' });

  if (!items.length) {
    return (
      <>
        <section className="page-width py-16 text-center md:py-[90px]">
          <h1 className="h1 mb-7 text-ink-soft md:mb-[34px]">Your cart is empty</h1>
          <Button to="/collections/all">Continue shopping</Button>
          {!customer && (
            <div className="mt-14 md:mt-[70px]">
              <h2 className="h2 mb-2 text-ink-soft">Have an account?</h2>
              <p className="text-ink-body">
                <Link to="/account" className="text-ink underline underline-offset-4">
                  Log in
                </Link>{' '}
                to check out faster.
              </p>
            </div>
          )}
        </section>
        <section className="page-width border-t border-line pb-16 pt-10 md:pt-[50px]" aria-labelledby="popular-title">
          <h2 id="popular-title" className="h2 mb-6 text-ink md:mb-[34.5px]">
            Top Products
          </h2>
          <ProductGrid products={TOP_PRODUCTS} />
        </section>
      </>
    );
  }

  return (
    <section className="page-width pb-16 pt-8 md:pb-[80px] md:pt-[46px]">
      <div className="mb-6 flex items-end justify-between gap-4 md:mb-10">
        <h1 className="h1 text-ink">Your cart</h1>
        <Link to="/collections/all" className="text-[16px] text-ink underline underline-offset-4 hover:text-navy">
          Continue shopping
        </Link>
      </div>

      <div className="hidden grid-cols-[1fr_auto] border-b border-line pb-3 text-[13px] uppercase tracking-[1.3px] text-ink/60 md:grid">
        <span>Product</span>
        <span>Total</span>
      </div>
      <ul>
        {items.map((item) => (
          <CartLineItem key={item.key} item={item} />
        ))}
      </ul>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <label htmlFor="cart-note" className="mb-2 block text-[15px] text-ink/75">
            Order special instructions
          </label>
          <textarea
            id="cart-note"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full max-w-[460px] border border-line-strong bg-transparent p-4 text-[16px] text-ink outline-none focus:shadow-[0_0_0_1px_rgb(17_17_17_/_0.55)]"
          />
          <button type="button" onClick={clear} className="mt-3 block text-[14px] text-ink/70 underline underline-offset-4 hover:text-maroon">
            Clear cart
          </button>
        </div>
        <div className="md:justify-self-end md:text-right">
          <p className="mb-1 flex items-baseline justify-between gap-6 md:justify-end">
            <span className="font-heading text-[20px] text-ink">Estimated total</span>
            <span className="text-[18px] text-ink">{format(subtotal)}</span>
          </p>
          <p className="mb-6 text-[14px] text-ink/60">Taxes, discounts and shipping calculated at checkout.</p>
          <Button onClick={() => setCheckingOut(true)} className="w-full md:w-[360px]">
            Check out
          </Button>
        </div>
      </div>
      <CheckoutNotice open={checkingOut} onClose={() => setCheckingOut(false)} note={note} />
    </section>
  );
}
