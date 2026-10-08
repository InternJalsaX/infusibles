import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Header from '../components/layout/Header';
import MobileMenu from '../components/layout/MobileMenu';
import SearchModal from '../components/layout/SearchModal';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import CartDrawer from '../components/cart/CartDrawer';
import { useUI } from '../context/UIContext';

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-navy/20 border-t-navy" />
    </div>
  );
}

/** Scroll to top (or to the #hash target) on navigation, close overlays. */
function useRouteEffects() {
  const { pathname, hash, search } = useLocation();
  const { close } = useUI();

  useEffect(() => {
    close();
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, search, close]);
}

export default function RootLayout() {
  const { pathname } = useLocation();
  useRouteEffects();

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] bg-white px-4 py-2 text-navy focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <div className="sticky top-0 z-50">
        <AnnouncementBar />
      </div>
      <Header />
      <MobileMenu />
      <SearchModal />
      <CartDrawer />

      <m.main
        id="main"
        key={pathname}
        tabIndex={-1}
        className="min-h-[50vh] outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </m.main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
