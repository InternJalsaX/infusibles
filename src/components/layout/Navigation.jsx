import { NavLink } from 'react-router-dom';
import { MAIN_NAV } from '../../data/site';

/**
 * Centered desktop menu row (≥990px). Links get an underline that draws in
 * from the left on hover and stays drawn for the current page.
 */
export default function Navigation({ compact = false }) {
  return (
    <nav aria-label="Main" className={`hidden transition-[padding] duration-500 ease-brand lg:block ${compact ? 'pb-1.5' : 'pb-3'}`}>
      <ul className="flex flex-wrap items-center justify-center gap-x-2 xl:gap-x-4">
        {MAIN_NAV.map((item) => (
          <li key={item.label}>
            <NavLink to={item.to} end className="group inline-flex items-center px-3 py-2.5 text-nav text-navy/75 transition-colors hover:text-navy aria-[current=page]:text-navy">
              {({ isActive }) => <span className={`link-draw pb-1 ${isActive ? 'is-active' : ''}`}>{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
