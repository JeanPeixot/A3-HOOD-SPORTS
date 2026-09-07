import React, { useState } from 'react';
import { Search, User, Trash2, Plus, Minus, ArrowLeft, CheckCircle2, QrCode } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod } from '../types';

export const PdvTerminalView: React.FC = () => {
  const {
    products,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    customer,
    useCashback,
    toggleCashback,
    subtotal,
    regularDiscount,
    cashbackApplied,
    finalTotal,
    completeCheckout,
    setIsPdvView
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<'shoes' | 'apparel' | 'equipment' | 'times'>('shoes');
  const [localSearch, setLocalSearch] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
                          p.variant.toLowerCase().includes(localSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProduct = filteredProducts[0] || products[0];

  const handlePay = (method: PaymentMethod) => {
    completeCheckout(method);
  };

  return (
    <div className="min-h-screen bg-[#0E1118] text-white p-3 sm:p-6 flex flex-col justify-between select-none">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E2536]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPdvView(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18202E] hover:bg-[#212C3F] text-xs font-semibold text-gray-300 border border-[#2B374E] transition"
          >
            <ArrowLeft className="w-4 h-4 text-[#00E5FF]" />
            <span>Voltar para a Loja Virtual</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-md">
              <img 
                src="/assets/hood-sports-logo.jpg" 
                alt="Hood Sports Logo" 
                className="h-7 w-auto object-contain"
              />
            </div>
            <span className="text-lg font-black tracking-wider text-white font-['Montserrat']">
              HOOD <span className="text-[#00E5FF]">SPORTS</span>
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-[11px] font-bold border border-[#00E5FF]/30">
              Terminal PDV & Caixa V1.0
            </span>
          </div>
        </div>

        <div className="text-right text-xs text-gray-400">
          <span className="text-[#00E5FF] font-semibold">Operador:</span> Balcão Central #01
        </div>
      </div>

      {/* Main 3-Column Layout (Exact layout of Mockup Image) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-5 flex-1 items-start">
        
        {/* LEFT COLUMN: Search, Categories & Product Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#18202E] border border-[#273248] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#00E5FF] transition"
            />
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Category Selector Pills (Matching exact Mockup + Times) */}
          <div className="grid grid-cols-4 gap-1.5">
            {(['shoes', 'times', 'apparel', 'equipment'] as const).map((cat) => {
              const labels = { shoes: 'Shoes', times: 'Times', apparel: 'Apparel', equipment: 'Equip.' };
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`py-2 px-2 rounded-xl font-bold text-[11px] sm:text-xs tracking-wider transition uppercase truncate ${
                    isActive
                      ? 'bg-[#00E5FF] text-black shadow-cyan-sm'
                      : 'bg-[#18202E] text-gray-300 border border-[#273248] hover:border-gray-500'
                  }`}
                >
                  {labels[cat]}
                </button>
              );
            })}
          </div>

          {/* Product Card Showcase (Matching the card in Mockup) */}
          {featuredProduct && (
            <div className="bg-[#18202E] border border-[#273248] rounded-2xl p-4 space-y-4">
              <div className="relative h-44 w-full bg-[#0F131C] rounded-xl overflow-hidden flex items-center justify-center p-2">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">
                  {featuredProduct.name}
                </h4>
                <p className="text-xs text-[#00E5FF] font-medium">
                  {featuredProduct.variant}
                </p>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xs text-gray-400 line-through">
                    R$ {featuredProduct.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-lg font-black text-[#00E5FF]">
                    R$ {featuredProduct.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Action buttons: Add to Order + Reserve */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => addToCart(featuredProduct)}
                  className="w-full py-2.5 rounded-xl bg-[#00E5FF] text-black font-extrabold text-xs uppercase tracking-wide hover:bg-[#00C8E0] transition shadow-cyan-sm active:scale-95"
                >
                  Add to Order
                </button>

                <button
                  onClick={() => alert(`Item "${featuredProduct.name}" reservado no balcão!`)}
                  className="w-full py-2.5 rounded-xl bg-[#202B3D] text-gray-200 font-semibold text-xs border border-[#2C3B54] hover:bg-[#28364D] transition"
                >
                  Reserve
                </button>
              </div>

              {/* Other Quick Products Thumbnails */}
              {filteredProducts.length > 1 && (
                <div className="pt-2 border-t border-[#232D42]">
                  <p className="text-[11px] text-gray-400 mb-2">Outros itens na categoria:</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {filteredProducts.slice(1).map(item => (
                      <div 
                        key={item.id}
                        onClick={() => addToCart(item)}
                        className="flex-shrink-0 cursor-pointer bg-[#0F131C] border border-[#273248] hover:border-[#00E5FF] p-1.5 rounded-lg w-28 text-center group"
                        title={`Clique para adicionar ${item.name}`}
                      >
                        <img src={item.image} alt={item.name} className="h-12 w-full object-cover rounded mb-1" />
                        <p className="text-[10px] text-white font-bold truncate">{item.name}</p>
                        <p className="text-[10px] text-[#00E5FF] font-black">R$ {item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* CENTER COLUMN: Active Cart (5 cols) */}
        <div className="lg:col-span-5 bg-[#18202E] border border-[#273248] rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#273248]">
              <h3 className="text-lg font-bold text-white tracking-wide">
                Active Cart
              </h3>
              <span className="text-xs text-gray-400">
                {cart.reduce((acc, i) => acc + i.quantity, 0)} itens
              </span>
            </div>

            {/* Cart Items List */}
            <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex items-center justify-between gap-3 bg-[#111622] p-3 rounded-xl border border-[#232D42] hover:border-gray-600 transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-lg bg-[#0A0D14]"
                      />
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-400">
                          Size: <span className="text-white font-semibold">{item.selectedSize}</span>
                        </p>
                        <p className="text-xs text-[#00E5FF] font-semibold">
                          Discount: R$ {(item.discountApplied * item.quantity).toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-black text-white">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1.5 bg-[#18202E] rounded-md px-1.5 py-0.5 border border-[#273248]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="text-gray-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="text-gray-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-red-400 hover:text-red-300 ml-1 p-0.5"
                          title="Remover item"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Carrinho vazio no momento. Adicione itens pela coluna à esquerda!
                </div>
              )}
            </div>
          </div>

          {/* Subtotal, Discount & Total (Exact layout of Mockup) */}
          <div className="pt-4 border-t border-[#273248] space-y-2">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Subtotal:</span>
              <span className="font-semibold text-white">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="flex justify-between text-sm text-[#00E5FF]">
              <span>Discount:</span>
              <span className="font-semibold">- R$ {regularDiscount.toFixed(2).replace('.', ',')}</span>
            </div>

            {useCashback && cashbackApplied > 0 && (
              <div className="flex justify-between text-sm text-emerald-400">
                <span>Cashback Aplicado:</span>
                <span className="font-semibold">- R$ {cashbackApplied.toFixed(2).replace('.', ',')}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold text-white pt-1">
              <span>Total:</span>
              <span className="font-black text-[#00E5FF]">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
            </div>

            {/* Cyan Action Total Button (Exact button from Mockup) */}
            <button
              onClick={() => handlePay('pix')}
              disabled={cart.length === 0}
              className={`w-full py-3.5 rounded-xl font-black text-sm tracking-wider uppercase transition shadow-cyan-glow ${
                cart.length > 0
                  ? 'bg-[#00E5FF] text-black hover:bg-[#00C8E0] active:scale-[0.99]'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Total: R$ {finalTotal.toFixed(2).replace('.', ',')}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Customer Profile, Loyalty Points & Available Cashback (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Customer Profile Card (Exact Mockup) */}
          <div className="bg-[#18202E] border border-[#273248] rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#202B3D] border border-[#00E5FF]/40 flex items-center justify-center text-gray-300">
                <User className="w-6 h-6 text-gray-300" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white leading-tight">
                  {customer.name}
                </h4>
                <p className="text-xs text-gray-400 font-mono">
                  {customer.handle}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="bg-[#00E5FF] text-black font-extrabold text-xs py-1.5 px-3 rounded-full text-center">
                {customer.inStorePurchases} In-Store Purchases
              </div>
              <div className="bg-[#00E5FF] text-black font-extrabold text-xs py-1.5 px-3 rounded-full text-center">
                {customer.onlinePurchases} Online Purchases
              </div>
            </div>
          </div>

          {/* Total Loyalty Points Card (Exact Mockup) */}
          <div className="bg-[#18202E] border border-[#273248] rounded-2xl p-5 space-y-1 text-left">
            <p className="text-sm font-semibold text-gray-300">
              Total Loyalty Points
            </p>
            <p className="text-4xl font-black text-[#00E5FF] tracking-tight">
              {customer.totalLoyaltyPoints}
            </p>
          </div>

          {/* Available Cashback Card (Exact Mockup) */}
          <div className="bg-[#18202E] border border-[#273248] rounded-2xl p-5 space-y-1 text-left">
            <p className="text-sm font-semibold text-gray-300">
              Available Cashback
            </p>
            <p className="text-3xl font-black text-[#00E5FF] tracking-tight">
              R$ {customer.availableCashback.toFixed(2).replace('.', ',')}
            </p>
          </div>

        </div>

      </div>

      {/* BOTTOM BAR: Payment Methods & "Use Cashback" (Exact layout of Mockup) */}
      <div className="pt-3 border-t border-[#1E2536] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handlePay('credit_card')}
            disabled={cart.length === 0}
            className="px-5 py-3 rounded-xl bg-[#202B3D] text-gray-200 font-semibold text-xs border border-[#2C3B54] hover:border-gray-400 hover:bg-[#28364D] transition disabled:opacity-50"
          >
            Credit Card
          </button>

          <button
            onClick={() => handlePay('debit_card')}
            disabled={cart.length === 0}
            className="px-5 py-3 rounded-xl bg-[#202B3D] text-gray-200 font-semibold text-xs border border-[#2C3B54] hover:border-gray-400 hover:bg-[#28364D] transition disabled:opacity-50"
          >
            Debit Card
          </button>

          <button
            onClick={() => handlePay('cash')}
            disabled={cart.length === 0}
            className="px-5 py-3 rounded-xl bg-[#202B3D] text-gray-200 font-semibold text-xs border border-[#2C3B54] hover:border-gray-400 hover:bg-[#28364D] transition disabled:opacity-50"
          >
            Cash
          </button>

          <button
            onClick={() => handlePay('pix')}
            disabled={cart.length === 0}
            className="px-5 py-3 rounded-xl bg-[#202B3D] text-gray-200 font-semibold text-xs border border-[#2C3B54] hover:border-gray-400 hover:bg-[#28364D] transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <QrCode className="w-3.5 h-3.5 text-[#00E5FF]" />
            Pix
          </button>
        </div>

        {/* Glowing "Use Cashback" Button (Exact Mockup) */}
        <button
          onClick={toggleCashback}
          className={`px-6 py-3 rounded-xl font-extrabold text-xs tracking-wider transition uppercase flex items-center gap-2 ${
            useCashback
              ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/30'
              : 'bg-[#00E5FF] text-black hover:bg-[#00C8E0] shadow-cyan-glow'
          }`}
        >
          {useCashback ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Cashback Ativo (- R$ {cashbackApplied.toFixed(2).replace('.', ',')})</span>
            </>
          ) : (
            <span>Use Cashback (R$ {customer.availableCashback.toFixed(2).replace('.', ',')})</span>
          )}
        </button>
      </div>

    </div>
  );
};
