import React, { useState } from 'react';
import { ShoppingBag, Search, Monitor, Bookmark, Menu, X, Sparkles, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  onOpenReservations: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservations }) => {
  const { 
    cart, 
    setIsCartOpen, 
    isPdvView, 
    setIsPdvView, 
    searchQuery, 
    setSearchQuery, 
    reservations,
    customer,
    setSelectedCategory
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavCategory = (cat: 'shoes' | 'apparel' | 'equipment' | 'all') => {
    setSelectedCategory(cat);
    setIsMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0D14]/90 backdrop-blur-md border-b border-[#1E2638] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setIsPdvView(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="relative flex items-center bg-white rounded-lg p-1.5 shadow-cyan-sm">
              <img 
                src="/assets/hood-sports-logo.jpg" 
                alt="Hood Sports" 
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-xl tracking-wider text-white font-['Montserrat']">
                HOOD <span className="text-[#00E5FF]">SPORTS</span>
              </span>
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Performance & Style</p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar tênis, roupas, equipamentos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131822] border border-[#232D42] rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition"
              />
              <Search className="absolute left-4 top-3 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-2.5 text-xs text-gray-400 hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
            <button 
              onClick={() => handleNavCategory('all')} 
              className="hover:text-[#00E5FF] transition"
            >
              Catálogo
            </button>
            <button 
              onClick={() => handleNavCategory('shoes')} 
              className="hover:text-[#00E5FF] transition"
            >
              Calçados
            </button>
            <button 
              onClick={() => handleNavCategory('apparel')} 
              className="hover:text-[#00E5FF] transition"
            >
              Vestuário
            </button>
            <button 
              onClick={() => handleNavCategory('equipment')} 
              className="hover:text-[#00E5FF] transition"
            >
              Equipamentos
            </button>
            <a 
              href="#fidelidade" 
              className="hover:text-[#00E5FF] transition flex items-center gap-1 text-[#00E5FF]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Clube Hood
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Toggle PDV Mockup View Button */}
            <button
              onClick={() => setIsPdvView(!isPdvView)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition border ${
                isPdvView 
                  ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-cyan-sm' 
                  : 'bg-[#131822] text-[#00E5FF] border-[#232D42] hover:border-[#00E5FF]'
              }`}
              title="Alternar para a visualização do Terminal PDV / Mockup enviado"
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isPdvView ? 'Ver Loja Virtual' : 'Terminal PDV (Mockup)'}
              </span>
            </button>

            {/* Reservations */}
            <button
              onClick={onOpenReservations}
              className="relative p-2.5 rounded-lg bg-[#131822] text-gray-300 hover:text-white hover:bg-[#1A2232] border border-[#232D42] transition"
              title="Ver minhas reservas de produtos"
            >
              <Bookmark className="w-5 h-5" />
              {reservations.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {reservations.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 border border-[#00E5FF]/40 transition glow-cyan-sm"
              title="Abrir carrinho de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#00E5FF] text-black font-extrabold text-[11px] h-5 w-5 rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* User Mini Status (Desktop) */}
            <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-[#232D42]">
              <div className="w-8 h-8 rounded-full bg-[#1A2232] border border-[#00E5FF]/40 overflow-hidden flex items-center justify-center">
                <User className="w-4 h-4 text-[#00E5FF]" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-white">{customer.name.split(' ')[0]}</p>
                <p className="text-[10px] text-[#00E5FF] font-medium">R$ {customer.availableCashback.toFixed(2)} cashback</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar produtos esportivos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131822] border border-[#232D42] rounded-lg py-2 pl-10 pr-4 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#00E5FF]"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0D121B] border-b border-[#232D42] px-4 py-4 space-y-3">
          <button 
            onClick={() => handleNavCategory('all')} 
            className="block w-full text-left py-2 text-sm text-gray-200 hover:text-[#00E5FF]"
          >
            Todos os Produtos
          </button>
          <button 
            onClick={() => handleNavCategory('shoes')} 
            className="block w-full text-left py-2 text-sm text-gray-200 hover:text-[#00E5FF]"
          >
            Calçados (Shoes)
          </button>
          <button 
            onClick={() => handleNavCategory('apparel')} 
            className="block w-full text-left py-2 text-sm text-gray-200 hover:text-[#00E5FF]"
          >
            Vestuário (Apparel)
          </button>
          <button 
            onClick={() => handleNavCategory('equipment')} 
            className="block w-full text-left py-2 text-sm text-gray-200 hover:text-[#00E5FF]"
          >
            Equipamentos (Equipment)
          </button>
          <a 
            href="#fidelidade" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left py-2 text-sm text-[#00E5FF] font-medium"
          >
            ⭐ Clube Hood & Cashback
          </a>
          <div className="pt-2 border-t border-[#232D42] flex items-center justify-between text-xs text-gray-400">
            <span>{customer.name} ({customer.handle})</span>
            <span className="text-[#00E5FF] font-bold">{customer.totalLoyaltyPoints} pts</span>
          </div>
        </div>
      )}
    </header>
  );
};

