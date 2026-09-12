import { useState } from 'react';
import { Check } from 'lucide-react';
import { useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesBanner } from './components/FeaturesBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { LoyaltySection } from './components/LoyaltySection';
import { Footer } from './components/Footer';
import { ActiveCartDrawer } from './components/ActiveCartDrawer';
import { PdvTerminalView } from './components/PdvTerminalView';
import { ReservationsModal } from './components/ReservationsModal';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
export default function App() {
  const {
    isPdvView,
    activeNotification
  } = useStore();
  const [reservationsOpen, setReservationsOpen] = useState(false);
  return <div className="app">
    <a href={isPdvView ? '#pdv-order-title' : '#catalogo'} className="skip-link">Pular para {isPdvView ? 'o pedido' : 'o catálogo'}</a>{isPdvView ? <PdvTerminalView /> : <>
      <Navbar onOpenReservations={() => setReservationsOpen(true)} />
      <main>
        <Hero />
        <FeaturesBanner />
        <ProductCatalog />
        <LoyaltySection />
      </main>
      <Footer />
    </>}<div className="toast-region" role="status" aria-live="polite" aria-atomic="true">{activeNotification && <div className="toast">
      <Check size={19} />
      <span>{activeNotification}</span>
    </div>}</div>
    <ActiveCartDrawer />
    <ReservationsModal isOpen={reservationsOpen} onClose={() => setReservationsOpen(false)} />
    <CheckoutSuccessModal />
  </div>;
}
