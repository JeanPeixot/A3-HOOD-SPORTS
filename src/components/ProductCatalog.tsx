import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { Flame, PackageSearch } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { products, selectedCategory, searchQuery, setSearchQuery } = useStore();

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" className="py-16 border-t border-[#1E2638] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#00E5FF] text-xs font-extrabold uppercase tracking-widest mb-1.5">
              <Flame className="w-4 h-4 fill-[#00E5FF]" />
              Catálogo Oficial Hood Sports
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Montserrat'] tracking-tight">
              EQUIPAMENTOS DE <span className="text-[#00E5FF]">ELITE</span>
            </h2>
            <p className="text-sm text-gray-400 mt-1 max-w-xl">
              Filtre por categoria ou pesquise o modelo ideal para elevar a intensidade do seu treino.
            </p>
          </div>

          {/* Category Filter Pills */}
          <CategoryFilter />
        </div>

        {/* Results Counter & Search Tag */}
        <div className="flex items-center justify-between pb-6 text-xs text-gray-400">
          <div>
            Mostrando <span className="font-bold text-white">{filteredProducts.length}</span> produtos
            {selectedCategory !== 'all' && (
              <span> na categoria <strong className="text-[#00E5FF] uppercase">{selectedCategory}</strong></span>
            )}
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#00E5FF] hover:underline flex items-center gap-1"
            >
              Limpar busca "{searchQuery}"
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#131822] border border-[#232D42] rounded-2xl p-12 text-center max-w-md mx-auto my-8">
            <PackageSearch className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Nenhum produto encontrado</h3>
            <p className="text-xs text-gray-400 mb-4">
              Não encontramos nenhum item correspondente a "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); }}
              className="px-4 py-2 bg-[#00E5FF] text-black font-bold text-xs rounded-lg"
            >
              Ver todos os produtos
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
