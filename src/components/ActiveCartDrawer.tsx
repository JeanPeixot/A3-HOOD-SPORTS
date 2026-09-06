import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, Monitor } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ActiveCartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    regularDiscount,
    cashbackApplied,
    useCashback,
    toggleCashback,
    finalTotal,
    customer,
    completeCheckout,
    setIsPdvView
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F131C] border-l border-[#1E2638] text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-[#1E2638] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-white font-['Montserrat']">
                SEU <span className="text-[#00E5FF]">CARRINHO</span>
              </span>
              <span className="text-xs bg-[#1A2232] text-[#00E5FF] px-2.5 py-0.5 rounded-full font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)} itens
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg bg-[#1A2232] hover:bg-[#232D42] text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="bg-[#131822] border border-[#232D42] rounded-xl p-3 flex gap-3 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-[#0A0D14]"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      Tamanho: <span className="text-white font-semibold">{item.selectedSize}</span>
                    </p>
                    <p className="text-[11px] text-[#00E5FF] font-semibold">
                      Desconto: R$ {(item.discountApplied * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-xs font-black text-white mt-1">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-gray-500 hover:text-red-400 p-1"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-[#1A2232] rounded-md px-1.5 py-0.5 border border-[#232D42]">
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
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <p className="text-sm text-gray-400">Seu carrinho está vazio.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-[#00E5FF] text-black text-xs font-bold rounded-lg"
                >
                  Explorar Catálogo
                </button>
              </div>
            )}

            {/* Quick Switch to Mockup PDV View */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsPdvView(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#131822] hover:bg-[#1A2232] border border-[#00E5FF]/40 text-[#00E5FF] rounded-xl text-xs font-semibold transition"
              >
                <Monitor className="w-4 h-4" />
                <span>Abrir no Terminal PDV (Modo Caixa)</span>
              </button>
            </div>
          </div>

          {/* Footer Calculations & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#1E2638] bg-[#0A0D14] space-y-3">
              
              {/* Loyalty & Cashback Prompt */}
              <div className="bg-[#131822] border border-[#232D42] rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                  <div>
                    <p className="font-semibold text-white">Saldo de Cashback</p>
                    <p className="text-gray-400">Disponível: R$ {customer.availableCashback.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
                <button
                  onClick={toggleCashback}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition ${
                    useCashback
                      ? 'bg-emerald-400 text-black'
                      : 'bg-[#00E5FF] text-black hover:bg-[#00C8E0]'
                  }`}
                >
                  {useCashback ? 'Abatido' : 'Usar'}
                </button>
              </div>

              {/* Price Lines */}
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white font-medium">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[#00E5FF]">
                  <span>Descontos:</span>
                  <span>- R$ {regularDiscount.toFixed(2).replace('.', ',')}</span>
                </div>
                {useCashback && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Cashback utilizado:</span>
                    <span>- R$ {cashbackApplied.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-[#1E2638]">
                  <span>Total a Pagar:</span>
                  <span className="text-[#00E5FF]">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Finalize Button */}
              <button
                onClick={() => {
                  completeCheckout('pix');
                  setIsCartOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-[#00E5FF] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#00C8E0] transition flex items-center justify-center gap-2 shadow-cyan-glow active:scale-[0.98]"
              >
                <span>Finalizar Pedido (Pix / Cartão)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Checkout 100% criptografado e seguro
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

