import React from 'react';
import { 
  HeartHandshake, 
  CircleDollarSign, 
  Home, 
  CalendarCheck, 
  GraduationCap, 
  PartyPopper 
} from 'lucide-react';

const useCases = [
  {
    icon: HeartHandshake,
    tone: 'rose',
    title: 'Causas sociais',
    description: 'Ajudar pessoas em tratamento de saúde, comunidades carentes, abrigos de animais ou ONGs.'
  },
  {
    icon: CircleDollarSign,
    tone: 'brand',
    title: 'Objetivos financeiros',
    description: 'Quitar dívidas acumuladas, investir em novos projetos ou levantar capital para um pequeno negócio.'
  },
  {
    icon: Home,
    tone: 'gold',
    title: 'Reformas e melhorias',
    description: 'Juntar dinheiro para reformar sua casa, consertar um veículo ou realizar obras essenciais.'
  },
  {
    icon: CalendarCheck,
    tone: 'night',
    title: 'Inscrições e viagens',
    description: 'Pagar inscrições para eventos esportivos, encontros espirituais, intercâmbios ou viagens em grupo.'
  },
  {
    icon: GraduationCap,
    tone: 'brand',
    title: 'Formaturas e celebrações',
    description: 'Arrecadar para custear colação de grau, baile de formatura ou festas de conclusão de curso.'
  },
  {
    icon: PartyPopper,
    tone: 'gold',
    title: 'Aniversários e festas',
    description: 'Realizar aquela comemoração especial, casamento ou chá de bebê sem apertar o orçamento familiar.'
  }
];

export default function UseCasesSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Metas diferentes, a mesma estrutura para crescer
        </h2>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          Com a RiffaDigital, a lógica é a mesma: transformar uma meta em campanha organizada, com cobrança clara e mais previsibilidade de resultado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="surface-card rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[#10212C]/70 dark:border-white/10"
            >
              <div className="flex justify-center mb-4">
                <span className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl border shadow-sm ${
                  item.tone === 'rose'
                    ? 'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300'
                    : item.tone === 'brand'
                      ? 'border-brand/20 bg-brand-soft text-brand dark:bg-brand/15 dark:text-glow'
                      : item.tone === 'gold'
                        ? 'border-gold/20 bg-gold-soft text-gold-deep dark:bg-gold/15 dark:text-gold'
                        : 'border-night/10 bg-night text-white dark:border-white/10 dark:bg-[#13283D] dark:text-white'
                }`}>
                  <Icon className="h-6 w-6" strokeWidth={2.1} />
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
