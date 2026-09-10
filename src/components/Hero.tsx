import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { money } from './ui/commerce';

export function Hero() {
  const { products, addToCart } = useStore();
  const product = products[0];
  const [size, setSize] = useState(product.sizes.includes('40') ? '40' : product.sizes[0]);
  return <section className="hero shell" id="inicio" aria-labelledby="hero-title">
    <div className="hero-copy"><div className="eyebrow hero-kicker"><span className="status-dot" /> HOOD SPORTS / PERFORMANCE CULTURE</div><h1 id="hero-title">O SEU<br />PRÓXIMO<br /><span>NÍVEL.</span></h1><p>Na pista, na rua ou na arquibancada.<br />Encontre o que move você.</p><a href="#catalogo" className="button button-primary">Explore a coleção <ArrowUpRight size={22} /></a><div className="hero-footnote"><span>FEITO PARA IR ALÉM.</span><a href="#catalogo" aria-label="Rolar até o catálogo"><ArrowDown size={18} /></a></div></div>
    <div className="hero-visual"><img src={product.image} alt={product.name + ' — imagem ilustrativa'} className="hero-image" fetchPriority="high" /><div className="hero-image-shade" /><div className="hero-visual-top"><span>EM MOVIMENTO.<br />SEMPRE.</span><span className="hero-edition">01 / 26</span></div><span className="hero-side-label">RUN YOUR OWN WAY — HOOD SPORTS</span><div className="hero-product"><div className="hero-product-heading"><span className="eyebrow">ESCOLHA HOOD / CORRIDA</span><Plus size={23} strokeWidth={1} /></div><h2>{product.name}</h2><div className="hero-product-bottom"><div><s>{money(product.originalPrice)}</s><strong>{money(product.price)}</strong></div><div className="hero-buy"><label className="sr-only" htmlFor="hero-size">Tamanho do produto em destaque</label><select id="hero-size" value={size} onChange={event => setSize(event.target.value)}>{product.sizes.map(value => <option key={value} value={value}>Tam. {value}</option>)}</select><button aria-label={`Adicionar ${product.name}, tamanho ${size}`} className="icon-button" onClick={() => addToCart(product, size)}><ArrowUpRight size={23} /></button></div></div></div></div>
  </section>;
}
