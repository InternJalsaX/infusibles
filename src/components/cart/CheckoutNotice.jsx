import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'framer-motion';
import { Mail, MessageCircle, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLocale } from '../../context/LocaleContext';
import { SITE } from '../../data/site';

function buildSummary(items, subtotal, format, country, note) {
  const lines = items.map((i) => {
    const opts = Object.values(i.selection).filter(Boolean).join(' / ');
    return `• ${i.product.title}${opts ? ` (${opts})` : ''} × ${i.quantity} — ${format(i.lineTotal)}`;
  });
  return [
    `Order request – ${SITE.name}`,
    `Ship to: ${country.name}`,
    '',
    ...lines,
    '',
    `Subtotal: ${format(subtotal)}`,
    ...(note?.trim() ? ['', `Notes: ${note.trim()}`] : []),
  ].join('\n');
}

/**
 * Checkout step. This storefront has no payment backend, so the order is
 * sent to the sales team via WhatsApp or email with the full summary.
 */
export default function CheckoutNotice({ open, onClose, note = '' }) {
  const { items, subtotal } = useCart();
  const { format, country } = useLocale();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const summary = buildSummary(items, subtotal, format, country, note);
  const whatsapp = `${SITE.whatsappHref}?text=${encodeURIComponent(summary)}`;
  const mail = `mailto:${SITE.email}?subject=${encodeURIComponent(`Order request – ${SITE.name}`)}&body=${encodeURIComponent(summary)}`;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <m.div className="absolute inset-0 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            className="relative w-full max-w-[520px] bg-white p-6 shadow-drawer sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
          >
            <button type="button" onClick={onClose} className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center text-ink" aria-label="Close">
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <h2 id="checkout-title" className="h3 mb-2 pr-8 text-ink">
              Complete your order
            </h2>
            <p className="mb-5 text-[15px] text-ink/70">
              Our sales team confirms stock, shipping to {country.name} and payment details personally. Send your order summary and we
              will reply within one business day.
            </p>
            <pre className="mb-6 max-h-[180px] overflow-auto whitespace-pre-wrap border border-line bg-surface-subtle p-4 font-body text-[13px] leading-relaxed text-ink/80">
              {summary}
            </pre>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn-maroon">
                <MessageCircle className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                WhatsApp
              </a>
              <a href={mail} className="btn btn-navy">
                <Mail className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                Email order
              </a>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
