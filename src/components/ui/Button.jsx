import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  light: 'btn-light',
  navy: 'btn-navy',
  blue: 'btn-blue',
  maroon: 'btn-maroon',
};

/**
 * Pill button. Renders a router <Link> when `to` is set, an <a> for `href`,
 * otherwise a native <button>.
 */
const Button = forwardRef(function Button(
  { to, href, variant = 'primary', fullWidth = false, className = '', children, type = 'button', ...rest },
  ref,
) {
  const classes = `btn ${VARIANTS[variant] || VARIANTS.primary} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {children}
    </button>
  );
});

export default Button;
