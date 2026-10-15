import { useEffect, useRef, useState } from 'react';

/**
 * Two-part cursor for mouse users: a small maroon dot that tracks the
 * pointer exactly, and a navy ring that trails it with easing. The ring
 * grows over links and buttons, and shows a short label over anything with
 * `data-cursor="View"` (e.g. product photos). Disabled on touch devices and
 * for reduced motion; text fields keep the normal I-beam.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ hover: false, label: '', hidden: true, down: false });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;

    const loop = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const el = e.target instanceof Element ? e.target : null;
      const labelled = el?.closest('[data-cursor]');
      const interactive = el?.closest('a, button, [role="button"], label, select, summary');
      setState((s) => {
        const next = { ...s, hidden: false, hover: Boolean(interactive || labelled), label: labelled?.getAttribute('data-cursor') || '' };
        return next.hover === s.hover && next.label === s.label && !s.hidden ? s : next;
      });
    };
    const onLeave = () => setState((s) => ({ ...s, hidden: true }));
    const onDown = () => setState((s) => ({ ...s, down: true }));
    const onUp = () => setState((s) => ({ ...s, down: false }));

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  if (!enabled) return null;

  const size = state.label ? 84 : state.hover ? 54 : 34;

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[200] transition-opacity duration-300 ${state.hidden ? 'opacity-0' : 'opacity-100'}`}>
      <div ref={ring} className="absolute left-0 top-0 will-change-transform">
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[11px] font-medium uppercase tracking-[0.16em] transition-[width,height,background-color,border-color] duration-300 ease-brand ${
            state.label ? 'border-transparent bg-navy text-white' : state.hover ? 'border-maroon/60 bg-maroon/[0.06]' : 'border-navy/40'
          } ${state.down ? 'scale-90' : ''}`}
          style={{ width: size, height: size }}
        >
          {state.label}
        </div>
      </div>
      <div ref={dot} className="absolute left-0 top-0 will-change-transform">
        <div className={`h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon transition-opacity duration-200 ${state.label ? 'opacity-0' : 'opacity-100'}`} />
      </div>
    </div>
  );
}
