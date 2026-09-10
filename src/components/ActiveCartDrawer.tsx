import { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod } from '../types';
import { Dialog } from './ui/Dialog';
import { CartItems, CashbackToggle, OrderSummary, PaymentOptions, CheckoutButton } from './ui/commerce';
export function ActiveCartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, setIsPdvView } = useStore();
  const [method, setMethod] = useState<PaymentMethod>('pix');
  const close = () => setIsCartOpen(false);
  return <Dialog open={isCartOpen} onClose={close} titleId="cart-title" drawer><div className="dialog-header"><div><span className="eyebrow">SEU PRÓXIMO PASSO</span><h2 id="cart-title">Sua sacola<span> / {cart.reduce((sum, item) => sum + item.quantity, 0).toString().padStart(2, '0')}</span></h2></div><button className="icon-button" aria-label="Fechar carrinho" onClick={close}><X size={22} /></button></div><div className="drawer-scroll"><CartItems />{!cart.length && <button className="button button-primary" onClick={() => { close(); document.getElementById('catalogo')?.scrollIntoView(); }}>Continuar explorando <ArrowUpRight size={18} /></button>}<button className="drawer-pdv text-link" onClick={() => { close(); setIsPdvView(true); }}>Continuar no terminal PDV <ArrowUpRight size={16} /></button></div>{cart.length > 0 && <div className="drawer-checkout"><CashbackToggle /><OrderSummary /><PaymentOptions value={method} onChange={setMethod} /><CheckoutButton method={method} onComplete={close} /><p className="checkout-note">Compra simulada. Nenhuma cobrança será realizada.</p></div>}</Dialog>;
}
