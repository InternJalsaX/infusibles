import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { SITE } from '../../data/site';

/** "For Bulk Orders" block used below collection grids. */
export default function BulkOrderCta() {
  return (
    <section className="section-y pt-12 md:pt-[70px]">
      <Reveal className="page-width text-center">
        <h2 className="h1 mb-4 text-ink md:mb-[26px]">For Bulk Orders</h2>
        <p className="mb-6 text-ink-body md:mb-[28px]">Message our sales team directly on WhatsApp for volume pricing and lead times.</p>
        <Button href={SITE.whatsappHref} target="_blank" rel="noreferrer">
          Contact Us
        </Button>
      </Reveal>
    </section>
  );
}
