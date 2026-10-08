import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import QuantitySelector from '../ui/QuantitySelector';
import VariantPicker from './VariantPicker';
import Price from './Price';
import { getVariantPrice } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAccount } from '../../context/AccountContext';

export function defaultSelection(product) {
  return Object.fromEntries(product.options.map((o) => [o.name, o.values[0]]));
}

/**
 * Price, options, quantity and purchase buttons for a product.
 * Shared by the product page and the quick-add modal.
 */
export default function ProductForm({ product, onAdded, showBuyNow = true }) {
  const id = useId();
  const [selection, setSelection] = useState(() => defaultSelection(product));
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('idle'); // idle | adding | added
  const { addItem } = useCart();
  const { open } = useUI();
  const { canSeePrices } = useAccount();

  const price = useMemo(() => getVariantPrice(product, selection), [product, selection]);

  const add = (openCart = true) => {
    setStatus('adding');
    // Short delay gives tactile feedback, mirroring a network round-trip.
    window.setTimeout(() => {
      addItem(product.handle, selection, quantity);
      setStatus('added');
      onAdded?.();
      if (openCart) open('cart');
      window.setTimeout(() => setStatus('idle'), 1600);
    }, 250);
  };

  const buyNow = () => {
    addItem(product.handle, selection, quantity);
    onAdded?.();
  };

  return (
    <div>
      <Price amount={price} size="lg" className="mb-1 inline-block" />
      <p className="mb-5 text-[14px] tracking-[0.5px] text-ink/70">
        <Link to="/policies/shipping-policy" className="underline underline-offset-2 hover:text-ink">
          Shipping
        </Link>{' '}
        calculated at checkout.
      </p>

      {product.options.length > 0 && (
        <VariantPicker
          idPrefix={id}
          options={product.options}
          selection={selection}
          onChange={(name, value) => setSelection((s) => ({ ...s, [name]: value }))}
        />
      )}

      <div className="mt-5">
        <label htmlFor={`${id}-qty`} className="mb-2 block text-[15px] tracking-[0.69px] text-ink/75">
          Quantity
        </label>
        <QuantitySelector id={`${id}-qty`} value={quantity} onChange={setQuantity} />
      </div>

      {canSeePrices && (
        <div className="mt-6 max-w-[440px] space-y-2.5">
          {product.available ? (
            <>
              <Button variant="secondary" fullWidth onClick={() => add(true)} disabled={status === 'adding'} aria-live="polite">
                {status === 'adding' && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
                {status === 'added' && <Check className="h-5 w-5" aria-hidden="true" />}
                {status === 'added' ? 'Added to cart' : 'Add to cart'}
              </Button>
              {showBuyNow && (
                <Button to="/cart" fullWidth onClick={buyNow}>
                  Buy it now
                </Button>
              )}
            </>
          ) : (
            <Button variant="secondary" fullWidth disabled>
              Sold out
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
