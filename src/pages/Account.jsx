import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LogOut, Package } from 'lucide-react';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';
import { useAccount } from '../context/AccountContext';
import { useLocale } from '../context/LocaleContext';
import { useSeo } from '../hooks/useSeo';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function AuthForm({ mode, onSwitch }) {
  const { signIn } = useAccount();
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const register = mode === 'register';

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (values.password.length < 6) next.password = 'Password must be at least 6 characters.';
    if (register && !values.firstName.trim()) next.firstName = 'Enter your first name.';
    setErrors(next);
    if (Object.keys(next).length) return;
    // Front-end session only: the password is validated but never stored.
    signIn({
      firstName: values.firstName.trim() || values.email.split('@')[0],
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
    });
  };

  return (
    <div className="mx-auto w-full max-w-[460px]">
      <h1 className="h1 mb-7 text-center text-ink md:mb-[34px]">{register ? 'Create account' : 'Login'}</h1>
      <form onSubmit={submit} noValidate className="space-y-[18px]">
        {register && (
          <>
            <Field label="First name" autoComplete="given-name" value={values.firstName} onChange={set('firstName')} error={errors.firstName} />
            <Field label="Last name" autoComplete="family-name" value={values.lastName} onChange={set('lastName')} />
          </>
        )}
        <Field label="Email" type="email" required autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
        <Field
          label="Password"
          type="password"
          required
          autoComplete={register ? 'new-password' : 'current-password'}
          value={values.password}
          onChange={set('password')}
          error={errors.password}
        />
        {!register && (
          <p>
            <Link to="/contact" className="text-[15px] text-ink/75 underline underline-offset-4 hover:text-ink">
              Forgot your password?
            </Link>
          </p>
        )}
        <div className="flex flex-col items-center gap-5 pt-2">
          <Button type="submit" className="!px-[56px]">
            {register ? 'Create' : 'Sign in'}
          </Button>
          <button type="button" onClick={onSwitch} className="text-[15px] text-ink underline underline-offset-4 hover:text-navy">
            {register ? 'Already have an account? Sign in' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Dashboard() {
  const { customer, signOut } = useAccount();
  const { country } = useLocale();
  return (
    <div>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h1 text-ink">Account</h1>
          <p className="mt-2 text-ink-body">Welcome back, {customer.firstName}.</p>
        </div>
        <button type="button" onClick={signOut} className="inline-flex items-center gap-2 text-[16px] text-ink underline underline-offset-4 hover:text-maroon">
          <LogOut className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /> Log out
        </button>
      </div>
      <div className="grid gap-10 md:grid-cols-[1fr_340px] md:gap-16">
        <section aria-labelledby="orders-title">
          <h2 id="orders-title" className="h3 mb-4 text-ink">
            Order history
          </h2>
          <div className="flex flex-col items-start gap-4 border border-line p-6">
            <Package className="h-8 w-8 text-navy" strokeWidth={1.2} aria-hidden="true" />
            <p className="text-ink-body">You haven&apos;t placed any orders yet.</p>
            <Button to="/collections/all" variant="secondary" className="!min-h-[46px]">
              Start shopping
            </Button>
          </div>
        </section>
        <section aria-labelledby="details-title">
          <h2 id="details-title" className="h3 mb-4 text-ink">
            Account details
          </h2>
          <dl className="space-y-3 text-ink-body">
            <div>
              <dt className="text-[13px] uppercase tracking-[1.3px] text-ink/55">Name</dt>
              <dd>
                {customer.firstName} {customer.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-[13px] uppercase tracking-[1.3px] text-ink/55">Email</dt>
              <dd>{customer.email}</dd>
            </div>
            <div>
              <dt className="text-[13px] uppercase tracking-[1.3px] text-ink/55">Country/region</dt>
              <dd>{country.name}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}

export default function Account() {
  const { customer } = useAccount();
  const [params, setParams] = useSearchParams();
  const mode = params.get('view') === 'register' ? 'register' : 'login';

  useSeo({ title: customer ? 'Account' : mode === 'register' ? 'Create Account' : 'Login', path: '/account' });

  return (
    <section className="page-width py-12 md:py-[80px]">
      {customer ? (
        <Dashboard />
      ) : (
        <AuthForm mode={mode} onSwitch={() => setParams(mode === 'register' ? {} : { view: 'register' }, { replace: true })} />
      )}
    </section>
  );
}
