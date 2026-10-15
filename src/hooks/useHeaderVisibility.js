import { useEffect, useRef, useState } from 'react';

/**
 * Sticky-header state. `compact` flips once the page scrolls past
 * `threshold`; `progressRef` receives a scaleX transform that tracks reading
 * progress. Progress is written straight to the DOM (no React re-render per
 * scroll frame) to keep scrolling smooth.
 */
export function useHeaderState(threshold = 48) {
  const [compact, setCompact] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const y = window.scrollY;
      setCompact((prev) => (prev ? y > threshold - 24 : y > threshold)); // hysteresis avoids flicker
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [threshold]);

  return { compact, progressRef };
}
