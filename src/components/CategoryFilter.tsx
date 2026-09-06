import React from 'react';
import { Category } from '../types';
import { useStore } from '../context/StoreContext';

interface CategoryFilterProps {
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ className = '' }) => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const categories: { id: Category; label: string; count?: number }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'equipment', label: 'Equipment' },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 border ${
              isActive
                ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-cyan-sm scale-[1.02]'
                : 'bg-[#131822] text-gray-300 border-[#232D42] hover:border-[#00E5FF]/60 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

