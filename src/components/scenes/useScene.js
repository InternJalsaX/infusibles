import { useEffect, useRef, useState } from 'react';
import { motionValue, useReducedMotion, useScroll } from 'framer-motion';

/**
 * Scroll-driven "scene": a tall section with a pinned full-screen stage.
 * `progress` runs 0 → 1 while the stage is pinned. With reduced motion the
 * scene renders static (no pinning) at `restingProgress`.
 */
export function useScene(restingProgress = 1) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [still] = useState(() => motionValue(restingProgress));
  return { ref, reduce, progress: reduce ? still : scrollYProgress };
}

/** Section/stage class names for a pinned scene `screens` viewports tall. */
export function sceneLayout(reduce, screens) {
  return {
    section: { className: 'relative', style: reduce ? undefined : { height: `calc(${screens} * (100svh - var(--chrome, 120px)) + var(--chrome, 120px))` } },
    stage: reduce
      ? 'relative min-h-[calc(100svh-var(--chrome,120px))] overflow-hidden'
      : 'sticky top-[var(--chrome,120px)] h-[calc(100svh-var(--chrome,120px))] overflow-hidden',
  };
}

/** True from the `lg` breakpoint up; updates on resize. */
export function useIsDesktop(query = '(min-width: 990px)') {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}
