import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORE_CONFIG } from '../data/site';

const AccountContext = createContext(null);

/**
 * Front-end-only customer session (no backend in this build). Stores the
 * signed-in name/email locally — passwords are never persisted.
 */
export function AccountProvider({ children }) {
  const [customer, setCustomer] = useLocalStorage('infuse.customer.v1', null);

  const signIn = useCallback((details) => setCustomer({ ...details, since: new Date().toISOString() }), [setCustomer]);
  const signOut = useCallback(() => setCustomer(null), [setCustomer]);

  const value = useMemo(
    () => ({
      customer,
      signIn,
      signOut,
      canSeePrices: !STORE_CONFIG.requireLoginForPrice || Boolean(customer),
    }),
    [customer, signIn, signOut],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount must be used inside <AccountProvider>');
  return ctx;
}
