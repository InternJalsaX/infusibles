import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import Image from '../ui/Image';
import ProductForm from './ProductForm';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

/** "Choose options" modal: image, options and add-to-cart without leaving the grid. */
export default function QuickAddModal({ product, onClose }) {
  const open = Boolean(product);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 md:p-8">
          <m.div className="absolute inset-0 bg-black/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={`Choose options for ${product.title}`}
            className="relative max-h-[92vh] w-full max-w-[1330px] overflow-y-auto bg-white p-5 shadow-drawer md:p-[30px]"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink/70 transition-colors hover:text-ink md:right-[42px] md:top-[24px]"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <div className="grid gap-6 md:grid-cols-[minmax(0,562px)_1fr] md:gap-[46px]">
              <Image src={product.images[0]} alt={product.title} ratio={5 / 4} sizes="(min-width: 750px) 562px, 100vw" />
              <div className="md:pt-5">
                <p className="mb-1 text-[13px] uppercase tracking-[1.3px] text-ink/70">{product.vendor}</p>
                <h2 className="h1 mb-6 text-ink">{product.title}</h2>
                <ProductForm product={product} onAdded={onClose} showBuyNow={false} />
                <Link
                  to={`/products/${product.handle}`}
                  onClick={onClose}
                  className="mt-7 inline-flex items-center gap-3 text-[17px] tracking-[0.69px] text-ink hover:underline"
                >
                  View full details <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
