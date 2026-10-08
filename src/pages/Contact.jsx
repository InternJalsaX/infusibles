import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Image from '../components/ui/Image';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';
import { CONTACT } from '../data/content';
import { SITE } from '../data/site';
import { cdnUrl } from '../lib/images';
import { useSeo } from '../hooks/useSeo';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CHANNELS = [
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, icon: 'Email.svg' },
  { label: 'Phone', value: SITE.phone, href: SITE.phoneHref, icon: 'Phone.svg' },
  { label: 'Location', value: SITE.location, href: 'https://maps.google.com/?q=Ajman,+UAE', icon: 'Location.svg', external: true },
  { label: 'WhatsApp', value: 'Chat with us', href: SITE.whatsappHref, icon: 'Whatsapp-01.svg', external: true },
];

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', phone: '', comment: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useSeo({
    title: 'Contact',
    description: `Contact Infuse for interlining samples, bulk pricing and technical advice. Email ${SITE.email} or call ${SITE.phone}.`,
    image: CONTACT.banner.image,
    path: '/contact',
  });

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const message = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\n\n${values.comment}`;

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (!values.comment.trim()) next.comment = 'Please tell us how we can help.';
    setErrors(next);
    if (Object.keys(next).length) return;
    // No backend in this build: hand the message to the visitor's mail app.
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Website enquiry from ${values.name || values.email}`)}&body=${encodeURIComponent(message)}`;
    setSent(true);
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <Image src={CONTACT.banner.image} alt={CONTACT.banner.alt} ratio="6668 / 2050" priority sizes="100vw" widths={[640, 960, 1280, 1600, 1920, 2560]} />

      <section className="page-width py-10 md:pb-[40px] md:pt-[46px]">
        <Reveal>
          <h1 className="h1 mx-auto mb-8 max-w-[860px] text-center text-ink md:mb-[62px]">{CONTACT.title}</h1>
        </Reveal>

        <div className="mx-auto max-w-[835px]">
          {sent ? (
            <div className="flex flex-col items-center gap-4 border border-line bg-surface-subtle px-6 py-10 text-center" role="status">
              <CheckCircle2 className="h-10 w-10 text-navy" strokeWidth={1.25} aria-hidden="true" />
              <p className="h3 text-ink">Thanks for reaching out</p>
              <p className="max-w-[520px] text-ink-body">
                Your email app should open with your message ready to send. Prefer chat? Send the same note on WhatsApp and we will reply within one business day.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button href={`${SITE.whatsappHref}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" variant="maroon">
                  Send via WhatsApp
                </Button>
                <Button variant="secondary" onClick={() => setSent(false)}>
                  Edit message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-[22px]" aria-label="Contact form">
              <div className="grid gap-[22px] md:grid-cols-2">
                <Field label="Name" autoComplete="name" value={values.name} onChange={set('name')} />
                <Field label="Email" type="email" required autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
              </div>
              <Field label="Phone number" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} />
              <Field label="Comment" as="textarea" rows={4} value={values.comment} onChange={set('comment')} error={errors.comment} />
              <Button type="submit" variant="blue" className="!px-[48px]">
                Send
              </Button>
            </form>
          )}
        </div>
      </section>

      <section className="page-width pb-14 md:pb-[70px]" aria-label="Other ways to reach us">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <Reveal as="li" key={c.label} delay={i * 0.06}>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex flex-col items-center text-center"
              >
                <img src={cdnUrl(c.icon)} alt="" width="70" height="70" loading="lazy" className="mb-4 h-[62px] w-[62px] object-contain transition-transform duration-300 group-hover:-translate-y-1 md:h-[70px] md:w-[70px]" />
                <span className="font-heading text-[19px] text-ink">{c.label}</span>
                <span className="mt-1 text-[15px] text-ink-body underline-offset-4 group-hover:underline">{c.value}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
