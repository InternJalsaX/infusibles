import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import ProductGrid from '../product/ProductGrid';

/** "Top Products": editorial heading row with a View all link, then the grid. */
export default function FeaturedProducts({ title = 'Top Products', products, viewAllTo }) {
  return (
    <section className="section-lg" aria-labelledby="featured-title">
      <div className="page-width">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <Reveal variant="fade">
              <p className="eyebrow">Best sellers</p>
            </Reveal>
            <Reveal>
              <h2 id="featured-title" className="h2 text-ink md:text-[40px]">
                {title}
              </h2>
            </Reveal>
          </div>
          {viewAllTo && (
            <Link to={viewAllTo} className="group hidden items-center gap-2 text-[14px] font-medium uppercase tracking-[0.14em] text-navy md:inline-flex">
              <span className="link-draw pb-1">View all products</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          )}
        </div>
        <ProductGrid products={products} />
        {viewAllTo && (
          <div className="mt-12 flex justify-center md:hidden">
            <Button to={viewAllTo} aria-label="View all products">
              View all
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
