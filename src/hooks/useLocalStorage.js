import { useEffect, useState } from 'react';

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/** useState that mirrors its value to localStorage (fails silently in private mode). */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => read(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable – keep in memory only */
    }
  }, [key, value]);

  return [value, setValue];
}
