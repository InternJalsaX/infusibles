import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import ProductGrid from '../product/ProductGrid';

/** "Top Products": left-aligned heading, 4-up grid and a centred View all button. */
export default function FeaturedProducts({ title = 'Top Products', products, viewAllTo }) {
  return (
    <section className="section-y" aria-labelledby="featured-title">
      <div className="page-width">
        <Reveal>
          <h2 id="featured-title" className="h2 mb-7 text-ink md:mb-[58px]">
            {title}
          </h2>
        </Reveal>
        <ProductGrid products={products} />
        {viewAllTo && (
          <div className="mt-8 flex justify-center md:mt-[32px]">
            <Button to={viewAllTo} aria-label="View all products">
              View all
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
