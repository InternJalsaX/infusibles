import { useEffect } from 'react';
import { setScrollLocked } from '../lib/smoothScroll';

/** Prevent the page behind an open drawer/modal from scrolling. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    setScrollLocked(true);
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      setScrollLocked(false);
    };
  }, [locked]);
}
