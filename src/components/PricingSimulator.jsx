import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  Check, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CircleDollarSign,
  TrendingUp,
  Percent
} from 'lucide-react';

export default function PricingSimulator() {
  const { setIsCreateOpen } = useApp();

  // Model state: 'commission' | 'activation'
  const [model, setModel] = useState('commission');
  
  // Selected plan: 'starter' (10%) | 'basic' (8%) | 'custom' (6%)
  const [plan, setPlan] = useState('basic');

  // Interactive inputs
  const [ticketPrice, setTicketPrice] = useState(10);
  const [totalNumbers, setTotalNumbers] = useState(100);

  // Fee calculation
  const getFeePercentage = () => {
    if (model === 'activation') return 0;
    if (plan === 'starter') return 10;
    if (plan === 'basic') return 8;
    return 6;
  };

  const feePercentage = getFeePercentage();
  const organizerPercentage = 100 - feePercentage;

  const grossTotal = ticketPrice * totalNumbers;
  const platformFee = model === 'commission' ? (grossTotal * feePercentage) / 100 : 49.90;
  const netEarnings = Math.max(0, grossTotal - platformFee);

  const formatMoney = (val) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(val);

  return (
    <section id="precos" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand dark:bg-brand/15 dark:text-glow">
          <Calculator className="h-3.5 w-3.5" />
          Transparência Total
        </span>
        <h2 className="font-display mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Uma operação simples de entender e pronta para escalar
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
          A cobrança acontece sobre as vendas realizadas, com clareza sobre repasse, saque e o papel da infraestrutura de pagamento.
        </p>
      </div>

      {/* Stone Pagar.me Transparency Card */}
      <div className="mb-10 rounded-3xl border border-brand/15 bg-white/80 p-6 shadow-md backdrop-blur-md dark:border-brand/20 dark:bg-[#10212C]/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand/10 dark:border-brand/15 pb-4">
          <div>
            <p className="text-base font-bold text-gray-900 dark:text-glow">
              Cobrança e repasse via Stone (Pagar.me)
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Split de pagamento oficial com liquidação automática.
            </p>
          </div>
          <img 
            src="/selo_pagarme.webp" 
            alt="Selo Pagar.me Stone" 
            className="h-7 w-auto object-contain self-start sm:self-auto opacity-90" 
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-brand/10 bg-brand-soft/40 p-4 dark:border-brand/15 dark:bg-white/5">
            <p className="text-xs text-gray-600 dark:text-gray-400">Taxa da plataforma (por venda)</p>
            <p className="mt-1 text-xl font-extrabold text-brand dark:text-glow">6% a 10%</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Sem mensalidade ou custos ocultos</p>
          </div>

          <div className="rounded-2xl border border-brand/10 bg-brand-soft/40 p-4 dark:border-brand/15 dark:bg-white/5">
            <p className="text-xs text-gray-600 dark:text-gray-400">Repasse</p>
            <p className="mt-1 text-base font-bold text-gray-900 dark:text-white">Modo automático</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Direto para a conta Pagar.me do organizador</p>
          </div>

          <div className="rounded-2xl border border-brand/10 bg-brand-soft/40 p-4 dark:border-brand/15 dark:bg-white/5">
            <p className="text-xs text-gray-600 dark:text-gray-400">Taxa de saque (Pagar.me)</p>
            <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">R$ 3,67</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Por solicitação de transferência bancária</p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Container */}
      <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 shadow-xl dark:border-white/10 dark:bg-gray-900/90 backdrop-blur-md">
        
        {/* Simulator Header */}
        <div className="border-b border-gray-100 dark:border-white/10 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Simulador de Planos e Ganhos
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Calcule a estimativa exata de receita e taxas para a sua rifa online.
              </p>
            </div>

            {/* Model Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-[#10212C] border border-gray-200/80 dark:border-white/10">
              <button
                onClick={() => setModel('commission')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  model === 'commission'
                    ? 'bg-brand text-night shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Comissão por venda
              </button>
              <button
                onClick={() => setModel('activation')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  model === 'activation'
                    ? 'bg-brand text-night shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Taxa de ativação única
              </button>
            </div>
          </div>
        </div>

        {/* Simulator Controls & Results */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Sliders and Plan selector (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* If Commission model, show Plans */}
            {model === 'commission' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
                  Selecione o plano da sua rifa
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Starter */}
                  <div
                    onClick={() => { setPlan('starter'); setTotalNumbers(50); }}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      plan === 'starter'
                        ? 'border-brand bg-brand-soft/40 ring-2 ring-brand/20 dark:bg-brand/10'
                        : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Plano Starter</span>
                    <div className="mt-2 text-2xl font-black text-brand dark:text-glow">10%</div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Rifas de até 50 números</p>
                    <div className="mt-3 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Você recebe 90%
                    </div>
                  </div>

                  {/* Basic */}
                  <div
                    onClick={() => { setPlan('basic'); setTotalNumbers(100); }}
                    className={`relative cursor-pointer rounded-2xl border p-4 transition-all ${
                      plan === 'basic'
                        ? 'border-brand bg-brand-soft/40 ring-2 ring-brand/20 dark:bg-brand/10'
                        : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                    }`}
                  >
                    <span className="absolute -top-2.5 right-3 rounded-full bg-gold px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-night">
                      Mais vendido
                    </span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Plano Básico</span>
                    <div className="mt-2 text-2xl font-black text-brand dark:text-glow">8%</div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Rifas de até 100 números</p>
                    <div className="mt-3 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Você recebe 92%
                    </div>
                  </div>

                  {/* Custom */}
                  <div
                    onClick={() => { setPlan('custom'); setTotalNumbers(500); }}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      plan === 'custom'
                        ? 'border-brand bg-brand-soft/40 ring-2 ring-brand/20 dark:bg-brand/10'
                        : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Personalizado</span>
                    <div className="mt-2 text-2xl font-black text-brand dark:text-glow">6%</div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Até 10.000 números</p>
                    <div className="mt-3 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Você recebe 94%
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Range: Total Numbers */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 dark:border-white/5 dark:bg-[#10212C]/60">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Quantidade total de números
                </label>
                <span className="rounded-lg bg-brand-soft px-2.5 py-1 text-xs font-extrabold text-brand dark:text-glow">
                  {totalNumbers} cotas
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="2000"
                step="10"
                value={totalNumbers}
                onChange={(e) => setTotalNumbers(Number(e.target.value))}
                className="w-full accent-brand cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>20</span>
                <span>250</span>
                <span>500</span>
                <span>1.000</span>
                <span>2.000</span>
              </div>
            </div>

            {/* Range: Price per ticket */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 dark:border-white/5 dark:bg-[#10212C]/60">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Valor de cada número (R$)
                </label>
                <span className="rounded-lg bg-brand-soft px-2.5 py-1 text-xs font-extrabold text-brand dark:text-glow">
                  {formatMoney(ticketPrice)}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(Number(e.target.value))}
                className="w-full accent-brand cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>R$ 1,00</span>
                <span>R$ 20,00</span>
                <span>R$ 50,00</span>
                <span>R$ 100,00</span>
              </div>
            </div>

          </div>

          {/* Right Column: Calculations Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 via-transparent to-gold/10 p-6 dark:border-brand/30 dark:bg-night">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand dark:text-glow mb-4">
                <TrendingUp className="h-4 w-4" />
                Resumo da Estimativa
              </div>

              {/* Rows */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">Arrecadação Bruta:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formatMoney(grossTotal)}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5">
                  <span className="text-gray-500 dark:text-gray-400">
                    {model === 'commission' ? `Taxa da Plataforma (${feePercentage}%):` : 'Taxa Única de Ativação:'}
                  </span>
                  <span className="font-semibold text-rose-500">
                    - {formatMoney(platformFee)}
                  </span>
                </div>

                {/* Net Total Highlight */}
                <div className="pt-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                    Seu Lucro Líquido Estimado:
                  </span>
                  <div className="mt-1 text-3xl sm:text-4xl font-black text-brand dark:text-glow">
                    {formatMoney(netEarnings)}
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                    {model === 'commission' 
                      ? `Você recebe ${organizerPercentage}% de cada bilhete pago diretamente via Pix.`
                      : 'Você recebe 100% das vendas subsequentes direto na sua chave Pix.'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-brand/15">
              <button
                onClick={() => setIsCreateOpen(true)}
                className="btn-shimmer w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-night shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Sparkles className="h-4 w-4 text-night" />
                Criar rifa com este plano
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
