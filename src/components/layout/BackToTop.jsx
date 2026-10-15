import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '../../lib/smoothScroll';

/** Floating "back to top" control; appears after the first screen or so. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setShow(window.scrollY > 900));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => scrollToTop(false)}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-[72px] right-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-[0_8px_20px_-10px_rgb(4_44_100_/_0.5)] transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:bg-navy hover:text-white md:bottom-[78px] md:right-5 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-[18px] w-[18px]" strokeWidth={1.75} />
    </button>
  );
}
