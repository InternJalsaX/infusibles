import { SWATCHES } from '../../data/products';

/**
 * Option pickers: colour swatches for "Color Variants", pills for the rest
 * (Dawn variant-pills: black fill when selected).
 */
export default function VariantPicker({ options, selection, onChange, idPrefix = 'opt' }) {
  return (
    <div className="space-y-4">
      {options.map((option) => {
        const isColor = option.name === 'Color Variants';
        const name = `${idPrefix}-${option.name.replace(/\W+/g, '-').toLowerCase()}`;
        return (
          <fieldset key={option.name}>
            <legend className="mb-2 text-[15px] tracking-[0.69px] text-ink/75">
              {option.name}
              {isColor && selection[option.name] ? `: ${selection[option.name]}` : ''}
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {option.values.map((value) => {
                const checked = selection[option.name] === value;
                const id = `${name}-${value.replace(/\W+/g, '-').toLowerCase()}`;
                return (
                  <label key={value} htmlFor={id} className="relative cursor-pointer">
                    <input
                      id={id}
                      type="radio"
                      name={name}
                      value={value}
                      checked={checked}
                      onChange={() => onChange(option.name, value)}
                      className="peer sr-only"
                    />
                    {isColor ? (
                      <span
                        title={value}
                        className={`block h-[34px] w-[34px] rounded-full border border-ink/15 transition-shadow peer-focus-visible:ring-2 peer-focus-visible:ring-navy/50 ${
                          checked ? 'shadow-[0_0_0_2px_#fff,0_0_0_3.5px_#111]' : 'hover:shadow-[0_0_0_2px_#fff,0_0_0_3px_rgb(17_17_17_/_0.35)]'
                        }`}
                        style={{ background: SWATCHES[value] || '#ddd' }}
                      >
                        <span className="sr-only">{value}</span>
                      </span>
                    ) : (
                      <span
                        className={`inline-flex min-w-[64px] items-center justify-center rounded-pill border px-[20px] py-[9px] text-[15px] tracking-[0.69px] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-navy/50 md:text-[16px] ${
                          checked ? 'border-black bg-black text-white' : 'border-line-strong text-ink hover:border-ink'
                        }`}
                      >
                        {value}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
