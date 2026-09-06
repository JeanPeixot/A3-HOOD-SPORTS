import React, { useState } from 'react';
import { ShoppingCart, Bookmark, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, reserveProduct } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Único');
  const [isAdded, setIsAdded] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleReserve = () => {
    reserveProduct(product, selectedSize);
    setIsReserved(true);
    setTimeout(() => setIsReserved(false), 2000);
  };

  return (
    <div className="flex flex-col bg-[#131822] border border-[#232D42] rounded-2xl overflow-hidden hover:border-[#00E5FF]/50 transition-all duration-300 group hover:shadow-xl hover:shadow-[#00E5FF]/5">
      
      {/* Product Image Area */}
      <div className="relative h-56 w-full bg-[#0E121A] p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discountBadge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#00E5FF] text-black text-[10px] font-extrabold uppercase rounded-md tracking-wider">
            {product.discountBadge}
          </span>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md text-[11px] text-amber-400 font-semibold">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase tracking-widest text-[#00E5FF] font-bold">
            {product.category}
          </span>
          <h4 className="text-base font-bold text-white leading-snug group-hover:text-[#00E5FF] transition">
            {product.name}
          </h4>
          <p className="text-xs text-gray-400 font-medium">
            {product.variant}
          </p>
        </div>

        {/* Size Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>Tamanho:</span>
            <span className="text-white font-semibold">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                  selectedSize === s
                    ? 'bg-[#00E5FF] text-black font-bold'
                    : 'bg-[#1A2232] text-gray-300 hover:text-white hover:bg-[#232D42]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Prices Row */}
        <div className="flex items-baseline gap-2 pt-1 border-t border-[#1E2638]">
          <span className="text-xs text-gray-400 line-through">
            R$ {product.originalPrice.toFixed(2).replace('.', ',')}
          </span>
          <span className="text-xl font-black text-[#00E5FF]">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        {/* Action Buttons: Add to Order + Reserve (Matching the exact mockup buttons!) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wide transition shadow-sm ${
              isAdded 
                ? 'bg-emerald-500 text-black' 
                : 'bg-[#00E5FF] text-black hover:bg-[#00C8E0] active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Order</span>
              </>
            )}
          </button>

          <button
            onClick={handleReserve}
            disabled={isReserved}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-xs border transition ${
              isReserved
                ? 'bg-purple-900/50 text-purple-200 border-purple-600'
                : 'bg-[#18202D] text-gray-200 border-[#26334A] hover:border-gray-400 hover:bg-[#212C3E]'
            }`}
          >
            {isReserved ? (
              <>
                <Check className="w-3.5 h-3.5 text-purple-400" />
                <span>Reservado</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-gray-400" />
                <span>Reserve</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};

