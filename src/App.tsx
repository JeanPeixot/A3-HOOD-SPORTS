import React, { useState } from 'react';
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
import { CheckCircle } from 'lucide-react';

export const App: React.FC = () => {
  const { isPdvView, activeNotification } = useStore();
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col selection:bg-[#00E5FF] selection:text-black">
      
      {/* Toast Notification */}
      {activeNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131822] border-2 border-[#00E5FF] text-white px-4 py-3 rounded-2xl shadow-cyan-glow flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-1.5 bg-[#00E5FF]/20 rounded-lg text-[#00E5FF]">
            <CheckCircle className="w-5 h-5" />
          </div>
          <span className="text-xs sm:text-sm font-semibold">{activeNotification}</span>
        </div>
      )}

      {/* Main View Router / Mode Switcher */}
      {isPdvView ? (
        // Mode 1: Exact interactive replica of the uploaded POS/Checkout mockup
        <PdvTerminalView />
      ) : (
        // Mode 2: Full Responsive High-Impact Landing Page
        <>
          <Navbar onOpenReservations={() => setIsReservationModalOpen(true)} />
          <main className="flex-1">
            <Hero />
            <FeaturesBanner />
            <ProductCatalog />
            <LoyaltySection />
          </main>
          <Footer />
        </>
      )}

      {/* Global Modals & Drawers */}
      <ActiveCartDrawer />
      <ReservationsModal 
        isOpen={isReservationModalOpen} 
        onClose={() => setIsReservationModalOpen(false)} 
      />
      <CheckoutSuccessModal />

    </div>
  );
};

export default App;
