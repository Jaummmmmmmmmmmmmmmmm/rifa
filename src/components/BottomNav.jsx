import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Ticket, TicketPlus, LayoutDashboard, CircleDollarSign } from 'lucide-react';

export default function BottomNav() {
  const { setIsCreateOpen, setIsDashboardOpen, user, setIsLoginOpen } = useApp();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 dark:bg-[#0D1B2A]/95 border-t border-gray-200 dark:border-white/10 backdrop-blur-lg px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around">
        
        {/* Início */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex flex-col items-center gap-1 p-1 text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-glow"
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-semibold">Início</span>
        </button>

        {/* Vitrine */}
        <button
          onClick={() => scrollTo('vitrine')}
          className="flex flex-col items-center gap-1 p-1 text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-glow"
        >
          <Ticket className="h-5 w-5" />
          <span className="text-[10px] font-semibold">Vitrine</span>
        </button>

        {/* Criar Rifa Central Prominent Button */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex flex-col items-center -mt-5"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand to-glow text-night shadow-lg shadow-brand/40 ring-4 ring-white dark:ring-[#0D1B2A] transition-transform active:scale-95">
            <TicketPlus className="h-6 w-6" strokeWidth={2.4} />
          </div>
          <span className="text-[10px] font-extrabold text-brand dark:text-glow mt-1">Criar</span>
        </button>

        {/* Preços */}
        <button
          onClick={() => scrollTo('precos')}
          className="flex flex-col items-center gap-1 p-1 text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-glow"
        >
          <CircleDollarSign className="h-5 w-5" />
          <span className="text-[10px] font-semibold">Preços</span>
        </button>

        {/* Dashboard */}
        <button
          onClick={() => user ? setIsDashboardOpen(true) : setIsLoginOpen(true)}
          className="flex flex-col items-center gap-1 p-1 text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-glow"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[10px] font-semibold">Painel</span>
        </button>

      </div>
    </nav>
  );
}
