const TEETH = {
  white: '%23ffffff',
  muted: '%23F1F1F1',
  tint: '%23F3F5F9',
  navy: '%23073879',
};

/**
 * Pinking-shear zigzag — the cut edge of an interlining swatch — used
 * sparingly as a textile-inspired transition. `tone` matches the section the
 * teeth belong to; place it at that section's top edge.
 */
export default function PinkedEdge({ tone = 'muted', className = '' }) {
  const svg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='8' viewBox='0 0 16 8'%3E%3Cpath d='M0 8 L8 0 L16 8 Z' fill='${TEETH[tone]}'/%3E%3C/svg%3E")`;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none h-2 w-full ${className}`}
      style={{ backgroundImage: svg, backgroundRepeat: 'repeat-x', backgroundSize: '16px 8px' }}
    />
  );
}
