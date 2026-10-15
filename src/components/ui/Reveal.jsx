import { createElement, useLayoutEffect, useRef, useState } from 'react';

// One shared observer for every reveal on the page keeps scrolling cheap.
let observer;
const callbacks = new WeakMap();

function observe(el, onEnter) {
  if (typeof IntersectionObserver === 'undefined') {
    onEnter();
    return () => {};
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callbacks.get(entry.target)?.();
            observer.unobserve(entry.target);
            callbacks.delete(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
  }
  callbacks.set(el, onEnter);
  observer.observe(el);
  return () => {
    observer.unobserve(el);
    callbacks.delete(el);
  };
}

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals content once as it scrolls into view.
 *
 * variant: 'up' (fade + rise, default) | 'fade' | 'scale' | 'mask' (image curtain)
 *
 * Content renders fully visible on the server/first paint; the hidden
 * "pending" state is only applied by JS just before observing, so if the
 * observer or animations never run the content stays visible.
 */
export default function Reveal({ as = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [state, setState] = useState('idle'); // idle → pending → in

  // Layout effect: the pending state is applied before the first paint, so
  // above-the-fold content animates in rather than flashing visible first.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return undefined;
    setState('pending');
    return observe(el, () => setState('in'));
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal reveal-${variant} ${state === 'pending' ? 'is-pending' : ''} ${className}`,
      style: delay ? { ...style, transitionDelay: `${delay}s` } : style,
      ...rest,
    },
    // The mask clips an inner layer: an element whose own clip-path hides it
    // fully is treated as non-intersecting, so it could never be revealed.
    variant === 'mask' ? <div className="reveal-mask-inner relative h-full">{children}</div> : children,
  );
}
