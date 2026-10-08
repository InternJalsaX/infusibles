import Button from '../components/ui/Button';
import { useSeo } from '../hooks/useSeo';

export default function NotFound() {
  useSeo({ title: 'Page not found' });
  return (
    <section className="page-width py-20 text-center md:py-[110px]">
      <p className="mb-3 text-[13px] uppercase tracking-[1.3px] text-ink/60">404</p>
      <h1 className="h1 mb-4 text-ink">Page not found</h1>
      <p className="mx-auto mb-8 max-w-[520px] text-ink-body">The page you were looking for does not exist or may have moved.</p>
      <Button to="/collections/all">Continue shopping</Button>
    </section>
  );
}
