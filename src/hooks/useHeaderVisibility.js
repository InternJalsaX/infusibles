import { useEffect, useRef, useState } from 'react';

/**
 * Dawn-style "sticky on scroll up" header: hidden while scrolling down past
 * the header, revealed as soon as the user scrolls up.
 */
export function useHeaderVisibility(threshold = 160) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 4);
        if (y < threshold) setHidden(false);
        else if (y > last.current + 4) setHidden(true);
        else if (y < last.current - 4) setHidden(false);
        last.current = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  return { hidden, scrolled };
}
