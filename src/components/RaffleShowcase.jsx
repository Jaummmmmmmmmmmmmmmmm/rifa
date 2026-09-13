import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import RaffleCard from './RaffleCard';
import { Flame, Star, Trophy, Sparkles, ChevronRight } from 'lucide-react';

export default function RaffleShowcase() {
  const { raffles, setIsCreateOpen } = useApp();
  const [activeTab, setActiveTab] = useState('today'); // 'today' | 'featured' | 'completed'

  const todayRaffles = raffles.filter(r => r.category === 'today' || (!r.category && r.status === 'active'));
  const featuredRaffles = raffles.filter(r => r.category === 'featured');
  const completedRaffles = raffles.filter(r => r.status === 'closed' || r.category === 'completed');

  const displayedRaffles = activeTab === 'today' 
    ? (todayRaffles.length > 0 ? todayRaffles : raffles.slice(0, 8))
    : activeTab === 'featured'
      ? (featuredRaffles.length > 0 ? featuredRaffles : raffles.slice(4, 12))
      : (completedRaffles.length > 0 ? completedRaffles : raffles.filter(r => r.status === 'closed'));

  return (
    <section id="vitrine" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand dark:bg-brand/15 dark:text-glow">
            <Sparkles className="h-3.5 w-3.5" />
            Vitrine de Rifas
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
            Campanhas ativas para participar
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
            Escolha uma rifa, adquira suas cotas com pagamento instantâneo via Pix e torça pelo sorteio oficial.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-[#10212C] border border-gray-200/80 dark:border-white/10 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'today'
                ? 'bg-brand text-night shadow-sm'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            }`}
          >
            <Flame className="h-3.5 w-3.5" />
            Mais vendidas hoje
          </button>

          <button
            onClick={() => setActiveTab('featured')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'featured'
                ? 'bg-brand text-night shadow-sm'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            }`}
          >
            <Star className="h-3.5 w-3.5" />
            Em destaque
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'completed'
                ? 'bg-brand text-night shadow-sm'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            }`}
          >
            <Trophy className="h-3.5 w-3.5" />
            Concluídas 🎉
          </button>
        </div>
      </div>

      {/* Grid of Raffles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedRaffles.slice(0, 8).map((raffle) => (
          <RaffleCard key={raffle.id} raffle={raffle} />
        ))}
      </div>

      {/* Bottom Action */}
      <div className="mt-12 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-brand/20 bg-brand-soft/30 p-4 dark:border-brand/30 dark:bg-white/5">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Quer arrecadar dinheiro para seu projeto ou realizar um sorteio?
          </p>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-night shadow-md hover:bg-glow transition"
          >
            Criar minha própria rifa
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

    </section>
  );
}
