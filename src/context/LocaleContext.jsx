import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { COUNTRIES, DEFAULT_COUNTRY, STORE_CONFIG } from '../data/site';
import { formatMoney } from '../lib/format';

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [countryCode, setCountryCode] = useLocalStorage('infuse.country.v1', DEFAULT_COUNTRY);

  const value = useMemo(() => {
    const country = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY);
    // Every market is billed in AED, exactly like the live store.
    const currency = STORE_CONFIG.currency;
    return {
      country,
      currency,
      countries: COUNTRIES,
      setCountry: setCountryCode,
      format: (amount) => formatMoney(amount, currency),
    };
  }, [countryCode, setCountryCode]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}
