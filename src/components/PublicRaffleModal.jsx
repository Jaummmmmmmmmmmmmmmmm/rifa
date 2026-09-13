import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Ticket, 
  Calendar, 
  User, 
  Check, 
  Copy, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  Phone,
  Trophy
} from 'lucide-react';

export default function PublicRaffleModal() {
  const { selectedRaffle, setSelectedRaffle, buyNumbers } = useApp();

  // Selection state
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [step, setStep] = useState('select'); // 'select' | 'form' | 'pix' | 'success'

  // Buyer Form
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');

  // Pix timer
  const [timeLeft, setTimeLeft] = useState(900); // 15 min
  const [copied, setCopied] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    if (!selectedRaffle) {
      setSelectedNumbers([]);
      setStep('select');
      setIsApproved(false);
    }
  }, [selectedRaffle]);

  useEffect(() => {
    if (step === 'pix' && timeLeft > 0 && !isApproved) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft, isApproved]);

  if (!selectedRaffle) return null;

  const totalNumbers = selectedRaffle.totalNumbers || 100;
  const soldCount = selectedRaffle.soldCount || 0;
  const price = selectedRaffle.pricePerNumber || 10;
  const isClosed = selectedRaffle.status === 'closed' || selectedRaffle.category === 'completed';

  // Toggle or select numbers
  const toggleNumber = (num) => {
    if (isClosed) return;
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(prev => prev.filter(n => n !== num));
    } else {
      setSelectedNumbers(prev => [...prev, num]);
    }
  };

  const addRandomNumbers = (count) => {
    if (isClosed) return;
    const available = [];
    for (let i = 1; i <= totalNumbers; i++) {
      if (i > soldCount && !selectedNumbers.includes(i)) {
        available.push(i);
      }
    }
    const shuffled = available.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    setSelectedNumbers(prev => [...new Set([...prev, ...selected])]);
  };

  const totalPrice = selectedNumbers.length * price;

  const handleProceedToForm = () => {
    if (selectedNumbers.length === 0) {
      alert('Selecione pelo menos 1 número para continuar.');
      return;
    }
    setStep('form');
  };

  const handleGeneratePix = (e) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      alert('Por favor, preencha seu nome e telefone.');
      return;
    }
    setStep('pix');
  };

  const handleSimulatePayment = () => {
    setIsApproved(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    buyNumbers(selectedRaffle.id, selectedNumbers.length, {
      name: buyerName,
      phone: buyerPhone,
      email: buyerEmail,
      numbers: selectedNumbers
    });
    setStep('success');
  };

  const copyPixCode = () => {
    const fakePix = `00020126580014br.gov.bcb.pix0136${selectedRaffle.id}-riffadigital520400005303986540${totalPrice}.005802BR5920RiffaDigital Brasil6009Sao Paulo62070503***6304ABCD`;
    navigator.clipboard.writeText(fakePix);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const formatMinutes = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 modal-backdrop animate-fade-up">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0D1B2A] max-h-[92vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="border-b border-gray-100 p-4 sm:p-5 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand dark:bg-brand/20 dark:text-glow">
              #{selectedRaffle.id}
            </span>
            <h3 className="font-display text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate max-w-xs sm:max-w-md">
              {selectedRaffle.name}
            </h3>
          </div>

          <button
            onClick={() => setSelectedRaffle(null)}
            aria-label="Fechar"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Raffle Hero Preview Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#10212C] border border-gray-200/60 dark:border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-4 p-4">
              <img
                src={selectedRaffle.imageUrl}
                alt={selectedRaffle.name}
                className="h-32 w-full md:w-48 object-cover rounded-xl shadow-md"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&q=80';
                }}
              />
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300">
                    <User className="h-3.5 w-3.5 text-brand" />
                    {selectedRaffle.organizerName || 'Organizador'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-gold" />
                    Sorteio: {selectedRaffle.drawDate ? new Date(selectedRaffle.drawDate).toLocaleDateString('pt-BR') : 'Em breve'}
                  </span>
                </div>

                <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  {selectedRaffle.name}
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {selectedRaffle.description}
                </p>

                <div className="mt-3 flex items-center justify-center md:justify-start gap-3">
                  <span className="text-xl font-extrabold text-brand dark:text-glow">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
                    <span className="text-xs font-normal text-gray-400"> / cota</span>
                  </span>

                  {isClosed && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                      <Trophy className="h-3 w-3" />
                      Ganhador: #{selectedRaffle.winningNumber || '0472'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 1: SELECT NUMBERS */}
          {step === 'select' && (
            <div className="space-y-6">
              
              {!isClosed ? (
                <>
                  {/* Quick Quantity Buttons */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                      ⚡ Escolha rápida de números da sorte:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[1, 5, 10, 20, 50].map((qty) => (
                        <button
                          key={qty}
                          onClick={() => addRandomNumbers(qty)}
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-brand/20 bg-brand-soft/40 py-2.5 px-3 text-xs font-bold text-brand hover:bg-brand hover:text-night dark:bg-brand/10 dark:text-glow dark:hover:bg-brand dark:hover:text-night transition-all active:scale-95"
                        >
                          <Sparkles className="h-3 w-3" />
                          +{qty} cotas
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number Grid Visual Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                        Selecione suas cotas ({selectedNumbers.length} selecionadas):
                      </span>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-gray-200 dark:bg-white/20" /> Disponível
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-brand" /> Escolhido
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-600" /> Pago
                        </span>
                      </div>
                    </div>

                    {/* Scrollable Number Grid */}
                    <div className="max-h-56 overflow-y-auto p-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/70 dark:bg-[#10212C]/60 grid grid-cols-6 sm:grid-cols-10 gap-1.5">
                      {[...Array(Math.min(100, totalNumbers))].map((_, i) => {
                        const num = i + 1;
                        const isSold = num <= soldCount;
                        const isSelected = selectedNumbers.includes(num);

                        return (
                          <button
                            key={num}
                            disabled={isSold}
                            onClick={() => toggleNumber(num)}
                            className={`h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                              isSold 
                                ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed line-through' 
                                : isSelected 
                                  ? 'bg-brand text-night shadow-md scale-105 ring-2 ring-glow' 
                                  : 'bg-white dark:bg-[#0D1B2A] text-gray-700 dark:text-gray-300 hover:border-brand border border-gray-200 dark:border-white/10'
                            }`}
                          >
                            {String(num).padStart(3, '0')}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-6 dark:border-blue-500/20 dark:bg-blue-950/20 text-center">
                  <Trophy className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <h4 className="font-bold text-base text-gray-900 dark:text-white">Rifa Finalizada!</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    Esta campanha foi encerrada com sucesso. O bilhete premiado foi o número #{selectedRaffle.winningNumber || '0472'}.
                  </p>
                </div>
              )}

            </div>
          )}

          {/* STEP 2: BUYER FORM */}
          {step === 'form' && (
            <form onSubmit={handleGeneratePix} className="space-y-4 animate-fade-up">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                Seus dados para emissão dos bilhetes:
              </h4>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  placeholder="Ex: João da Silva"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 dark:border-white/10 dark:bg-[#10212C] dark:text-white focus:border-brand focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Celular / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 dark:border-white/10 dark:bg-[#10212C] dark:text-white focus:border-brand focus:outline-none"
                    required
                  />
                  <p className="text-[11px] text-gray-400 mt-0.5">Enviaremos a confirmação por WhatsApp.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 dark:border-white/10 dark:bg-[#10212C] dark:text-white focus:border-brand focus:outline-none"
                  />
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="rounded-2xl border border-brand/20 bg-brand-soft/30 p-4 dark:bg-white/5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Cotas selecionadas:</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {selectedNumbers.map(n => `#${String(n).padStart(3, '0')}`).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm text-gray-900 dark:text-white pt-2 border-t border-brand/10">
                  <span>Total a pagar no Pix:</span>
                  <span className="text-brand dark:text-glow font-black text-base">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                  </span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: PIX PAYMENT */}
          {step === 'pix' && (
            <div className="space-y-6 text-center animate-fade-up">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300">
                <Clock className="h-3.5 w-3.5" />
                Pague em até {formatMinutes(timeLeft)} para garantir seus números
              </div>

              {/* Simulated QR Code */}
              <div className="mx-auto w-48 h-48 rounded-2xl bg-white p-3 shadow-lg border border-gray-200 flex flex-col items-center justify-center">
                <QrCode className="h-36 w-36 text-gray-900" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Pix Instantâneo</span>
              </div>

              {/* Copia e Cola Button */}
              <div className="max-w-md mx-auto">
                <button
                  onClick={copyPixCode}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-brand/40 bg-brand-soft py-3 px-4 text-xs font-bold text-brand hover:bg-brand hover:text-night transition dark:border-brand/40 dark:bg-brand/15 dark:text-glow dark:hover:bg-brand dark:hover:text-night"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Código Pix Copiado com Sucesso!' : 'Copiar Chave Pix Copia e Cola'}
                </button>
              </div>

              {/* Status pulse */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand"></span>
                </span>
                Aguardando confirmação bancária do pagamento...
              </div>

              {/* Simulated Instant Payment Trigger */}
              <div className="pt-2 border-t border-gray-100 dark:border-white/10">
                <button
                  onClick={handleSimulatePayment}
                  className="btn-shimmer inline-flex items-center gap-2 rounded-2xl px-6 py-2.5 text-xs font-black text-night shadow-lg hover:scale-105 transition"
                >
                  <Sparkles className="h-4 w-4" />
                  Simular Pagamento Aprovado Agora ⚡
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS RECEIPT */}
          {step === 'success' && (
            <div className="text-center space-y-4 py-4 animate-fade-up">
              <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-900/20">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                Pagamento Confirmado! 🎉
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                Parabéns, <strong>{buyerName}</strong>! Seus bilhetes foram registrados com sucesso no sistema oficial da RiffaDigital.
              </p>

              {/* Bilhetes Comprados */}
              <div className="rounded-2xl border border-brand/20 bg-brand-soft/30 p-4 max-w-md mx-auto dark:bg-white/5 text-left">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider block mb-2">
                  Seus Bilhetes da Sorte:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNumbers.map((num) => (
                    <span 
                      key={num}
                      className="rounded-lg bg-brand px-2.5 py-1 text-xs font-black text-night"
                    >
                      #{String(num).padStart(3, '0')}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedRaffle(null)}
                className="btn-shimmer rounded-2xl px-8 py-3 text-xs font-bold text-night shadow-md hover:scale-105 transition"
              >
                Concluir e Voltar
              </button>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Navigation */}
        {step !== 'success' && (
          <div className="border-t border-gray-100 p-4 dark:border-white/10 flex items-center justify-between">
            {step === 'select' && (
              <>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Total ({selectedNumbers.length} cotas):</span>
                  <span className="text-lg font-extrabold text-brand dark:text-glow">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                  </span>
                </div>

                {!isClosed ? (
                  <button
                    onClick={handleProceedToForm}
                    disabled={selectedNumbers.length === 0}
                    className="btn-shimmer flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-night shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition"
                  >
                    Participar Agora
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedRaffle(null)}
                    className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 dark:border-white/10 dark:text-gray-300"
                  >
                    Fechar
                  </button>
                )}
              </>
            )}

            {step === 'form' && (
              <>
                <button
                  onClick={() => setStep('select')}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 dark:border-white/10 dark:text-gray-300"
                >
                  Voltar
                </button>
                <button
                  onClick={handleGeneratePix}
                  className="btn-shimmer flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold text-night shadow-md hover:scale-[1.02] transition"
                >
                  Gerar Pix ({new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)})
                </button>
              </>
            )}

            {step === 'pix' && (
              <>
                <button
                  onClick={() => setStep('form')}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 dark:border-white/10 dark:text-gray-300"
                >
                  Voltar
                </button>
                <span className="text-xs text-gray-400">
                  Transação protegida por Stone (Pagar.me)
                </span>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
