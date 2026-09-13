import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  LayoutDashboard, 
  Ticket, 
  CircleDollarSign, 
  Trophy, 
  Share2, 
  Eye, 
  Sparkles, 
  Copy, 
  Check, 
  TrendingUp,
  Plus
} from 'lucide-react';

export default function DashboardModal() {
  const { 
    isDashboardOpen, 
    setIsDashboardOpen, 
    raffles, 
    drawWinner, 
    setSelectedRaffle, 
    setIsCreateOpen,
    user 
  } = useApp();

  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'draw'
  const [selectedForDraw, setSelectedForDraw] = useState(null);
  const [customWinNum, setCustomWinNum] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  if (!isDashboardOpen) return null;

  const myRaffles = raffles.slice(0, 5); // display active sample & user raffles

  const handleDraw = (raffleId) => {
    drawWinner(raffleId, customWinNum || null);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });
    alert('🎉 Sorteio realizado com sucesso! O vencedor foi apurado e registrado na campanha.');
    setSelectedForDraw(null);
    setCustomWinNum('');
  };

  const copyShareLink = (id) => {
    const url = `${window.location.origin}/#rifa-${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const formatMoney = (val) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(val);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 modal-backdrop animate-fade-up">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0D1B2A] max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="border-b border-gray-100 p-5 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand dark:bg-brand/20 dark:text-glow">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Painel do Organizador
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user ? `Bem-vindo(a), ${user.name}` : 'Acompanhamento em tempo real das suas vendas'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setIsDashboardOpen(false); setIsCreateOpen(true); }}
              className="btn-shimmer hidden sm:flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold text-night shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Nova Rifa
            </button>
            <button
              onClick={() => setIsDashboardOpen(false)}
              aria-label="Fechar"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="border-b border-gray-100 dark:border-white/10 px-5 flex items-center gap-4">
          <button
            onClick={() => setActiveTab('list')}
            className={`py-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'list'
                ? 'border-brand text-brand dark:text-glow'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Minhas Rifas & Gestão ({myRaffles.length})
          </button>
          <button
            onClick={() => setActiveTab('draw')}
            className={`py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'draw'
                ? 'border-brand text-brand dark:text-glow'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Trophy className="h-3.5 w-3.5" />
            Apurar Sorteio Oficial
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: LIST */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myRaffles.map((r) => {
                  const gross = (r.soldCount || 0) * (r.pricePerNumber || 10);
                  const net = gross * 0.92;
                  const percent = Math.min(100, Math.round(((r.soldCount || 0) / (r.totalNumbers || 100)) * 100));

                  return (
                    <div 
                      key={r.id}
                      className="rounded-2xl border border-gray-200/80 bg-gray-50/50 p-4 dark:border-white/10 dark:bg-[#10212C]/60 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold text-gray-400">#{r.id}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                            r.status === 'closed'
                              ? 'bg-blue-600 text-white'
                              : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                          }`}>
                            {r.status === 'closed' ? 'Concluída' : 'Ativa'}
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white line-clamp-1">
                          {r.name}
                        </h4>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 rounded-xl bg-white dark:bg-[#0D1B2A] border border-gray-100 dark:border-white/5">
                            <span className="text-gray-400 text-[10px]">Cotas Vendidas:</span>
                            <div className="font-bold text-gray-900 dark:text-white">
                              {r.soldCount || 0} / {r.totalNumbers} ({percent}%)
                            </div>
                          </div>

                          <div className="p-2 rounded-xl bg-white dark:bg-[#0D1B2A] border border-gray-100 dark:border-white/5">
                            <span className="text-gray-400 text-[10px]">Líquido a receber:</span>
                            <div className="font-bold text-brand dark:text-glow">
                              {formatMoney(net)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-white/5 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            setIsDashboardOpen(false);
                            setSelectedRaffle(r);
                          }}
                          className="flex items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-brand"
                        >
                          <Eye className="h-3.5 w-3.5" /> Ver Pública
                        </button>

                        <button
                          onClick={() => copyShareLink(r.id)}
                          className="flex items-center gap-1 text-xs font-semibold text-brand dark:text-glow"
                        >
                          {copiedId === r.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          {copiedId === r.id ? 'Copiado!' : 'Compartilhar'}
                        </button>

                        {r.status !== 'closed' && (
                          <button
                            onClick={() => {
                              setSelectedForDraw(r);
                              setActiveTab('draw');
                            }}
                            className="rounded-lg bg-gold/20 px-2 py-1 text-[11px] font-bold text-gold-deep dark:text-gold hover:bg-gold hover:text-night transition"
                          >
                            Sortear
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: DRAW WINNER */}
          {activeTab === 'draw' && (
            <div className="max-w-xl mx-auto space-y-6 py-4 animate-fade-up">
              <div className="text-center">
                <div className="h-12 w-12 bg-gold-soft text-gold-deep dark:bg-gold/15 dark:text-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="h-6 w-6" />
                </div>
                <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  Apurar Ganhador pela Loteria Federal
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Insira o número sorteado no concurso oficial da Caixa ou utilize o gerador seguro da RiffaDigital.
                </p>
              </div>

              {/* Select raffle to draw */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Selecione a Rifa para Sorteio:
                </label>
                <select
                  value={selectedForDraw?.id || ''}
                  onChange={(e) => {
                    const found = raffles.find(r => r.id === Number(e.target.value));
                    setSelectedForDraw(found || null);
                  }}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 dark:border-white/10 dark:bg-[#10212C] dark:text-white"
                >
                  <option value="">Selecione uma rifa...</option>
                  {raffles.filter(r => r.status !== 'closed').map(r => (
                    <option key={r.id} value={r.id}>
                      #{r.id} - {r.name} ({r.soldCount || 0} cotas vendidas)
                    </option>
                  ))}
                </select>
              </div>

              {selectedForDraw && (
                <div className="rounded-2xl border border-brand/20 bg-brand-soft/20 p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Número do 1º Prêmio da Loteria Federal (opcional):
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 0472 ou deixe em branco para sortear aleatório"
                      value={customWinNum}
                      onChange={(e) => setCustomWinNum(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-sm dark:border-white/10 dark:bg-[#0D1B2A] dark:text-white"
                    />
                  </div>

                  <button
                    onClick={() => handleDraw(selectedForDraw.id)}
                    className="btn-shimmer w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-extrabold text-night shadow-md hover:scale-[1.01]"
                  >
                    <Trophy className="h-4 w-4 text-night" />
                    Confirmar e Publicar Ganhador Oficial!
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
