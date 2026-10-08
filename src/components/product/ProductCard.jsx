import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus } from 'lucide-react';
import Image from '../ui/Image';
import Price from './Price';
import { defaultSelection } from './ProductForm';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAccount } from '../../context/AccountContext';

function hasChoices(product) {
  return product.options.some((o) => o.values.length > 1);
}

/**
 * Product card: 5:4 image with hover zoom, Lora title, price and a
 * full-width pill action ("Choose options" opens quick add; single-variant
 * products add straight to the cart).
 */
function ProductCard({ product, onQuickAdd, priority = false, sizes }) {
  const { addItem } = useCart();
  const { open } = useUI();
  const { canSeePrices } = useAccount();
  const [added, setAdded] = useState(false);
  const url = `/products/${product.handle}`;
  const from = Object.keys(product.upcharge).length > 0;

  const quickAdd = () => {
    if (hasChoices(product)) {
      onQuickAdd?.(product);
      return;
    }
    addItem(product.handle, defaultSelection(product), 1);
    setAdded(true);
    open('cart');
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group relative flex h-full flex-col">
      <Link to={url} className="relative block overflow-hidden" aria-label={product.title} tabIndex={-1}>
        <Image
          src={product.images[0]}
          alt={`${product.title} – ${product.specs.Type.toLowerCase()} interlining`}
          ratio={5 / 4}
          priority={priority}
          sizes={sizes || '(min-width: 990px) 310px, (min-width: 750px) 45vw, 50vw'}
          widths={[300, 420, 620, 840]}
          imgClassName="transition-transform duration-[600ms] ease-out-slow group-hover:scale-[1.04]"
        />
        {!product.available && (
          <span className="absolute bottom-3 left-3 rounded-pill bg-[#121212] px-[14px] py-[4px] text-[13px] tracking-[0.9px] text-white md:bottom-[13px] md:left-[13px]">
            Sold out
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-[15px] md:pt-[19px]">
        <h3 className="h5 mb-[2px] text-ink">
          <Link to={url} className="hover:underline hover:underline-offset-[0.3rem]">
            {product.title}
          </Link>
        </h3>
        <Price amount={product.price} from={from} size="sm" className="mb-3" />

        {canSeePrices && (
          <div className="relative z-10 mt-auto">
            <button
              type="button"
              onClick={quickAdd}
              disabled={!product.available}
              className="btn btn-secondary w-full !min-h-[44px] !px-3 !text-[15px] md:!min-h-[54px] md:!text-btn"
              aria-label={`${hasChoices(product) ? 'Choose options for' : 'Add to cart:'} ${product.title}`}
            >
              {!product.available ? (
                'Sold out'
              ) : added ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" /> Added
                </>
              ) : hasChoices(product) ? (
                'Choose options'
              ) : (
                <>
                  <Plus className="h-4 w-4 md:hidden" aria-hidden="true" /> Add to cart
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default memo(ProductCard);
