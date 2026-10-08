import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';
import Newsletter from './Newsletter';
import { FOOTER_MENUS, POLICY_LINKS, SITE } from '../../data/site';

const SOCIAL_ICONS = { instagram: Instagram, linkedin: Linkedin };
const linkClass = 'text-[16.1px] leading-[27.3px] tracking-[0.69px] text-white/75 underline-offset-[0.3rem] transition-colors hover:text-white hover:underline';

/** Navy gradient footer: menus, contact, newsletter, socials and policies. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-navy-600 to-navy-900 text-white/75">
      <div className="page-width pb-6 pt-9 md:pb-8">
        <div className="grid gap-y-10 md:grid-cols-3 md:gap-x-[30px]">
          {FOOTER_MENUS.map((menu) => (
            <nav key={menu.title} aria-label={menu.title}>
              <h2 className="mb-[18px] font-heading text-[22px] text-white md:mb-[23px] md:text-h3">{menu.title}</h2>
              <ul className="space-y-[6px]">
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
            <h2 className="mb-[18px] font-heading text-[22px] text-white md:mb-[23px] md:text-h3">Contact</h2>
            <address className="space-y-[18px] not-italic text-[17px] tracking-[0.69px] md:text-body-lg">
              <p>
                Email:{' '}
                <a href={`mailto:${SITE.email}`} className="hover:text-white hover:underline">
                  {SITE.email}
                </a>
              </p>
              <p>
                Contact No.:{' '}
                <a href={SITE.phoneHref} className="whitespace-nowrap hover:text-white hover:underline">
                  {SITE.phone}
                </a>
              </p>
              <p>Location: {SITE.location}</p>
            </address>
          </div>
        </div>

        <div className="mt-11 flex flex-col gap-8 md:mt-[50px] md:flex-row md:items-start md:justify-between">
          <Newsletter />
          <ul className="flex items-center gap-3 md:mt-[66px] md:pr-[10px]" aria-label="Follow us">
            {SITE.social.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center text-white transition-transform hover:scale-110"
                    aria-label={s.label}
                  >
                    <Icon className="h-[20px] w-[20px]" strokeWidth={1.6} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-width flex flex-col items-center gap-2 py-8 text-center md:flex-row md:flex-wrap md:justify-center md:gap-0 md:pb-[38px] md:pt-[72px]">
          <small className="text-small text-white/75">
            © {year}, <Link to="/" className="hover:underline">{SITE.storeName}</Link> LLC, All rights reserved.
          </small>
          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 md:gap-0">
            {POLICY_LINKS.map((p) => (
              <li key={p.to} className="text-caption md:before:mx-[9px] md:before:content-['·']">
                <Link to={p.to} className="text-white/75 hover:text-white hover:underline">
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
