import React from 'react';
import { useApp } from '../context/AppContext';
import { Ticket, Users, CircleDollarSign, TrendingUp, Sparkles } from 'lucide-react';

export default function CommunityStats() {
  const { stats, setIsCreateOpen } = useApp();

  return (
    <section aria-labelledby="raffle-stats-title" className="mt-8 mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/90 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-gray-900/90">
        
        {/* Subtle grid pattern background */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,192,127,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(0,192,127,.6) 1px,transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative p-6 sm:p-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand dark:bg-brand/15 dark:text-glow">
                <Ticket className="h-6 w-6" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand dark:text-glow">
                  Comunidade RiffaDigital
                </p>
                <h2 id="raffle-stats-title" className="font-display text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
                  Resultados em tempo real
                </h2>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-700/50">
              <TrendingUp className="h-3.5 w-3.5" />
              Crescendo todos os dias desde 01/08/2025
            </span>
          </div>

          {/* 3 Metrics Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            
            {/* Metric 1 */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 dark:border-white/5 dark:bg-[#10212C]/60 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Rifas criadas</span>
                <div className="rounded-lg bg-brand-soft p-1.5 text-brand dark:bg-brand/10 dark:text-glow">
                  <Ticket className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {stats.totalRaffles.toLocaleString('pt-BR')}+
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Mais de {stats.totalRaffles.toLocaleString('pt-BR')} rifas publicadas
              </p>
            </div>

            {/* Metric 2 */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 dark:border-white/5 dark:bg-[#10212C]/60 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Números vendidos</span>
                <div className="rounded-lg bg-gold-soft p-1.5 text-gold-deep dark:bg-gold/10 dark:text-gold">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {stats.totalNumbersSold.toLocaleString('pt-BR')}+
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Mais de 380 mil números comprados
              </p>
            </div>

            {/* Metric 3 */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 dark:border-white/5 dark:bg-[#10212C]/60 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total arrecadado</span>
                <div className="rounded-lg bg-brand-soft p-1.5 text-brand dark:bg-brand/10 dark:text-glow">
                  <CircleDollarSign className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-brand dark:text-glow">
                R$ {(stats.totalArrecadado / 1000).toFixed(0)} mil+
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Em vendas confirmadas via Pix
              </p>
            </div>

          </div>

          {/* Quick CTA bottom strip */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center sm:text-left">
              Participe da plataforma que mais cresce para arrecadações e sorteios transparentes no Brasil.
            </p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-night shadow-sm hover:bg-glow transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-night" />
              Publicar minha campanha
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
