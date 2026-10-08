import { useCallback, useState } from 'react';
import ProductCard from './ProductCard';
import QuickAddModal from './QuickAddModal';
import Reveal from '../ui/Reveal';

/** Responsive product grid (2 columns mobile/tablet, 4 on desktop) with one shared quick-add modal. */
export default function ProductGrid({ products, priorityCount = 0, className = '' }) {
  const [quick, setQuick] = useState(null);
  const closeQuick = useCallback(() => setQuick(null), []);

  return (
    <>
      <ul className={`grid grid-cols-2 gap-x-[6px] gap-y-8 md:gap-x-2 lg:grid-cols-4 ${className}`}>
        {products.map((product, i) => (
          <Reveal as="li" key={product.handle} delay={Math.min(i % 4, 3) * 0.06}>
            <ProductCard product={product} onQuickAdd={setQuick} priority={i < priorityCount} />
          </Reveal>
        ))}
      </ul>
      <QuickAddModal product={quick} onClose={closeQuick} />
    </>
  );
}
