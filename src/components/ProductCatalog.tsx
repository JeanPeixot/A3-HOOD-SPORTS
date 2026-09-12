import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { ArrowUpRight, PackageSearch, X } from 'lucide-react';
import { categoryLabels } from './ui/commerce';
export function ProductCatalog() {
  const {
    products,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useStore();
  const filtered = products.filter(product => (selectedCategory === 'all' || selectedCategory === product.category) && `${product.name} ${product.variant} ${product.description}`.toLocaleLowerCase('pt-BR').includes(searchQuery.toLocaleLowerCase('pt-BR')));
  return <section id="catalogo" className="catalog-section">
    <div className="shell">
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / ENCONTRE O SEU RITMO</span>
          <h2>Seu jogo.<br className="mobile-break" /> Suas regras<span>.</span>
          </h2>
        </div>
        <p>Uma seleção para cada versão de você.<br />Escolha como quer chegar mais longe.</p>
      </div>
      <CategoryFilter />
      <div className="catalog-meta">
        <span role="status">{filtered.length.toString().padStart(2, '0')} produtos · {categoryLabels[selectedCategory]}</span>{searchQuery ? <button onClick={() => setSearchQuery('')}>Limpar “{searchQuery}” <X size={14} />
        </button> : <span>PERFORMANCE / ESTILO / ATITUDE</span>}</div>{filtered.length ? <div className="product-grid">{filtered.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state">
          <PackageSearch size={38} />
          <h3>Vamos encontrar outro caminho.</h3>
          <p>Nenhum produto corresponde a essa combinação de busca e categoria.</p>
          <button className="button button-primary" onClick={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}>Ver todos os produtos <ArrowUpRight size={18} />
          </button>
        </div>}</div>
  </section>;
}
