import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  ArrowLeft, 
  ExternalLink, 
  RefreshCw, 
  Check, 
  Save, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Sliders, 
  Calendar,
  Sparkles,
  AlertCircle,
  Wallet,
  Banknote,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

export default function HiluxAdmin({ onBackToSite }) {
  const { raffles, updateRaffle } = useApp();

  // Find the Hilux raffle (id 7777 or by name)
  const hilux = raffles.find(r => r.id === 7777) || raffles[0] || {
    id: 7777,
    name: 'Toyota Hilux 2.8 Turbo 4x4 Diesel Automática',
    totalNumbers: 10000,
    soldCount: 3,
    pricePerNumber: 10,
    organizerName: 'Jonathan',
    status: 'active'
  };

  const [soldCount, setSoldCount] = useState(hilux.soldCount || 3);
  const [organizerName, setOrganizerName] = useState(hilux.organizerName || 'Jonathan');
  const [pricePerNumber, setPricePerNumber] = useState(hilux.pricePerNumber || 10);
  const [customInput, setCustomInput] = useState(String(hilux.soldCount || 3));
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Sync state if hilux updates from another tab or database
  useEffect(() => {
    if (hilux) {
      setSoldCount(hilux.soldCount || 0);
      setOrganizerName(hilux.organizerName || 'Jonathan');
      setPricePerNumber(hilux.pricePerNumber || 10);
      setCustomInput(String(hilux.soldCount || 0));
    }
  }, [hilux.soldCount, hilux.organizerName, hilux.pricePerNumber]);

  const applyChanges = (newCount, newOrg = organizerName, newPrice = pricePerNumber) => {
    const validCount = Math.max(0, Math.min(hilux.totalNumbers || 10000, Number(newCount)));
    setSoldCount(validCount);
    setCustomInput(String(validCount));

    updateRaffle(hilux.id, {
      soldCount: validCount,
      organizerName: newOrg,
      pricePerNumber: Number(newPrice)
    });

    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleIncrement = (amount) => {
    applyChanges(soldCount + amount);
  };

  const handleDecrement = (amount) => {
    applyChanges(soldCount - amount);
  };

  const handleSaveOrganizer = (e) => {
    e.preventDefault();
    applyChanges(soldCount, organizerName, pricePerNumber);
  };

  // Cálculos financeiros automáticos (ex: 5 rifas = R$ 50,00)
  const unitPrice = Number(pricePerNumber) || 10;
  const totalRevenue = soldCount * unitPrice;
  const totalPotential = (hilux.totalNumbers || 10000) * unitPrice;
  const remainingToCollect = Math.max(0, totalPotential - totalRevenue);
  const percentSold = ((soldCount / (hilux.totalNumbers || 10000)) * 100).toFixed(2);

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(val);

  return (
    <div className="min-h-screen bg-[#070F18] text-slate-100 font-sans pb-20">
      
      {/* Top Banner Bar */}
      <header className="sticky top-0 z-40 border-b border-emerald-500/20 bg-[#0A1624]/90 backdrop-blur-md px-4 py-3 sm:px-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Site Principal
          </button>
          
          <div className="h-6 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Painel Admin Hilux (Tempo Real Conectado)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Abrir Site Principal em 2ª Aba
          </a>
        </div>
      </header>

      {/* Floating Save Toast */}
      {showSavedToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500 px-4 py-2.5 text-xs font-black text-slate-950 shadow-2xl shadow-emerald-500/30 animate-bounce">
          <Check className="h-4 w-4 stroke-[3]" />
          Sincronizado instantaneamente com o Site Principal!
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Title & Info Banner */}
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-[#0C1B2A] via-[#0E2333] to-[#0A1D27] p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-56 h-36 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-lg flex-shrink-0 bg-slate-900">
              <img 
                src={hilux.imageUrl || '/hilux-rifa.jpg'} 
                alt="Hilux" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&q=80';
                }}
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-black text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                Rifa ID: #{hilux.id} • Controle Exclusivo de Administrador
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {hilux.name}
              </h1>

              <p className="text-xs text-slate-400 max-w-2xl">
                Qualquer alteração feita neste painel reflete <strong>imediatamente e ao vivo</strong> em todas as abas abertas e no site principal, sem precisar recarregar.
              </p>
            </div>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-[#0B1724] p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Cotas Vendidas</span>
              <Users className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {soldCount.toLocaleString('pt-BR')}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              de {hilux.totalNumbers?.toLocaleString('pt-BR')} disponíveis
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B1724] p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Saldo Arrecadado</span>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {formatCurrency(totalRevenue)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {unitPrice} BRL por bilhete
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B1724] p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Progresso Real</span>
              <TrendingUp className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              {percentSold}%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              calculado na hora
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B1724] p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Organizador Atual</span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white truncate">
              {organizerName}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <Check className="h-3 w-3" /> Exibido no card do site
            </div>
          </div>
        </div>

        {/* NOVA SEÇÃO: SALDO EM CONTA & CÁLCULOS AUTOMÁTICOS */}
        <div className="rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-[#0B1D2C] via-[#091824] to-[#07131D] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Subtle glow in background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            
            {/* Header with status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Painel de Saldo & Financeiro (Hilux)
                    </h2>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Cálculo Automático
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fórmula em tempo real: <strong className="text-emerald-300">{soldCount} cotas vendidas</strong> × <strong className="text-emerald-300">{formatCurrency(unitPrice)}</strong> = <strong className="text-emerald-400 font-black">{formatCurrency(totalRevenue)}</strong>
                  </p>
                </div>
              </div>

              {/* Botão de Saque */}
              <button
                onClick={() => {
                  alert(`💰 Solicitação de Saque Pix iniciada!\n\nValor Disponível: ${formatCurrency(totalRevenue)}\nDestinatário: ${organizerName}\nChave Pix: Cadastrada para a campanha\n\nStatus: Saldo 100% liberado para liquidação.`);
                }}
                className="btn-shimmer flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-black text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition"
              >
                <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                <span>Solicitar Saque Pix</span>
              </button>
            </div>

            {/* Big Balance Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Saldo Total Disponível */}
              <div className="md:col-span-2 rounded-2xl border border-emerald-500/30 bg-[#071420]/80 p-6 flex flex-col justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Saldo Líquido em Conta (Disponível para Pix):
                </span>
                
                <div className="my-3 flex flex-wrap items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                    {formatCurrency(totalRevenue)}
                  </span>
                  <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300">
                    {soldCount} cotas × {formatCurrency(unitPrice)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Chave Pix ativa para {organizerName}
                  </span>
                  <span>•</span>
                  <span>Sem taxa de bloqueio</span>
                  <span>•</span>
                  <span>Liquidação Pix Imediata</span>
                </div>
              </div>

              {/* Meta Total & Projeção */}
              <div className="rounded-2xl border border-white/10 bg-[#071420]/60 p-5 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Meta Financeira Total (100%):
                  </span>
                  <span className="text-2xl font-extrabold text-white">
                    {formatCurrency(totalPotential)}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    10.000 cotas a {formatCurrency(unitPrice)}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Falta arrecadar:</span>
                    <span className="font-bold text-amber-400">
                      {formatCurrency(remainingToCollect)}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, Number(percentSold))}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Calculadora / Tabela de Exemplos Rápidos com Cálculo Automático */}
            <div className="rounded-2xl border border-white/5 bg-[#050D15] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Banknote className="h-3.5 w-3.5 text-emerald-400" />
                  Calculadora Rápida (Clique para simular vendas e saldo na hora):
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Atualiza as vendas e o saldo em tempo real
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {[
                  { qty: 5, label: '5 Rifas', val: formatCurrency(5 * unitPrice) },
                  { qty: 10, label: '10 Rifas', val: formatCurrency(10 * unitPrice) },
                  { qty: 50, label: '50 Rifas', val: formatCurrency(50 * unitPrice) },
                  { qty: 100, label: '100 Rifas', val: formatCurrency(100 * unitPrice) },
                  { qty: 409, label: '409 Rifas', val: formatCurrency(409 * unitPrice) },
                  { qty: 1000, label: '1.000 Rifas', val: formatCurrency(1000 * unitPrice) }
                ].map((item) => (
                  <button
                    key={item.qty}
                    onClick={() => applyChanges(item.qty)}
                    className={`rounded-xl border p-2.5 text-left transition active:scale-95 flex flex-col justify-between ${
                      soldCount === item.qty
                        ? 'border-emerald-500 bg-emerald-500/20 text-white shadow-md'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-emerald-500/40 hover:bg-emerald-500/10'
                    }`}
                  >
                    <span className="text-[11px] font-semibold text-slate-400">{item.label}</span>
                    <span className="text-sm font-black text-emerald-400">{item.val}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 1: SALES CONTROLLER */}
        <div className="rounded-3xl border border-emerald-500/30 bg-[#0A1624] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Sliders className="h-5 w-5 text-emerald-400" />
                Controle de Vendas de Cotas (Adicionar & Remover)
              </h2>
              <p className="text-xs text-slate-400">
                Aumente ou diminua as vendas da Hilux com 1 clique ou defina um valor exato.
              </p>
            </div>

            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl self-start sm:self-auto">
              Vendas Atuais: {soldCount}
            </span>
          </div>

          {/* Stepper controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4 bg-[#070F18]/80 p-4 rounded-2xl border border-white/5">
            {/* Decrements */}
            <button
              onClick={() => handleDecrement(100)}
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500 hover:text-white transition active:scale-95"
            >
              -100
            </button>
            <button
              onClick={() => handleDecrement(50)}
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500 hover:text-white transition active:scale-95"
            >
              -50
            </button>
            <button
              onClick={() => handleDecrement(10)}
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500 hover:text-white transition active:scale-95"
            >
              -10
            </button>
            <button
              onClick={() => handleDecrement(5)}
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500 hover:text-white transition active:scale-95"
            >
              -5
            </button>
            <button
              onClick={() => handleDecrement(1)}
              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-black text-rose-400 hover:bg-rose-500 hover:text-white transition active:scale-95"
            >
              -1
            </button>

            {/* Current Big Display */}
            <div className="px-6 py-2 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500 text-center min-w-[120px]">
              <span className="block text-2xl font-black text-emerald-400 tracking-wider">
                {soldCount}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                cotas vendidas
              </span>
            </div>

            {/* Increments */}
            <button
              onClick={() => handleIncrement(1)}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-3.5 py-2 text-xs font-black text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition active:scale-95"
            >
              +1
            </button>
            <button
              onClick={() => handleIncrement(5)}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition active:scale-95"
            >
              +5
            </button>
            <button
              onClick={() => handleIncrement(10)}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition active:scale-95"
            >
              +10
            </button>
            <button
              onClick={() => handleIncrement(50)}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition active:scale-95"
            >
              +50
            </button>
            <button
              onClick={() => handleIncrement(100)}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition active:scale-95"
            >
              +100
            </button>
          </div>

          {/* Direct Input & Presets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Custom Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Digitar Quantidade Exata de Vendas:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max={hilux.totalNumbers || 10000}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="flex-1 rounded-xl border border-white/15 bg-[#070F18] px-4 py-2.5 text-sm font-bold text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Ex: 5"
                />
                <button
                  onClick={() => applyChanges(customInput)}
                  className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-black text-slate-950 hover:bg-emerald-400 transition shadow-md active:scale-95"
                >
                  Definir Agora
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Atalhos Rápidos de Vendas:
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => applyChanges(5)}
                  className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition"
                >
                  ⚡ 5 Vendas (R$ 50,00)
                </button>
                <button
                  onClick={() => applyChanges(10)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition"
                >
                  10 Vendas (R$ 100)
                </button>
                <button
                  onClick={() => applyChanges(50)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition"
                >
                  50 Vendas (R$ 500)
                </button>
                <button
                  onClick={() => applyChanges(100)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition"
                >
                  100 Vendas (R$ 1.000)
                </button>
                <button
                  onClick={() => applyChanges(0)}
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500 hover:text-white transition"
                >
                  Zerar (0)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: ORGANIZER & DETAILS CONTROLLER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Organizer Card */}
          <div className="rounded-3xl border border-white/10 bg-[#0A1624] p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-400" />
              Nome do Organizador da Hilux
            </h3>
            <p className="text-xs text-slate-400">
              Nome exibido no card oficial e nos detalhes da rifa para os compradores.
            </p>

            <form onSubmit={handleSaveOrganizer} className="space-y-3">
              <input
                type="text"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                placeholder="Ex: Jonathan"
                className="w-full rounded-xl border border-white/15 bg-[#070F18] px-4 py-2.5 text-sm font-bold text-white focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-500 py-2.5 text-xs font-black text-slate-950 hover:bg-emerald-400 transition active:scale-95"
              >
                <Save className="h-4 w-4" />
                Salvar Nome do Organizador
              </button>
            </form>
          </div>

          {/* Price & Status Card */}
          <div className="rounded-3xl border border-white/10 bg-[#0A1624] p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              Preço por Cota & Status
            </h3>
            <p className="text-xs text-slate-400">
              Valor unitário do bilhete e situação atual da campanha.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Preço por Cota (R$):</label>
                <input
                  type="number"
                  step="0.50"
                  value={pricePerNumber}
                  onChange={(e) => {
                    setPricePerNumber(e.target.value);
                    applyChanges(soldCount, organizerName, e.target.value);
                  }}
                  className="w-full rounded-xl border border-white/15 bg-[#070F18] px-3.5 py-2 text-sm font-bold text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Status da Rifa:</label>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold text-emerald-400 flex items-center justify-between">
                  <span>Ativa</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#070F18] p-3 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span>Sorteio agendado: <strong>31/10/2026</strong> pela Loteria Federal</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: LIVE PREVIEW OF NUMBERS */}
        <div className="rounded-3xl border border-white/10 bg-[#0A1624] p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white">
                Demonstração ao Vivo dos Bilhetes (Primeiros 50 Números)
              </h3>
              <p className="text-xs text-slate-400">
                Os números de <strong>1 até {soldCount}</strong> constam como já vendidos/pagos no site principal.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-slate-400">
                <span className="h-3 w-3 rounded bg-rose-500/30 border border-rose-500/50" />
                Vendido ({soldCount})
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="h-3 w-3 rounded bg-emerald-500/20 border border-emerald-500/40" />
                Disponível ({Math.max(0, 10000 - soldCount)})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 p-3 rounded-2xl bg-[#070F18] border border-white/5 max-h-52 overflow-y-auto">
            {[...Array(50)].map((_, idx) => {
              const num = idx + 1;
              const isSold = num <= soldCount;

              return (
                <div
                  key={num}
                  className={`h-8 rounded-lg text-xs font-bold flex items-center justify-center border transition-all ${
                    isSold
                      ? 'border-rose-500/30 bg-rose-500/15 text-rose-300 line-through'
                      : 'border-white/10 bg-white/5 text-slate-300'
                  }`}
                >
                  {String(num).padStart(3, '0')}
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
