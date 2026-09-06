import React from 'react';
import { ArrowRight, Zap, ShieldCheck, Award, Monitor, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { products, addToCart, setIsPdvView } = useStore();

  const heroProduct = products[0]; // Pegasus 40 Match White

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00E5FF]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-600/5 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131822] border border-[#00E5FF]/30 text-xs font-semibold text-[#00E5FF] tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 fill-[#00E5FF]" />
              Coleção Performance 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-['Montserrat'] leading-tight">
              SUPERE SEUS <span className="text-[#00E5FF] drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">LIMITES</span> COM A HOOD SPORTS
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Tecnologia de amortecimento de elite, tecidos de compressão inteligente e equipamentos desenvolvidos para quem não aceita menos que a máxima performance.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#00E5FF] text-black font-bold text-sm tracking-wide uppercase hover:bg-[#00C8E0] transition transform hover:-translate-y-0.5 shadow-cyan-glow"
              >
                <span>Ver Catálogo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsPdvView(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#131822] text-white font-semibold text-sm border border-[#232D42] hover:border-[#00E5FF] hover:bg-[#1A2232] transition"
              >
                <Monitor className="w-4 h-4 text-[#00E5FF]" />
                <span>Simulador de PDV & Caixa</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#1E2638] max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#00E5FF]">
                  <Zap className="w-4 h-4" />
                  <span className="font-extrabold text-lg text-white">5%</span>
                </div>
                <p className="text-xs text-gray-400">Cashback imediato</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#00E5FF]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-extrabold text-lg text-white">100%</span>
                </div>
                <p className="text-xs text-gray-400">Originais com garantia</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#00E5FF]">
                  <Award className="w-4 h-4" />
                  <span className="font-extrabold text-lg text-white">Clube</span>
                </div>
                <p className="text-xs text-gray-400">Pontos a cada compra</p>
              </div>
            </div>
          </div>

          {/* Right Hero Showcase Product (Nike Air Zoom Pegasus 40) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-[#192231] to-[#101520] border border-[#26334D] rounded-3xl p-6 shadow-2xl backdrop-blur-sm group hover:border-[#00E5FF]/60 transition-all duration-300">
              
              {/* Product Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-[#00E5FF] text-black font-extrabold text-[11px] rounded-full uppercase tracking-wider">
                  Destaque Principal
                </span>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  Em Estoque ({heroProduct.inStock} un)
                </span>
              </div>

              {/* Product Image */}
              <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-[#0A0D14] flex items-center justify-center p-4 border border-[#1E2638]">
                <img 
                  src={heroProduct.image} 
                  alt={heroProduct.name}
                  className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>

              {/* Product Details */}
              <div className="mt-5 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {heroProduct.name}
                  </h3>
                  <p className="text-xs text-[#00E5FF] font-medium">
                    {heroProduct.variant}
                  </p>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2">
                  {heroProduct.description}
                </p>

                {/* Price block */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl font-black text-[#00E5FF]">
                    R$ {heroProduct.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    R$ {heroProduct.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    -11% OFF
                  </span>
                </div>

                {/* Sizes Pill row */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Tamanhos disponíveis:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {heroProduct.sizes.map((s) => (
                      <span key={s} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#141A25] border border-[#232D42] text-gray-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Add CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => addToCart(heroProduct, '40')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00E5FF] text-black font-extrabold text-sm tracking-wide uppercase hover:bg-[#00C8E0] transition shadow-cyan-sm active:scale-[0.98]"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Adicionar ao Pedido</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

