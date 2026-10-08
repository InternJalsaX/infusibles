import { useEffect } from 'react';

/** Call `handler` on pointer-down outside `ref` or on Escape, while `active`. */
export function useClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const onPointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handler(event);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') handler(event);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, handler, active]);
}
