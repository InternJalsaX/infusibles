import { useEffect, useRef } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

const PANEL = {
  right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, className: 'right-0 top-0 h-full' },
  left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' }, className: 'left-0 top-0 h-full' },
  top: { initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '-100%' }, className: 'left-0 right-0 top-0' },
};

/**
 * Accessible overlay panel: dims the page, traps Escape, locks body scroll,
 * returns focus to the trigger on close and animates in from `side`.
 */
export default function Drawer({ open, onClose, side = 'right', label, className = '', overlayClassName = '', children }) {
  const panelRef = useRef(null);
  const returnFocus = useRef(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;
    returnFocus.current = document.activeElement;
    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector('[data-autofocus], input, button, a[href]');
      first?.focus({ preventScroll: true });
    }, 60);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  const variant = PANEL[side];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <m.div
            className={`absolute inset-0 bg-black/40 ${overlayClassName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={`absolute flex flex-col bg-white shadow-drawer ${variant.className} ${className}`}
            initial={variant.initial}
            animate={variant.animate}
            exit={variant.exit}
            transition={{ type: 'tween', duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
          >
            {children}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
