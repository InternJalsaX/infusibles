import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getProduct, getVariantPrice } from '../data/products';

const CartContext = createContext(null);

/** Stable line id for a product + option selection. */
export function lineKey(handle, selection = {}) {
  const opts = Object.keys(selection)
    .sort()
    .map((k) => `${k}:${selection[k]}`)
    .join('|');
  return `${handle}__${opts}`;
}

export function CartProvider({ children }) {
  const [lines, setLines] = useLocalStorage('infuse.cart.v1', []);

  const addItem = useCallback(
    (handle, selection = {}, quantity = 1) => {
      const product = getProduct(handle);
      if (!product || !product.available) return;
      const key = lineKey(handle, selection);
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(l.quantity + quantity, 999) } : l));
        }
        return [...prev, { key, handle, selection, quantity }];
      });
    },
    [setLines],
  );

  const updateQuantity = useCallback(
    (key, quantity) => {
      setLines((prev) =>
        quantity <= 0
          ? prev.filter((l) => l.key !== key)
          : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(quantity, 999) } : l)),
      );
    },
    [setLines],
  );

  const removeItem = useCallback((key) => setLines((prev) => prev.filter((l) => l.key !== key)), [setLines]);
  const clear = useCallback(() => setLines([]), [setLines]);

  const value = useMemo(() => {
    // Hydrate lines with live product data; drop anything no longer sold.
    const items = lines
      .map((line) => {
        const product = getProduct(line.handle);
        if (!product) return null;
        const unitPrice = getVariantPrice(product, line.selection);
        return { ...line, product, unitPrice, lineTotal: unitPrice * line.quantity };
      })
      .filter(Boolean);

    return {
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.lineTotal, 0),
      addItem,
      updateQuantity,
      removeItem,
      clear,
    };
  }, [lines, addItem, updateQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
