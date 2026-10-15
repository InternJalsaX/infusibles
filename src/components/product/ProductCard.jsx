import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import Image from '../ui/Image';
import Price from './Price';
import { defaultSelection } from './ProductForm';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useAccount } from '../../context/AccountContext';

const NOT_A_PHOTO = /spec|sheet|page-0001|IFABX30\.jpg/i;

function hasChoices(product) {
  return product.options.some((o) => o.values.length > 1);
}

/** A second real product photo (never a spec sheet or placeholder), if one exists. */
function alternatePhoto(product) {
  return product.images.slice(1).find((src) => !NOT_A_PHOTO.test(src));
}

/**
 * Product card. Hover (or focus) eases the photo in, crossfades to the
 * second product photo where one exists, and slides up a "View details"
 * bar. Spec line, title and price stay fully legible; the action button
 * remains visible for touch users, so nothing depends on hover.
 */
function ProductCard({ product, onQuickAdd, priority = false, sizes }) {
  const { addItem } = useCart();
  const { open } = useUI();
  const { canSeePrices } = useAccount();
  const [added, setAdded] = useState(false);
  const url = `/products/${product.handle}`;
  const from = Object.keys(product.upcharge).length > 0;
  const alt = alternatePhoto(product);
  const meta = [product.specs.Type, product.specs['Weight (GSM)'] && `${product.specs['Weight (GSM)']} GSM`].filter(Boolean).join(' · ');
  const imgSizes = sizes || '(min-width: 990px) 310px, (min-width: 750px) 45vw, 50vw';

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
      <Link
        to={url}
        className="relative block overflow-hidden bg-surface-subtle ring-1 ring-inset ring-ink/[0.04] transition-shadow duration-500 ease-brand group-hover:shadow-[0_22px_40px_-24px_rgb(4_44_100_/_0.55)]"
        aria-label={`${product.title} – view details`}
      >
        <Image
          src={product.images[0]}
          alt={`${product.title} – ${product.specs.Type.toLowerCase()} interlining`}
          ratio={5 / 4}
          priority={priority}
          sizes={imgSizes}
          widths={[300, 420, 620, 840]}
          imgClassName="transition-transform duration-700 ease-brand group-hover:scale-[1.06]"
        />
        {alt && (
          <Image
            src={alt}
            alt=""
            fill
            sizes={imgSizes}
            widths={[300, 420, 620, 840]}
            className="opacity-0 transition-opacity duration-500 ease-brand group-hover:opacity-100"
            imgClassName="scale-[1.04] transition-transform duration-700 ease-brand group-hover:scale-100"
          />
        )}
        {!product.available && (
          <span className="absolute left-3 top-3 z-10 rounded-pill bg-[#121212] px-[14px] py-[4px] text-[12px] uppercase tracking-[0.12em] text-white">
            Sold out
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 z-10 hidden translate-y-full items-center justify-between bg-navy/90 px-4 py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-transform duration-500 ease-brand group-hover:translate-y-0 group-focus-within:translate-y-0 md:flex">
          View details
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-4 md:pt-5">
        <p className="mb-1.5 text-[11.5px] uppercase tracking-[0.14em] text-ink/50 md:text-[12px]">{meta}</p>
        <h3 className="h5 mb-1 text-ink">
          <Link to={url} className="link-draw pb-0.5 transition-colors group-hover:text-navy">
            {product.title}
          </Link>
        </h3>
        <Price amount={product.price} from={from} size="sm" className="mb-4" />

        {canSeePrices && (
          <div className="relative z-10 mt-auto">
            <button
              type="button"
              onClick={quickAdd}
              disabled={!product.available}
              className="btn btn-secondary w-full !min-h-[44px] !px-3 !text-[14px] md:!min-h-[50px] md:!text-[15px]"
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
                  <Plus className="h-4 w-4" aria-hidden="true" /> Add to cart
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
