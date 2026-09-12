import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Bookmark, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { categoryLabels, money } from './ui/commerce';
export function ProductCard({
  product
}: {
  product: Product;
}) {
  const {
    addToCart,
    reserveProduct
  } = useStore();
  const [size, setSize] = useState(product.sizes[0] || 'Único');
  const [feedback, setFeedback] = useState<'added' | 'reserved' | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const notify = (value: 'added' | 'reserved') => {
    clearTimeout(timer.current);
    setFeedback(value);
    timer.current = setTimeout(() => setFeedback(null), 1800);
  };
  return <article className="product-card">
    <div className={`product-image product-image--${product.category}`}>
      <img src={product.image} alt={product.name} loading="lazy" width="480" height="480" />
      <div className="product-image-top">{product.discountBadge && <span className="product-badge">{product.discountBadge}</span>}<span className="product-rating">
        <Star size={12} fill="currentColor" /> {product.rating}</span>
      </div>
      <span className="product-image-index">HOOD SELECTION</span>
    </div>
    <div className="product-info">
      <span className="eyebrow">{categoryLabels[product.category]}</span>
      <h3>{product.name}</h3>
      <p>{product.variant}</p>
      <div className="product-price">
        <strong>{money(product.price)}</strong>
        <s>{money(product.originalPrice)}</s>
      </div>
      <fieldset className="size-selector">
        <legend>Tamanho <span>{size}</span>
        </legend>
        <div>{product.sizes.map(value => <button key={value} type="button" aria-pressed={size === value} aria-label={`Tamanho ${value} de ${product.name}`} onClick={() => setSize(value)}>{value}</button>)}</div>
      </fieldset>
      <div className="product-actions">
        <button className={`button button-product ${feedback === 'added' ? 'is-success' : ''}`} onClick={() => {
          addToCart(product, size);
          notify('added');
        }}>{feedback === 'added' ? <>Adicionado <Check size={17} />
        </> : <>Adicionar <ArrowUpRight size={18} />
        </>}</button>
        <button className="reserve-button" title="Reservar produto" aria-label={`Reservar ${product.name}, tamanho ${size}`} disabled={feedback === 'reserved'} onClick={() => {
          reserveProduct(product, size);
          notify('reserved');
        }}>{feedback === 'reserved' ? <Check size={18} /> : <Bookmark size={18} />}</button>
      </div>
    </div>
  </article>;
}
