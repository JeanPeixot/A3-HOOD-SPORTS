import { ArrowUpRight, Check, Printer, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Dialog } from './ui/Dialog';
import { money, paymentLabels } from './ui/commerce';
export function CheckoutSuccessModal() {
  const {
    completedOrder: order,
    closeOrderModal,
    isPdvView
  } = useStore();
  return <Dialog open={!!order} onClose={closeOrderModal} titleId="success-title" className="success-dialog">{order && <>
    <div className="dialog-header">
      <span className="eyebrow">HOOD SPORTS / CONFIRMAÇÃO</span>
      <button className="icon-button" aria-label="Fechar confirmação" onClick={closeOrderModal}>
        <X size={22} />
      </button>
    </div>
    <div className="dialog-body">
      <div className="success-heading">
        <span className="success-mark">
          <Check size={32} strokeWidth={1.5} />
        </span>
        <h2 id="success-title">{isPdvView ? 'Venda concluída.' : 'Seu próximo passo está confirmado.'}</h2>
        <p>Pedido {order.id} · {paymentLabels[order.paymentMethod]}</p>
      </div>
      <div className="earned-rewards">
        <div>
          <span>Pontos conquistados</span>
          <strong>+{Math.round(order.total * 1.5).toLocaleString('pt-BR')} <small>pts</small>
          </strong>
        </div>
        <div>
          <span>Cashback conquistado</span>
          <strong>+{money(Number((order.total * 0.05).toFixed(2)))}</strong>
        </div>
      </div>
      <div className="order-receipt">
        <div className="receipt-meta">
          <strong>HOOD SPORTS</strong>
          <span>{order.createdAt}</span>
          <span>{order.customer.name}</span>
        </div>
        <div className="receipt-items">{order.items.map(item => <div key={`${item.product.id}-${item.selectedSize}`}>
          <span>{item.quantity}× {item.product.name}<small>Tamanho {item.selectedSize}</small>
          </span>
          <strong>{money(item.product.price * item.quantity)}</strong>
        </div>)}</div>
        <dl className="order-summary">
          <div>
            <dt>Subtotal</dt>
            <dd>{money(order.subtotal)}</dd>
          </div>
          <div>
            <dt>Descontos</dt>
            <dd>− {money(order.discount)}</dd>
          </div>{order.cashbackUsed > 0 && <div>
            <dt>Cashback utilizado</dt>
            <dd>− {money(order.cashbackUsed)}</dd>
          </div>}<div className="order-total">
            <dt>Total do pedido</dt>
            <dd>{money(order.total)}</dd>
          </div>
        </dl>
        <p className="checkout-note">Comprovante de compra simulada · Sem valor fiscal</p>
      </div>
      <div className="success-actions">
        <button className="button button-secondary" onClick={() => window.print()}>
          <Printer size={17} /> Imprimir</button>
        <button className="button button-primary" onClick={closeOrderModal}>Continuar <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  </>}</Dialog>;
}
