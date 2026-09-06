import React from 'react';
import { X, Bookmark, Calendar, ArrowRight, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationsModal: React.FC<ReservationsModalProps> = ({ isOpen, onClose }) => {
  const { reservations, cancelReservation, addToCart } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#131822] border border-[#232D42] rounded-2xl w-full max-w-lg p-6 text-white shadow-2xl z-10 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#232D42]">
          <div className="flex items-center gap-2 text-purple-400">
            <Bookmark className="w-5 h-5 fill-purple-400" />
            <h3 className="text-lg font-bold text-white">Minhas Reservas na Loja</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
          {reservations.length > 0 ? (
            reservations.map((res) => (
              <div
                key={res.id}
                className="bg-[#18202E] border border-[#26334A] rounded-xl p-3 flex items-center justify-between gap-3"
              >
                <img
                  src={res.product.image}
                  alt={res.product.name}
                  className="w-14 h-14 object-cover rounded-lg bg-[#0F131C]"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">
                    {res.product.name}
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    Tamanho: <span className="text-white font-semibold">{res.selectedSize}</span>
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-purple-300 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Reservado em: {res.reservedAt} (Válido por {res.expiresInDays} dias)</span>
                  </div>
                  <p className="text-xs font-black text-[#00E5FF] mt-0.5">
                    R$ {res.product.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <button
                    onClick={() => {
                      addToCart(res.product, res.selectedSize);
                      cancelReservation(res.id);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E5FF] text-black text-xs font-bold hover:bg-[#00C8E0] transition"
                  >
                    <span>Comprar</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => cancelReservation(res.id)}
                    className="text-gray-400 hover:text-red-400 text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Liberar</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 text-xs space-y-2">
              <p>Nenhuma reserva ativa no momento.</p>
              <p className="text-gray-500">
                Você pode clicar no botão <strong>Reserve</strong> em qualquer produto para segurar seu tamanho por 3 dias!
              </p>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-[#232D42]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#1E2638] hover:bg-[#28344D] text-xs font-semibold text-white transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};

