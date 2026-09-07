import React, { useState } from 'react';
import { Send, Instagram, Youtube, Facebook, ShieldCheck, Database, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsPdvView } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#080B10] border-t border-[#18202E] text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Grid 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-md">
                <img 
                  src="/assets/hood-sports-logo.jpg" 
                  alt="Hood Sports" 
                  className="h-8 w-auto object-contain"
                />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white font-['Montserrat']">
                HOOD <span className="text-[#00E5FF]">SPORTS</span>
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Equipando atletas de alta performance com tecnologia de amortecimento responsivo, roupas térmicas de compressão e acessórios de resistência.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#social" className="w-8 h-8 rounded-lg bg-[#131822] hover:bg-[#00E5FF] hover:text-black text-gray-400 border border-[#232D42] flex items-center justify-center transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-lg bg-[#131822] hover:bg-[#00E5FF] hover:text-black text-gray-400 border border-[#232D42] flex items-center justify-center transition">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-lg bg-[#131822] hover:bg-[#00E5FF] hover:text-black text-gray-400 border border-[#232D42] flex items-center justify-center transition">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setIsPdvView(false); setSelectedCategory('all'); }} className="hover:text-[#00E5FF] transition">
                  Catálogo Geral
                </button>
              </li>
              <li>
                <button onClick={() => { setIsPdvView(false); setSelectedCategory('times'); }} className="hover:text-[#00E5FF] transition font-semibold text-white">
                  ⚽ Camisas de Times (Série A)
                </button>
              </li>
              <li>
                <button onClick={() => { setIsPdvView(false); setSelectedCategory('shoes'); }} className="hover:text-[#00E5FF] transition">
                  Calçados / Shoes
                </button>
              </li>
              <li>
                <button onClick={() => { setIsPdvView(false); setSelectedCategory('apparel'); }} className="hover:text-[#00E5FF] transition">
                  Vestuário / Apparel
                </button>
              </li>
              <li>
                <button onClick={() => { setIsPdvView(false); setSelectedCategory('equipment'); }} className="hover:text-[#00E5FF] transition">
                  Equipamentos / Gear
                </button>
              </li>
              <li>
                <a href="#fidelidade" className="hover:text-[#00E5FF] transition">
                  Clube de Fidelidade
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional / Requisitos Roadmap (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#00E5FF]" />
              Arquitetura & Requisitos
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <p>
                Esta Landing Page e Terminal PDV foram projetados modularmente para comportar os <strong className="text-white">15 requisitos funcionais</strong> e <strong className="text-white">5 não-funcionais</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-400">
                <li>Persistência reativa com Context API & LocalStorage</li>
                <li>Pronto para integração com PostgreSQL / Supabase / Prisma</li>
                <li>Design 100% responsivo para Mobile, Tablet e Desktop</li>
                <li>Módulo Omnichannel (Loja Virtual + Terminal de Caixa)</li>
              </ul>
            </div>
          </div>

          {/* Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              Receba Novidades & Cupons
            </h4>
            <p className="text-xs text-gray-400">
              Cadastre-se para receber avisos de reposição de tamanhos e cashback em dobro.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#131822] border border-[#232D42] rounded-xl py-2.5 pl-3 pr-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-[#00E5FF] text-black rounded-lg hover:bg-[#00C8E0] transition"
                  title="Inscrever"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  E-mail cadastrado com sucesso!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-12 mt-12 border-t border-[#18202E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Hood Sports. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Ambiente Seguro e Criptografado
            </span>
            <button onClick={() => setIsPdvView(true)} className="text-[#00E5FF] hover:underline font-medium">
              Abrir Modo Balcão PDV
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

