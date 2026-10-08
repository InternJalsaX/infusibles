import { m } from 'framer-motion';

// Dawn's "slide in" scroll animation: 2rem rise + fade, 0.6s ease-out-slow.
const EASE = [0, 0, 0.3, 1];

/** Fade/slide content in once when it scrolls into view. */
export default function Reveal({ as = 'div', delay = 0, y = 24, className = '', children, ...rest }) {
  const Tag = m[as] || m.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
