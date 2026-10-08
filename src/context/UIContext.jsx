import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const UIContext = createContext(null);

/**
 * Which overlay is open: 'cart' | 'search' | 'menu' | null.
 * Only one overlay can be open at a time, matching the reference behaviour.
 */
export function UIProvider({ children }) {
  const [overlay, setOverlay] = useState(null);

  const open = useCallback((name) => setOverlay(name), []);
  const close = useCallback(() => setOverlay(null), []);
  const toggle = useCallback((name) => setOverlay((cur) => (cur === name ? null : name)), []);

  const value = useMemo(() => ({ overlay, open, close, toggle }), [overlay, open, close, toggle]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside <UIProvider>');
  return ctx;
}
