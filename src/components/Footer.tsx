import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Brand } from './ui/Brand';
import { Category } from '../types';
import { categoryLabels } from './ui/commerce';
export function Footer() {
  const { setSelectedCategory, setIsPdvView } = useStore();
  const go = (category: Category) => { setSelectedCategory(category); document.getElementById('catalogo')?.scrollIntoView(); };
  return <footer className="site-footer"><div className="shell"><div className="footer-top"><h2>NÃO FIQUE<br /><span>NO QUASE.</span></h2><a href="#catalogo" className="footer-explore" aria-label="Explorar catálogo"><ArrowUpRight size={48} strokeWidth={1.2} /></a></div><div className="footer-main"><div><Brand /><p>Esporte é movimento.<br />Estilo é o seu jeito de chegar.</p></div><nav aria-label="Categorias no rodapé"><span className="eyebrow">EXPLORE</span>{(['shoes', 'times', 'apparel', 'equipment'] as Category[]).map(category => <button key={category} onClick={() => go(category)}>{categoryLabels[category]}</button>)}</nav><nav aria-label="Serviços"><span className="eyebrow">SEMPRE COM VOCÊ</span><a href="#fidelidade">Clube Hood</a><button onClick={() => setIsPdvView(true)}>Terminal PDV <ArrowUpRight size={14} /></button><a href="#inicio">Voltar ao início <ArrowUp size={14} /></a><span className="demo-note">Experiência demonstrativa.<br />As compras são simuladas.</span></nav><div className="footer-manifesto"><span className="eyebrow">O MOVIMENTO É SEU.</span><p>DA PRIMEIRA<br />TENTATIVA À<br /><span>PRÓXIMA VITÓRIA.</span></p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} HOOD SPORTS</span><span>PERFORMANCE. CULTURA. COMUNIDADE.</span><span>FEITO PARA IR ALÉM ↗</span></div></div></footer>;
}
