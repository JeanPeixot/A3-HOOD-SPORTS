import { useStore } from '../context/StoreContext';
import { Category } from '../types';
import { categoryLabels } from './ui/commerce';
export function CategoryFilter({ className = '' }: { className?: string }) {
  const { selectedCategory, setSelectedCategory, products } = useStore();
  return <div className={`category-filter ${className}`} role="group" aria-label="Filtrar por categoria">{(['all', 'shoes', 'times', 'apparel', 'equipment'] as Category[]).map(category => <button key={category} aria-pressed={selectedCategory === category} onClick={() => setSelectedCategory(category)}>{categoryLabels[category]}<span>{products.filter(product => category === 'all' || product.category === category).length.toString().padStart(2, '0')}</span></button>)}</div>;
}
