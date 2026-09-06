import React from 'react';
import { CheckCircle2, Award, Sparkles, Printer, X, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutSuccessModal: React.FC = () => {
  const { completedOrder, closeOrderModal, isPdvView } = useStore();

  if (!completedOrder) return null;

  const earnedPoints = Math.round(completedOrder.total * 1.5);
  const earnedCashback = (completedOrder.total * 0.05).toFixed(2);

  const paymentLabels = {
    credit_card: 'Cartão de Crédito',
    debit_card: 'Cartão de Débito',
    cash: 'Dinheiro',
    pix: 'Pix Instantâneo'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeOrderModal} />

      <div className="relative bg-[#10141E] border border-[#00E5FF]/40 rounded-3xl w-full max-w-lg p-6 text-white shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button 
          onClick={closeOrderModal}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#1A2232] transition"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with success badge */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-black font-['Montserrat'] tracking-tight text-white">
            {isPdvView ? 'VENDA CONCLUÍDA NO CAIXA!' : 'PEDIDO REALIZADO COM SUCESSO!'}
          </h3>
          <p className="text-xs text-gray-400">
            Identificador do Pedido: <strong className="text-[#00E5FF] font-mono">{completedOrder.id}</strong>
          </p>
        </div>

        {/* Loyalty & Cashback Gains Banner */}
        <div className="grid grid-cols-2 gap-3 bg-[#161D2B] border border-[#232F47] rounded-2xl p-3">
          <div className="flex items-center gap-2.5">
            <Award className="w-6 h-6 text-[#00E5FF]" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Pontos Ganhos</p>
              <p className="text-sm font-black text-[#00E5FF]">+{earnedPoints} pts</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-[#00E5FF]" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Novo Cashback</p>
              <p className="text-sm font-black text-emerald-400">+R$ {earnedCashback.replace('.', ',')}</p>
            </div>
          </div>
        </div>

        {/* Simulated Thermal / POS Receipt */}
        <div className="bg-[#0B0E14] border border-[#1E2638] rounded-2xl p-4 font-mono text-xs space-y-3">
          <div className="text-center border-b border-dashed border-gray-700 pb-2">
            <p className="font-bold text-white text-sm">HOOD SPORTS - HIGH PERFORMANCE</p>
            <p className="text-gray-400 text-[10px]">{completedOrder.createdAt} • Caixa 01</p>
            <p className="text-gray-400 text-[10px]">Cliente: {completedOrder.customer.name} ({completedOrder.customer.handle})</p>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-gray-300">
                <span className="truncate max-w-[220px]">
                  {item.quantity}x {item.product.name} (Tam {item.selectedSize})
                </span>
                <span className="text-white">
                  R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-700 pt-2 space-y-1 text-gray-400">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>R$ {completedOrder.subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            {completedOrder.discount > 0 && (
              <div className="flex justify-between text-[#00E5FF]">
                <span>Desconto promocional:</span>
                <span>- R$ {completedOrder.discount.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            {completedOrder.cashbackUsed > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Cashback resgatado:</span>
                <span>- R$ {completedOrder.cashbackUsed.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-gray-800">
              <span>VALOR PAGO:</span>
              <span className="text-[#00E5FF]">R$ {completedOrder.total.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-400 pt-1">
              <span>Forma de Pagamento:</span>
              <span className="text-white">{paymentLabels[completedOrder.paymentMethod]}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1A2232] hover:bg-[#232D42] text-xs font-semibold text-gray-200 border border-[#27344D] transition"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Cupom</span>
          </button>

          <button
            onClick={closeOrderModal}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00E5FF] hover:bg-[#00C8E0] text-black font-extrabold text-xs uppercase tracking-wide transition shadow-cyan-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Nova Compra</span>
          </button>
        </div>

      </div>
    </div>
  );
};
