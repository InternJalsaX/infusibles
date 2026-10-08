import { SITE } from '../../data/site';

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <circle cx="16" cy="16" r="13.2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12.1 9.6c.3 0 .6 0 .8.5l1.1 2.6c.1.3.1.6-.1.9l-.8 1c-.2.2-.2.5 0 .8.5.9 1.2 1.7 2 2.4.7.6 1.5 1.1 2.4 1.5.3.1.6 0 .8-.2l.9-1.1c.2-.3.6-.4.9-.2l2.5 1.2c.3.1.5.4.5.7 0 .9-.4 2.3-1.9 2.8-1.4.5-3.4.2-5.8-1.3-2.2-1.4-4-3.5-4.9-5.4-.9-2-.6-3.6.2-4.6.5-.6 1-.9 1.4-.9z"
        fill="currentColor"
      />
      <path d="M5.4 26.6l1.6-5.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Floating "Chat with us" WhatsApp button (bottom-right, maroon). */
export default function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-[5px] bg-maroon px-3 py-2 text-[13px] font-medium text-white shadow-[0_6px_20px_-6px_rgb(0_0_0_/_0.45)] transition-transform duration-200 hover:-translate-y-0.5 md:bottom-5 md:right-5"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="h-[26px] w-[26px]" />
      <span>Chat with us</span>
    </a>
  );
}
