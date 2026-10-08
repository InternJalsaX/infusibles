import { Link } from 'react-router-dom';
import { useAccount } from '../../context/AccountContext';
import { useLocale } from '../../context/LocaleContext';

/**
 * Product price, or — when the B2B gate is enabled and the visitor is a
 * guest — the reference store's "Login | Register to see price" box.
 */
export default function Price({ amount, from = false, size = 'md', className = '' }) {
  const { canSeePrices } = useAccount();
  const { format } = useLocale();

  if (!canSeePrices) {
    return (
      <p
        className={`rounded-[6px] border border-navy px-2.5 py-2 text-center text-[13px] leading-[1.55] tracking-[0.69px] text-navy/90 md:text-[14px] ${className}`}
      >
        <Link to="/account" className="font-bold text-navy underline underline-offset-2">
          Login
        </Link>{' '}
        |{' '}
        <Link to="/account?view=register" className="font-bold text-navy underline underline-offset-2">
          Register
        </Link>{' '}
        to see price and add to cart
      </p>
    );
  }

  const sizes = {
    sm: 'text-[15px] md:text-[16px]',
    md: 'text-[16px] md:text-[17px]',
    lg: 'text-[18px] md:text-[20px]',
  };

  return (
    <p className={`tracking-[0.69px] text-ink ${sizes[size]} ${className}`}>
      {from && <span className="mr-1 text-ink/60">From</span>}
      <span>{format(amount)}</span>
    </p>
  );
}
