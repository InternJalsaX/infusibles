import { Minus, Plus } from 'lucide-react';

/** Bordered − [n] + stepper (Dawn quantity input). */
export default function QuantitySelector({ value, onChange, min = 1, max = 999, label = 'Quantity', size = 'md', id }) {
  const clamp = (n) => Math.max(min, Math.min(max, Number.isNaN(n) ? min : n));
  const h = size === 'sm' ? 'h-[45px] w-[120px]' : 'h-[52px] w-[142px]';

  return (
    <div className={`flex items-stretch border border-line-strong ${h}`}>
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        className="flex w-[45px] items-center justify-center text-ink transition-opacity hover:opacity-70 disabled:opacity-30"
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(clamp(parseInt(e.target.value, 10)))}
        aria-label={label}
        className="w-full min-w-0 flex-1 appearance-none bg-transparent text-center text-[16px] text-ink outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        className="flex w-[45px] items-center justify-center text-ink transition-opacity hover:opacity-70 disabled:opacity-30"
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
