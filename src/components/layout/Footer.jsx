import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Newsletter from './Newsletter';
import Logo from '../ui/Logo';
import PinkedEdge from '../sections/PinkedEdge';
import { FOOTER_MENUS, POLICY_LINKS, SITE } from '../../data/site';

const SOCIAL_ICONS = { instagram: Instagram, linkedin: Linkedin };
const linkClass = 'link-draw pb-0.5 text-[15px] tracking-[0.04em] text-white/70 transition-colors hover:text-white';
const headingClass = 'mb-6 text-[12px] font-medium uppercase tracking-[0.22em] text-white/50';

/**
 * Footer: a wholesale-enquiry band, then brand + navigation + contact on
 * the navy gradient, newsletter, and the legal bar.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-r from-navy-600 to-navy-900 text-white/75">
      <PinkedEdge tone="navy" className="absolute -top-2 left-0" />

      {/* Wholesale enquiry band */}
      <div className="border-b border-white/10">
        <div className="page-width flex flex-col items-start justify-between gap-8 py-12 md:py-16 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow eyebrow-light">Wholesale & bulk orders</p>
            <p className="max-w-[640px] font-heading text-[28px] leading-[1.2] text-white md:text-[38px]">
              Samples, specifications or full-roll pricing — talk to our team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-light !text-navy">
              <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
              WhatsApp us
            </a>
            <Link to="/contact" className="btn btn-outline-light">
              Send an enquiry
              <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="page-width pb-10 pt-14 md:pt-16">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.3fr]">
          {/* Brand */}
          <div>
            <span className="inline-flex rounded-[6px] bg-white px-4 py-3">
              <Logo imgClassName="w-[118px]" eager={false} />
            </span>
            <p className="mt-6 max-w-[300px] text-[15px] leading-[1.75] text-white/65">
              Premium woven and non-woven interlinings, fabrics and trims for the GCC, India and South Africa.
            </p>
            <ul className="mt-6 flex items-center gap-2" aria-label="Follow us">
              {SITE.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-navy"
                      aria-label={s.label}
                    >
                      <Icon className="h-[17px] w-[17px]" strokeWidth={1.6} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {FOOTER_MENUS.map((menu) => (
            <nav key={menu.title} aria-label={menu.title}>
              <h2 className={headingClass}>{menu.title}</h2>
              <ul className="space-y-3">
                {menu.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className={headingClass}>Contact</h2>
            <address className="space-y-4 not-italic text-[15px] tracking-[0.03em]">
              <a href={`mailto:${SITE.email}`} className="group flex items-start gap-3 hover:text-white">
                <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-white/50 group-hover:text-white" strokeWidth={1.5} aria-hidden="true" />
                <span className="link-draw pb-0.5">{SITE.email}</span>
              </a>
              <a href={SITE.phoneHref} className="group flex items-start gap-3 hover:text-white">
                <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-white/50 group-hover:text-white" strokeWidth={1.5} aria-hidden="true" />
                <span className="link-draw whitespace-nowrap pb-0.5">{SITE.phone}</span>
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-white/50" strokeWidth={1.5} aria-hidden="true" />
                {SITE.location}
              </p>
            </address>
            <div className="mt-10 [&_h2]:mb-4 [&_h2]:font-body [&_h2]:text-[12px] [&_h2]:font-medium [&_h2]:uppercase [&_h2]:tracking-[0.22em] [&_h2]:text-white/50">
              <Newsletter />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-width flex flex-col items-center gap-3 pb-24 pt-7 text-center md:flex-row md:justify-between md:pb-7 md:text-left lg:pr-[190px]">
          <small className="text-small text-white/60">
            © {year}, <Link to="/" className="hover:text-white">{SITE.storeName}</Link> LLC. All rights reserved.
          </small>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {POLICY_LINKS.map((p) => (
              <li key={p.to} className="text-caption">
                <Link to={p.to} className="link-draw pb-0.5 text-white/60 hover:text-white">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
