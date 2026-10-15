import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Header from '../components/layout/Header';
import MobileMenu from '../components/layout/MobileMenu';
import SearchModal from '../components/layout/SearchModal';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import BackToTop from '../components/layout/BackToTop';
import Cursor from '../components/ui/Cursor';
import CartDrawer from '../components/cart/CartDrawer';
import { useUI } from '../context/UIContext';
import { scrollToElement, scrollToTop, startSmoothScroll, stopSmoothScroll } from '../lib/smoothScroll';

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
        requestAnimationFrame(() => scrollToElement(el));
        return;
      }
    }
    scrollToTop(true);
  }, [pathname, hash, search, close]);
}

export default function RootLayout() {
  const { pathname } = useLocation();
  useRouteEffects();

  useEffect(() => {
    startSmoothScroll();
    return stopSmoothScroll;
  }, []);

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

      <main id="main" key={pathname} tabIndex={-1} className="min-h-[50vh] outline-none">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <Cursor />
    </>
  );
}
