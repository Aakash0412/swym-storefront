import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { Layout } from './components/Layout';
import { Storefront } from './pages/Storefront';
import { ProductDetail } from './pages/ProductDetail';
import { WishlistDashboard } from './pages/WishlistDashboard';

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <WishlistProvider>
          <ComparisonProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Storefront />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/wishlists" element={<WishlistDashboard />} />
              </Routes>
            </Layout>
          </ComparisonProvider>
        </WishlistProvider>
      </ToastProvider>
    </HashRouter>
  );
}
