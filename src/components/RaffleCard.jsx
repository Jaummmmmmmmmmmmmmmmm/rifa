import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, User, CheckCircle, Trophy, Sparkles } from 'lucide-react';

export default function RaffleCard({ raffle }) {
  const { setSelectedRaffle } = useApp();

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(raffle.pricePerNumber);

  const promoPriceFormatted = raffle.promotionPricePerNumber ? new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(raffle.promotionPricePerNumber) : null;

  const total = raffle.totalNumbers || 100;
  const sold = raffle.soldCount || 0;
  const percent = Math.min(100, Math.round((sold / total) * 100));

  const isClosed = raffle.status === 'closed' || raffle.category === 'completed';

  return (
    <div 
      onClick={() => setSelectedRaffle(raffle)}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10 dark:border-brand/15 dark:bg-[#0F1F2C] dark:hover:border-brand/30 dark:hover:shadow-glow/10 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={raffle.imageUrl}
          alt={raffle.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80';
          }}
          loading="lazy"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Price Tag Badge */}
        <div className="absolute top-3 left-3 rounded-xl bg-[#08121E]/95 text-emerald-400 border border-emerald-500/40 px-3 py-1 text-xs font-black shadow-lg backdrop-blur flex items-center z-10">
          {promoPriceFormatted ? (
            <div className="flex items-center gap-1.5">
              <span className="line-through text-gray-400 text-[10px]">{priceFormatted}</span>
              <span className="text-emerald-300 font-black">{promoPriceFormatted}</span>
            </div>
          ) : (
            <span className="text-emerald-400 font-black">{priceFormatted}</span>
          )}
        </div>

        {/* Status Badge */}
        {isClosed ? (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-blue-600/95 px-3 py-1 text-[11px] font-bold text-white shadow-lg backdrop-blur border border-blue-400/40 z-10">
            <Trophy className="h-3.5 w-3.5" />
            Concluída
          </div>
        ) : (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black text-slate-950 shadow-lg backdrop-blur border border-emerald-300/40 z-10">
            <span className="h-2 w-2 rounded-full bg-slate-950 animate-ping" />
            Ativa
          </div>
        )}

        {/* Winning Number banner if closed */}
        {isClosed && raffle.winningNumber && (
          <div className="absolute bottom-2 left-3 right-3 rounded-xl bg-night/85 px-3 py-1.5 text-center text-xs font-bold text-glow backdrop-blur border border-glow/30">
            Bilhete Vencedor: #{raffle.winningNumber}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Organizer */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            <User className="h-3.5 w-3.5 text-brand" />
            <span className="truncate">{raffle.organizerName || 'Organizador'}</span>
          </div>

          {/* Title */}
          <h3 className="font-display text-base font-bold text-gray-900 line-clamp-2 dark:text-white group-hover:text-brand transition-colors">
            {raffle.name}
          </h3>

          {/* Draw Date */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5 text-gold" />
            <span>Sorteio: {raffle.drawDate ? new Date(raffle.drawDate).toLocaleDateString('pt-BR') : 'A definir'}</span>
          </div>
        </div>

        {/* Progress and Action */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            <span className="text-gray-500 dark:text-gray-400">Progresso</span>
            <span className="font-bold text-gray-800 dark:text-gray-200">{percent}%</span>
          </div>
          
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-brand to-glow transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* CTA button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRaffle(raffle);
            }}
            className="mt-3.5 w-full flex items-center justify-center gap-2 rounded-xl border border-brand/20 bg-brand-soft py-2 text-xs font-bold text-brand transition-all group-hover:bg-brand group-hover:text-night dark:border-brand/30 dark:bg-brand/10 dark:text-glow dark:group-hover:bg-brand dark:group-hover:text-night"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {isClosed ? 'Ver Resultado' : 'Participar da Rifa'}
          </button>
        </div>
      </div>
    </div>
  );
}
