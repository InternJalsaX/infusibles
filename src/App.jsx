import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { domAnimation, LazyMotion } from 'framer-motion';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import { CartProvider } from './context/CartContext';
import { LocaleProvider } from './context/LocaleContext';
import { UIProvider } from './context/UIContext';
import { AccountProvider } from './context/AccountContext';

// Route-level code splitting: only the home page ships in the first bundle.
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Collection = lazy(() => import('./pages/Collection'));
const Blog = lazy(() => import('./pages/Blog'));
const Article = lazy(() => import('./pages/Article'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Account = lazy(() => import('./pages/Account'));
const Search = lazy(() => import('./pages/Search'));
const Policy = lazy(() => import('./pages/Policy'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:handle', element: <ProductDetail /> },
      { path: 'collections/:handle', element: <Collection /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <Article /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
      { path: 'account', element: <Account /> },
      { path: 'search', element: <Search /> },
      { path: 'policies/:policy', element: <Policy /> },
      { path: '*', element: <NotFound /> },
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <LocaleProvider>
        <AccountProvider>
          <CartProvider>
            <UIProvider>
              <RouterProvider router={router} future={{ v7_startTransition: true }} />
            </UIProvider>
          </CartProvider>
        </AccountProvider>
      </LocaleProvider>
    </LazyMotion>
  );
}
