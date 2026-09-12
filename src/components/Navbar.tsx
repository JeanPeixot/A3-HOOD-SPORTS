import { useState } from 'react';
import { Search, ShoppingBag, Bookmark, Menu, X, ArrowUpRight, Monitor } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types';
import { Brand } from './ui/Brand';
import { categoryLabels } from './ui/commerce';
export function Navbar({
  onOpenReservations
}: {
  onOpenReservations: () => void;
}) {
  const {
    cart,
    setIsCartOpen,
    setIsPdvView,
    searchQuery,
    setSearchQuery,
    reservations,
    setSelectedCategory
  } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const selectCategory = (category: Category) => {
    setSelectedCategory(category);
    setMenuOpen(false);
    document.getElementById('catalogo')?.scrollIntoView();
  };
  return <>
    <div className="announcement">
      <span>DO PRIMEIRO PASSO À PRÓXIMA CONQUISTA.</span>
      <a href="#fidelidade">5% de volta com o Clube Hood <ArrowUpRight size={13} />
      </a>
    </div>
    <header className="site-header">
      <div className="shell header-main">
        <a href="#inicio" className="brand-link" aria-label="Hood Sports, início">
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <button onClick={() => selectCategory('all')}>Explorar</button>
          <button onClick={() => selectCategory('shoes')}>Calçados</button>
          <button onClick={() => selectCategory('times')}>Times</button>
          <a href="#fidelidade">Clube Hood <span className="nav-dot" />
          </a>
        </nav>
        <div className="header-actions">
          <button className="icon-button pdv-trigger" aria-label="Abrir terminal PDV" title="Terminal PDV" onClick={() => setIsPdvView(true)}>
            <Monitor size={19} />
          </button>
          <button className="icon-button" aria-label={`Minhas reservas, ${reservations.length}`} onClick={onOpenReservations}>
            <Bookmark size={20} />{reservations.length > 0 && <span className="notification-dot" />}</button>
          <button className="cart-trigger" aria-label={`Abrir carrinho, ${count} itens`} onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={19} />
            <span className="cart-label">Sacola</span>
            <span className="cart-count">{count.toString().padStart(2, '0')}</span>
          </button>
          <button className="icon-button menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      <div className="shell header-search-row">
        <span className="header-caption">PERFORMANCE ENCONTRA ATITUDE.</span>
        <form className="search-field" role="search" onSubmit={event => {
          event.preventDefault();
          document.getElementById('catalogo')?.scrollIntoView();
        }}>
          <Search size={16} aria-hidden="true" />
          <input aria-label="Buscar no catálogo" placeholder="Encontre seu próximo equipamento" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />{searchQuery && <button type="button" aria-label="Limpar busca" onClick={() => setSearchQuery('')}>
            <X size={16} />
          </button>}<button type="submit" aria-label="Ver resultados da busca">
            <ArrowUpRight size={17} />
          </button>
        </form>
      </div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav shell" aria-label="Navegação móvel" onKeyDown={event => {
        if (event.key === 'Escape') {
          setMenuOpen(false);
          document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
        }
      }}>{(['all', 'shoes', 'times', 'apparel', 'equipment'] as Category[]).map(category => <button key={category} onClick={() => selectCategory(category)}>{categoryLabels[category]}<ArrowUpRight size={17} />
      </button>)}<a href="#fidelidade" onClick={() => setMenuOpen(false)}>Clube Hood <ArrowUpRight size={17} />
        </a>
        <button onClick={() => {
          setMenuOpen(false);
          setIsPdvView(true);
        }}>Terminal PDV <Monitor size={17} />
        </button>
      </nav>}
    </header>
  </>;
}
