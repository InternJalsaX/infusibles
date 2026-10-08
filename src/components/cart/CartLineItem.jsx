import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import Image from '../ui/Image';
import QuantitySelector from '../ui/QuantitySelector';
import { useCart } from '../../context/CartContext';
import { useLocale } from '../../context/LocaleContext';

/** One cart row: thumbnail, title, chosen options, quantity, line total. */
export default function CartLineItem({ item, compact = false, onNavigate }) {
  const { updateQuantity, removeItem } = useCart();
  const { format } = useLocale();
  const { product, selection, quantity, unitPrice, lineTotal, key } = item;
  const options = Object.entries(selection).filter(([, v]) => v);

  return (
    <li className={`grid gap-4 border-b border-line py-5 ${compact ? 'grid-cols-[84px_1fr]' : 'grid-cols-[96px_1fr] md:grid-cols-[120px_1fr_auto]'}`}>
      <Link to={`/products/${product.handle}`} onClick={onNavigate} className="block" tabIndex={-1} aria-hidden="true">
        <Image src={product.images[0]} alt="" ratio={5 / 4} sizes="120px" widths={[180, 240, 360]} />
      </Link>

      <div className="min-w-0">
        <Link to={`/products/${product.handle}`} onClick={onNavigate} className="font-heading text-[18px] text-ink hover:underline">
          {product.title}
        </Link>
        <p className="mt-0.5 text-[14px] text-ink/70">{format(unitPrice)}</p>
        {options.length > 0 && (
          <dl className="mt-1 space-y-0.5 text-[13.5px] text-ink/60">
            {options.map(([name, value]) => (
              <div key={name} className="flex gap-1">
                <dt>{name}:</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-3 flex items-center gap-3">
          <QuantitySelector
            value={quantity}
            onChange={(q) => updateQuantity(key, q)}
            size="sm"
            label={`Quantity for ${product.title}`}
          />
          <button
            type="button"
            onClick={() => removeItem(key)}
            className="inline-flex h-10 w-10 items-center justify-center text-ink/70 transition-colors hover:text-maroon"
            aria-label={`Remove ${product.title} from cart`}
          >
            <Trash2 className="h-[18px] w-[18px]" strokeWidth={1.4} />
          </button>
        </div>
        {compact && <p className="mt-2 text-[15px] text-ink">{format(lineTotal)}</p>}
      </div>

      {!compact && <p className="col-span-2 text-right text-[16px] text-ink md:col-span-1 md:pt-1">{format(lineTotal)}</p>}
    </li>
  );
}
