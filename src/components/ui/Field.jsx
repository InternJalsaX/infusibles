import { useId } from 'react';

/** Floating-label input / textarea matching Dawn's bordered fields. */
export default function Field({ label, as = 'input', required = false, error, className = '', ...props }) {
  const id = useId();
  const Tag = as;
  return (
    <div className={className}>
      <div className="field">
        <Tag
          id={id}
          placeholder={label}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`peer ${as === 'textarea' ? 'field-textarea' : 'field-input'}`}
          {...props}
        />
        <label htmlFor={id} className="field-label">
          {label}
          {required && ' *'}
        </label>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[14px] text-maroon">
          {error}
        </p>
      )}
    </div>
  );
}
