import React from 'react';
import { Award, Coins, Sparkles, Check, ShoppingBag, Store, UserCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const LoyaltySection: React.FC = () => {
  const { customer, toggleCashback, useCashback } = useStore();

  return (
    <section id="fidelidade" className="py-20 bg-gradient-to-b from-[#0A0D14] via-[#101522] to-[#0A0D14] border-t border-[#1E2638] relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131822] border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Programa Exclusivo de Recompensas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Montserrat'] tracking-tight uppercase">
            CLUBE <span className="text-[#00E5FF]">HOOD SPORTS</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Cada compra acumula pontos de fidelidade e cashback real que você pode abater tanto no e-commerce quanto no nosso terminal de atendimento em loja física.
          </p>
        </div>

        {/* 2-Column Grid: Customer Card Preview vs Club Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Active Customer Card (Direct reference to Mockup Profile) */}
          <div className="lg:col-span-5">
            <div className="bg-[#131822] border-2 border-[#00E5FF]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative group hover:border-[#00E5FF] transition-all">
              
              <div className="flex items-center justify-between pb-6 border-b border-[#1E2638]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#1C2434] border-2 border-[#00E5FF] flex items-center justify-center text-white">
                    <UserCheck className="w-7 h-7 text-[#00E5FF]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {customer.name}
                    </h3>
                    <p className="text-xs font-mono text-[#00E5FF]">
                      {customer.handle}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] rounded-full text-[11px] font-bold uppercase">
                  Membro VIP
                </span>
              </div>

              {/* Purchase Badges (Identical to Mockup) */}
              <div className="grid grid-cols-2 gap-3 my-6">
                <div className="bg-[#18202E] border border-[#26334A] rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mb-1">
                    <Store className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Loja Física</span>
                  </div>
                  <p className="text-lg font-black text-white">
                    {customer.inStorePurchases} compras
                  </p>
                </div>

                <div className="bg-[#18202E] border border-[#26334A] rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mb-1">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Online</span>
                  </div>
                  <p className="text-lg font-black text-white">
                    {customer.onlinePurchases} compras
                  </p>
                </div>
              </div>

              {/* Balances (Identical to Mockup) */}
              <div className="space-y-4 pt-2">
                <div className="bg-gradient-to-r from-[#18202E] to-[#121622] border border-[#273248] rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold">Total Loyalty Points</p>
                    <p className="text-3xl font-black text-[#00E5FF]">
                      {customer.totalLoyaltyPoints}
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-[#00E5FF]/60" />
                </div>

                <div className="bg-gradient-to-r from-[#18202E] to-[#121622] border border-[#273248] rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold">Available Cashback</p>
                    <p className="text-2xl font-black text-[#00E5FF]">
                      R$ {customer.availableCashback.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <Coins className="w-8 h-8 text-[#00E5FF]/60" />
                </div>
              </div>

              {/* Toggle Cashback quick test */}
              <div className="pt-5">
                <button
                  onClick={toggleCashback}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    useCashback
                      ? 'bg-emerald-400 text-black'
                      : 'bg-[#00E5FF] text-black hover:bg-[#00C8E0]'
                  }`}
                >
                  {useCashback ? '✓ Cashback Aplicado ao Carrinho' : 'Ativar Cashback nas Compras'}
                </button>
              </div>

            </div>
          </div>

          {/* Right: How the Club Works & 15 Functional Requirements Alignment */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white font-['Montserrat']">
                COMO FUNCIONA O SISTEMA DE FIDELIDADE?
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Desenvolvemos uma estrutura omnicanal: o mesmo saldo que você ganha comprando pelo site está disponível instantaneamente no terminal de caixa da loja física.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-[#131822] border border-[#232D42] p-4 rounded-2xl">
                <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">5% de Cashback Imediato</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Em todas as compras de calçados, vestuários e equipamentos, 5% do valor total volta para sua carteira.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#131822] border border-[#232D42] p-4 rounded-2xl">
                <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">1.5 Pontos por Real Gasto</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Troque seus pontos de fidelidade por descontos exclusivos, brindes esportivos e acesso antecipado a lançamentos Nike e Hood.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#131822] border border-[#232D42] p-4 rounded-2xl">
                <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF]">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Reserva Online & Retirada em Loja</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Reserve seu tamanho desejado com apenas um clique pelo botão "Reserve" e garanta o item por até 3 dias antes de ir à loja física.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

