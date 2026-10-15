import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cdnSrcSet, cdnUrl } from '../../lib/images';

/**
 * Responsive CDN image inside an aspect-ratio box. The box reserves space
 * before the image loads (no layout shift) and shows a neutral placeholder
 * if the file fails, so a missing photo never breaks the layout. The image
 * is always visible — it never waits on a load event or animation to show.
 *
 * ratio: width / height number or CSS ratio string ("16 / 9"). Omit and pass
 *        `fill` to stretch into a parent that already has dimensions.
 */
export default function Image({
  src,
  alt = '',
  ratio,
  fill = false,
  sizes = '100vw',
  widths,
  maxWidth,
  priority = false,
  fit = 'cover',
  className = '',
  imgClassName = '',
  ...rest
}) {
  const [status, setStatus] = useState('loading');

  const wrapperStyle = !fill && ratio ? { aspectRatio: typeof ratio === 'number' ? String(ratio) : ratio } : undefined;
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div
      className={`overflow-hidden ${status === 'loaded' ? 'bg-transparent' : 'bg-surface-subtle'} ${
        fill ? 'absolute inset-0' : 'relative'
      } ${className}`}
      style={wrapperStyle}
    >
      {status !== 'error' && src ? (
        <img
          src={cdnUrl(src, 1200)}
          srcSet={cdnSrcSet(src, widths, maxWidth)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : undefined}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`absolute inset-0 h-full w-full ${fitClass} ${imgClassName}`}
          {...rest}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-ink/20" role="img" aria-label={alt}>
          <ImageOff className="h-8 w-8" strokeWidth={1.25} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
