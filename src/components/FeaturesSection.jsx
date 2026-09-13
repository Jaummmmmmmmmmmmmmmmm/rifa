import React from 'react';
import { 
  Ticket, 
  Sparkles, 
  Megaphone, 
  BarChart3, 
  CheckCircle2, 
  ShieldCheck, 
  Trophy 
} from 'lucide-react';

const features = [
  {
    icon: Ticket,
    tone: 'brand',
    title: 'Operação pronta em minutos',
    description: 'Defina prêmio, valor e quantidade de números sem perder tempo montando processos manuais.'
  },
  {
    icon: Sparkles,
    tone: 'gold',
    title: 'Descrição com ponto de partida forte',
    description: 'Use IA integrada para sair do zero com uma apresentação mais clara, profissional e pronta para vender.'
  },
  {
    icon: Megaphone,
    tone: 'night',
    title: 'Compartilhamento sem fricção',
    description: 'Envie o link personalizado da sua rifa para amigos, grupos de WhatsApp ou redes sociais em 1 clique.'
  },
  {
    icon: BarChart3,
    tone: 'gold',
    title: 'Acompanhamento em tempo real',
    description: 'Veja os números reservados, status de pagamento Pix e gestão centralizada de cotas no seu painel.'
  },
  {
    icon: CheckCircle2,
    tone: 'brand',
    title: 'Confirmações automáticas',
    description: 'Seus compradores recebem comprovantes instantâneos por e-mail e WhatsApp ao reservar e ao pagar com sucesso.'
  },
  {
    icon: ShieldCheck,
    tone: 'rose',
    title: 'Autenticação Segura',
    description: 'Acesso rápido com conta Google ou link mágico por e-mail, sem a necessidade de guardar senhas complicadas.'
  },
  {
    icon: Trophy,
    tone: 'gold',
    title: 'Sorteio pela Loteria Federal',
    description: 'Vincule o resultado da sua rifa ao sorteio oficial da Caixa para mais transparência: informe os prêmios do concurso e o sistema apura o vencedor automaticamente.'
  }
];

export default function FeaturesSection() {
  return (
    <section id="recursos" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Estrutura para vender mais com menos atrito
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
          Cada recurso foi pensado para reduzir o atrito entre a ideia e a venda — da criação ao saque, tudo centralizado em um painel claro e rápido.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div 
              key={idx}
              className="surface-card rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[#10212C]/70 dark:border-white/10"
            >
              <div className="flex justify-center mb-4">
                <span className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl border shadow-sm ${
                  feat.tone === 'brand'
                    ? 'border-brand/20 bg-brand-soft text-brand dark:bg-brand/15 dark:text-glow'
                    : feat.tone === 'gold'
                      ? 'border-gold/20 bg-gold-soft text-gold-deep dark:bg-gold/15 dark:text-gold'
                      : feat.tone === 'rose'
                        ? 'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300'
                        : 'border-night/10 bg-night text-white dark:border-white/10 dark:bg-[#13283D] dark:text-white'
                }`}>
                  <Icon className="h-6 w-6" strokeWidth={2.1} />
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
