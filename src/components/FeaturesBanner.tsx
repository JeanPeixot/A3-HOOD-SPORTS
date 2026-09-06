import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

export const FeaturesBanner: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Entrega Rápida & Segura',
      description: 'Envio prioritário com código de rastreamento em tempo real.'
    },
    {
      icon: RotateCcw,
      title: 'Troca Grátis em 30 Dias',
      description: 'Experimente seu tênis com tranquilidade. Não serviu? Trocamos sem custo.'
    },
    {
      icon: ShieldCheck,
      title: '100% Produtos Originais',
      description: 'Revenda autorizada das maiores marcas esportivas mundiais com garantia.'
    },
    {
      icon: Headphones,
      title: 'Suporte de Especialistas',
      description: 'Atendimento por atletas prontos para tirar dúvidas sobre pisada e ajuste.'
    }
  ];

  return (
    <div className="border-y border-[#1E2638] bg-[#0D111A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#131822] border border-[#232D42]">
                <div className="p-3 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{f.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

