/** Navy swoosh separator used between product category sections. */
export default function WaveDivider({ className = '' }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-[22px] w-full md:h-[30px]">
        <defs>
          <linearGradient id="wave-hi" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#7E9BC4" stopOpacity="0" />
            <stop offset="0.45" stopColor="#7E9BC4" stopOpacity="0.85" />
            <stop offset="1" stopColor="#B9CAE0" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M0 14 C 360 4, 760 4, 1440 6 L1440 20 C 900 18, 520 20, 0 24 Z" fill="url(#wave-hi)" />
        <path d="M0 18 C 300 10, 620 12, 1440 22 L1440 40 L0 40 Z" fill="#042C64" />
      </svg>
    </div>
  );
}
