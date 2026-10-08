import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Footer email sign-up (white field with arrow submit, as on the reference). */
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribers, setSubscribers] = useLocalStorage('infuse.newsletter.v1', []);
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!subscribers.includes(value)) setSubscribers([...subscribers, value]);
    setError('');
    setDone(true);
    setEmail('');
  };

  return (
    <div>
      <h2 className="mb-[23px] font-heading text-[22px] text-white md:text-h3">Subscribe To Our Emails</h2>
      <form onSubmit={submit} noValidate className="max-w-[412px]">
        <div className="relative">
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setDone(false);
              setError('');
            }}
            placeholder="Email"
            aria-invalid={Boolean(error)}
            aria-describedby="newsletter-status"
            className="h-[52px] w-full bg-white pl-[17px] pr-[56px] text-[17px] text-ink outline-none placeholder:text-ink/45 focus:shadow-[0_0_0_2px_rgb(255_255_255_/_0.6)]"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 flex h-[52px] w-[52px] items-center justify-center text-navy transition-transform hover:translate-x-0.5"
            aria-label="Subscribe"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <p id="newsletter-status" className="mt-2 min-h-[22px] text-[14px]" role="status">
          {error && <span className="text-[#ffb4b4]">{error}</span>}
          {done && (
            <span className="inline-flex items-center gap-1.5 text-white/85">
              <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /> Thanks for subscribing.
            </span>
          )}
        </p>
      </form>
    </div>
  );
}
