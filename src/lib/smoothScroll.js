import Lenis from 'lenis';

/**
 * Site-wide inertial scrolling (Lenis). Lenis drives the native window
 * scroll, so position: sticky, IntersectionObserver and Framer Motion's
 * useScroll all keep working unchanged.
 *
 * Wheel events inside dialogs, drawers, menus or any element that scrolls on
 * its own are left to the browser, so nested lists still scroll naturally.
 */
let lenis = null;
let frame = 0;

function scrollsItself(node) {
  if (!(node instanceof HTMLElement)) return false;
  if (node.hasAttribute('data-lenis-prevent') || node.getAttribute('role') === 'dialog' || node.id === 'mobile-menu') return true;
  if (node.scrollHeight > node.clientHeight + 1) {
    const { overflowY } = getComputedStyle(node);
    return overflowY === 'auto' || overflowY === 'scroll';
  }
  return false;
}

export function startSmoothScroll() {
  if (lenis || typeof window === 'undefined') return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false, // keep native momentum on phones and tablets
    prevent: scrollsItself,
  });

  const raf = (time) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);
  return lenis;
}

export function stopSmoothScroll() {
  cancelAnimationFrame(frame);
  lenis?.destroy();
  lenis = null;
}

/** Jump/scroll that respects Lenis when it's running. */
export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'instant' : 'smooth' });
}

export function scrollToElement(el) {
  if (lenis) lenis.scrollTo(el, { offset: -140 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Freeze/unfreeze page scrolling (used while drawers and modals are open). */
export function setScrollLocked(locked) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
