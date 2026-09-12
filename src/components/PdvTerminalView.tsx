import { useState } from 'react';
import { ArrowLeft, Search, ArrowUpRight, Bookmark, X, PackageSearch } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Category, PaymentMethod } from '../types';
import { Brand } from './ui/Brand';
import { CartItems, CashbackToggle, OrderSummary, PaymentOptions, CheckoutButton, categoryLabels, money } from './ui/commerce';
export function PdvTerminalView() {
  const {
    products,
    cart,
    addToCart,
    reserveProduct,
    customer,
    setIsPdvView
  } = useStore();
  const [category, setCategory] = useState<Category>('shoes');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<PaymentMethod>('pix');
  const filtered = products.filter(product => (category === 'all' || product.category === category) && `${product.name} ${product.variant}`.toLowerCase().includes(search.toLowerCase()));
  const selected = filtered.find(product => product.id === selectedId) || filtered[0];
  const selectedSize = selected ? sizes[selected.id] || selected.sizes[0] || 'Único' : '';
  return <main className="pdv">
    <header className="pdv-header">
      <div>
        <button className="icon-button" aria-label="Voltar para a loja" onClick={() => setIsPdvView(false)}>
          <ArrowLeft size={21} />
        </button>
        <Brand compact />
        <span className="pdv-label">TERMINAL PDV</span>
      </div>
      <span className="pdv-operator">
        <span className="status-dot" /> BALCÃO CENTRAL / 01</span>
    </header>
    <div className="pdv-title">
      <div>
        <span className="eyebrow">ATENDIMENTO EM LOJA</span>
        <h1>Bom jogo. Boas vendas.</h1>
      </div>
      <p>Selecione os produtos e conclua o pedido.</p>
    </div>
    <div className="pdv-layout">
      <section className="pdv-products" aria-label="Seleção de produtos">
        <div className="search-field">
          <Search size={18} />
          <input aria-label="Buscar produtos no PDV" placeholder="Buscar nome ou variante" value={search} onChange={event => setSearch(event.target.value)} />{search && <button aria-label="Limpar busca do PDV" onClick={() => setSearch('')}>
            <X size={17} />
          </button>}</div>
        <div className="pdv-categories" role="group" aria-label="Categorias do PDV">{(['all', 'shoes', 'times', 'apparel', 'equipment'] as Category[]).map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{categoryLabels[value]}</button>)}</div>
        <div className="pdv-product-list">{filtered.map(product => <button className={`pdv-product-option ${selected?.id === product.id ? 'selected' : ''}`} key={product.id} onClick={() => setSelectedId(product.id)} aria-pressed={selected?.id === product.id}>
          <img src={product.image} alt="" loading="lazy" width="56" height="56" />
          <span>
            <strong>{product.name}</strong>
            <small>{product.variant}</small>
          </span>
          <b>{money(product.price)}</b>
        </button>)}{!filtered.length && <div className="empty-state">
          <PackageSearch size={30} />
          <h2>Nenhum produto encontrado.</h2>
          <p>Altere a busca ou a categoria.</p>
          <button className="text-link" onClick={() => {
            setSearch('');
            setCategory('all');
          }}>Limpar filtros <ArrowUpRight size={16} />
          </button>
        </div>}</div>{selected && <div className="pdv-product-selection">
          <span className="eyebrow">PRODUTO SELECIONADO</span>
          <h2>{selected.name}</h2>
          <fieldset className="size-selector">
            <legend>Tamanho <span>{selectedSize}</span>
            </legend>
            <div>{selected.sizes.map(size => <button key={size} aria-pressed={selectedSize === size} onClick={() => setSizes(previous => ({
              ...previous,
              [selected.id]: size
            }))}>{size}</button>)}</div>
          </fieldset>
          <div className="product-actions">
            <button className="button button-primary" onClick={() => addToCart(selected, selectedSize)}>Adicionar ao pedido <ArrowUpRight size={18} />
            </button>
            <button className="reserve-button" aria-label="Reservar produto selecionado" onClick={() => reserveProduct(selected, selectedSize)}>
              <Bookmark size={18} />
            </button>
          </div>
        </div>}</section>
      <section className="pdv-order" aria-labelledby="pdv-order-title">
        <div className="panel-heading">
          <h2 id="pdv-order-title">Pedido atual</h2>
          <span>{cart.reduce((total, item) => total + item.quantity, 0)} itens</span>
        </div>
        <CartItems />
        <div className="pdv-summary">
          <OrderSummary />
        </div>
      </section>
      <aside className="pdv-payment" aria-label="Cliente e pagamento">
        <div className="pdv-customer">
          <span className="eyebrow">CLIENTE / CLUBE HOOD</span>
          <div>
            <span className="customer-avatar">{customer.name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('')}</span>
            <div>
              <h2>{customer.name}</h2>
              <p>{customer.handle}</p>
            </div>
          </div>
          <dl>
            <div>
              <dt>Pontos de fidelidade</dt>
              <dd>{customer.totalLoyaltyPoints.toLocaleString('pt-BR')}</dd>
            </div>
            <div>
              <dt>Compras na loja / online</dt>
              <dd>{customer.inStorePurchases} / {customer.onlinePurchases}</dd>
            </div>
          </dl>
        </div>
        <CashbackToggle />
        <div className="pdv-payment-panel">
          <span className="eyebrow">FECHAMENTO DO PEDIDO</span>
          <PaymentOptions value={method} onChange={setMethod} includeCash />
          <CheckoutButton method={method} />
          <p className="checkout-note">Venda simulada · Nenhuma cobrança real</p>
        </div>
      </aside>
    </div>
    <footer className="pdv-footer">
      <span>HOOD SPORTS / PONTO DE VENDA</span>
      <button onClick={() => setIsPdvView(false)}>Voltar à loja virtual <ArrowUpRight size={15} />
      </button>
    </footer>
  </main>;
}
