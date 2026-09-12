import { Minus, Plus, Trash2, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Category, PaymentMethod } from '../../types';
export const money = (value: number) => value.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});
export const categoryLabels: Record<Category, string> = {
  all: 'Todos',
  shoes: 'Calçados',
  times: 'Times',
  apparel: 'Vestuário',
  equipment: 'Equipamentos'
};
export const paymentLabels: Record<PaymentMethod, string> = {
  pix: 'Pix',
  credit_card: 'Crédito',
  debit_card: 'Débito',
  cash: 'Dinheiro'
};
export function CartItems() {
  const {
    cart,
    removeFromCart,
    updateQuantity
  } = useStore();
  return <div className="cart-items">{cart.length ? cart.map(item => <article className="cart-item" key={`${item.product.id}-${item.selectedSize}`}>
    <img src={item.product.image} alt="" width="80" height="96" />
    <div className="cart-item-info">
      <h3>{item.product.name}</h3>
      <p>Tamanho {item.selectedSize}</p>
      <strong>{money(item.product.price * item.quantity)}</strong>
      <span className="cart-discount">Desconto: {money(item.discountApplied * item.quantity)}</span>
      <div className="quantity-row">
        <div className="quantity-control">
          <button aria-label={`Diminuir quantidade de ${item.product.name}, tamanho ${item.selectedSize}`} onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}>
            <Minus size={14} />
          </button>
          <span aria-label={`Quantidade: ${item.quantity}`}>{item.quantity}</span>
          <button aria-label={`Aumentar quantidade de ${item.product.name}, tamanho ${item.selectedSize}`} onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}>
            <Plus size={14} />
          </button>
        </div>
        <button className="icon-button remove-button" aria-label={`Remover ${item.product.name}, tamanho ${item.selectedSize}`} onClick={() => removeFromCart(item.product.id, item.selectedSize)}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </article>) : <div className="empty-state">
    <ShoppingBag size={32} strokeWidth={1.3} />
    <h3>Espaço para o seu próximo passo.</h3>
    <p>Escolha um produto para começar seu pedido.</p>
  </div>}</div>;
}
export function CashbackToggle() {
  const {
    customer,
    useCashback,
    toggleCashback
  } = useStore();
  return <button className={`cashback-toggle ${useCashback ? 'is-active' : ''}`} aria-pressed={useCashback} onClick={toggleCashback}>
    <span>
      <span className="eyebrow">CLUBE HOOD</span>
      <strong>{money(customer.availableCashback)} de cashback</strong>
      <small>{useCashback ? 'Saldo aplicado a este pedido' : 'Usar saldo neste pedido'}</small>
    </span>
    <span className="switch" aria-hidden="true">
      <span />
    </span>
  </button>;
}
export function OrderSummary() {
  const {
    subtotal,
    regularDiscount,
    useCashback,
    cashbackApplied,
    finalTotal
  } = useStore();
  return <dl className="order-summary">
    <div>
      <dt>Subtotal</dt>
      <dd>{money(subtotal)}</dd>
    </div>
    <div>
      <dt>Descontos</dt>
      <dd>− {money(regularDiscount)}</dd>
    </div>{useCashback && <div className="cashback-line">
      <dt>Cashback utilizado</dt>
      <dd>− {money(cashbackApplied)}</dd>
    </div>}<div className="order-total">
      <dt>Total</dt>
      <dd>{money(finalTotal)}</dd>
    </div>
  </dl>;
}
export function PaymentOptions({
  value,
  onChange,
  includeCash = false
}: {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  includeCash?: boolean;
}) {
  const methods: PaymentMethod[] = includeCash ? ['pix', 'credit_card', 'debit_card', 'cash'] : ['pix', 'credit_card', 'debit_card'];
  return <fieldset className="payment-options">
    <legend>Forma de pagamento</legend>
    <div>{methods.map(method => <label key={method} className={value === method ? 'selected' : ''}>
      <input type="radio" name={includeCash ? 'pdv-payment' : 'store-payment'} value={method} checked={value === method} onChange={() => onChange(method)} />
      <span>{paymentLabels[method]}</span>
    </label>)}</div>
  </fieldset>;
}
export function CheckoutButton({
  method,
  onComplete
}: {
  method: PaymentMethod;
  onComplete?: () => void;
}) {
  const {
    cart,
    completeCheckout
  } = useStore();
  return <button className="button button-primary checkout-button" disabled={!cart.length} onClick={() => {
    completeCheckout(method);
    onComplete?.();
  }}>Concluir pedido <ArrowUpRight size={19} />
  </button>;
}
