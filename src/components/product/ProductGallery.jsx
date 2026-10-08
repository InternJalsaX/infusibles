import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import Image from '../ui/Image';
import { cdnUrl } from '../../lib/images';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

const isSheet = (src) => /spec|sheet|page-0001|IFABX30\.jpg/i.test(src);

/** Full-screen image viewer with keyboard navigation. */
function Lightbox({ images, index, onClose, onChange, title }) {
  useLockBodyScroll(index !== null);

  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, images.length, onChange, onClose]);

  return createPortal(
    <AnimatePresence>
      {index !== null && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} images`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white" aria-label="Close">
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
          <img
            key={images[index]}
            src={cdnUrl(images[index], 1800)}
            alt={`${title} – image ${index + 1} of ${images.length}`}
            className="max-h-[92vh] max-w-[94vw] object-contain"
          />
          {images.length > 1 && (
            <>
              <button type="button" onClick={() => onChange((index - 1 + images.length) % images.length)} className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white" aria-label="Previous image">
                <ChevronLeft className="h-5 w-5" strokeWidth={1.4} />
              </button>
              <button type="button" onClick={() => onChange((index + 1) % images.length)} className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white" aria-label="Next image">
                <ChevronRight className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </>
          )}
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/**
 * Product media: large main image with thumbnails on desktop, swipeable
 * slider with counter on mobile, and a zoom lightbox.
 */
export default function ProductGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);
  const track = useRef(null);

  // Keep the mobile slider in sync with the active index.
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(i);
  };

  const goTo = (i) => {
    setActive(i);
    track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: 'smooth' });
  };

  const alt = (src, i) => (isSheet(src) ? `${title} technical specification sheet` : `${title} interlining – view ${i + 1}`);

  return (
    <div>
      {/* Mobile slider */}
      <div className="md:hidden">
        <div ref={track} onScroll={onScroll} className="no-scrollbar -mx-gutter flex snap-x snap-mandatory overflow-x-auto">
          {images.map((src, i) => (
            <button key={src} type="button" onClick={() => setZoom(i)} className="w-full shrink-0 snap-center px-gutter" aria-label={`Open image ${i + 1}`}>
              <Image src={src} alt={alt(src, i)} ratio={5 / 4} fit={isSheet(src) ? 'contain' : 'cover'} priority={i === 0} sizes="100vw" />
            </button>
          ))}
        </div>
        {images.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-4 text-[14px] text-ink/70">
            <button type="button" onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0} className="p-2 disabled:opacity-30" aria-label="Previous image">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span aria-live="polite">
              {active + 1} / {images.length}
            </span>
            <button type="button" onClick={() => goTo(Math.min(images.length - 1, active + 1))} disabled={active === images.length - 1} className="p-2 disabled:opacity-30" aria-label="Next image">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Desktop main + thumbnails */}
      <div className="hidden md:block">
        <div className="group relative">
          <button type="button" onClick={() => setZoom(active)} className="block w-full cursor-zoom-in" aria-label="Open image zoom">
            <Image
              src={images[active]}
              alt={alt(images[active], active)}
              ratio={isSheet(images[active]) ? 1700 / 2200 : 5 / 4}
              fit={isSheet(images[active]) ? 'contain' : 'cover'}
              priority
              sizes="(min-width: 990px) 820px, 60vw"
              widths={[640, 820, 1100, 1400, 1640]}
              className="border border-line/40"
            />
          </button>
          <span className="pointer-events-none absolute left-[14px] top-[14px] inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink/70 opacity-80 transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-[18px] w-[18px]" strokeWidth={1.4} aria-hidden="true" />
          </span>
        </div>
        {images.length > 1 && (
          <ul className="mt-[22px] grid grid-cols-4 gap-[10px] xl:grid-cols-5" aria-label="Product images">
            {images.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active}
                  aria-label={`Show image ${i + 1}`}
                  className={`block w-full border-2 transition-colors ${i === active ? 'border-ink' : 'border-transparent hover:border-ink/30'}`}
                >
                  <Image src={src} alt="" ratio={1} fit={isSheet(src) ? 'contain' : 'cover'} sizes="130px" widths={[160, 260]} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Lightbox images={images} index={zoom} onClose={() => setZoom(null)} onChange={setZoom} title={title} />
    </div>
  );
}
