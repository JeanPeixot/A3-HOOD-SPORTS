import { ArrowUpRight, Bookmark, Coins, Layers } from 'lucide-react';
export function FeaturesBanner() {
  return <div className="features-strip">
    <div className="shell features-grid">
      <div>
        <Coins size={21} />
        <span>
          <strong>SEU MOVIMENTO RENDE.</strong>
          <small>5% de cashback a cada compra</small>
        </span>
      </div>
      <div>
        <Bookmark size={21} />
        <span>
          <strong>ESCOLHA. RESERVE. RETIRE.</strong>
          <small>Seu tamanho, sua próxima conquista</small>
        </span>
      </div>
      <div>
        <Layers size={21} />
        <span>
          <strong>DA RUA À ARQUIBANCADA.</strong>
          <small>Calçados, vestuário, times e equipamentos</small>
        </span>
      </div>
      <a href="#fidelidade" aria-label="Conhecer o Clube Hood">
        <ArrowUpRight size={24} />
      </a>
    </div>
  </div>;
}
