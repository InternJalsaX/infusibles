import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { policies } from '../data/policies';
import { SITE } from '../data/site';
import { useSeo } from '../hooks/useSeo';
import NotFound from './NotFound';

export default function Policy() {
  const { policy } = useParams();
  const page = policies[policy];
  useSeo({ title: page?.title, description: page && `${page.title} for ${SITE.legalName}.`, path: `/policies/${policy}` });

  if (!page) return <NotFound />;

  return (
    <>
      <Breadcrumbs items={[{ label: page.title }]} />
      <article className="page-width pb-16 pt-8 md:pb-[80px] md:pt-[40px]">
        <div className="mx-auto max-w-[760px]">
          <h1 className="h1 mb-8 text-ink md:mb-10">{page.title}</h1>
          <div className="rte text-ink-body">
            {page.sections.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                <p>{s.p}</p>
              </section>
            ))}
            <h2>Contact</h2>
            <p>
              Questions about this policy? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
              <a href={SITE.phoneHref}>{SITE.phone}</a>.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
