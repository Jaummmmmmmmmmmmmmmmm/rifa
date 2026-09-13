import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Ticket, 
  Calendar, 
  Image as ImageIcon, 
  ShieldCheck, 
  CircleDollarSign, 
  Check,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function CreateRaffleModal() {
  const { isCreateOpen, setIsCreateOpen, addRaffle, setSelectedRaffle } = useApp();

  // Wizard Step: 1 to 5
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [pricePerNumber, setPricePerNumber] = useState(10);
  const [totalNumbers, setTotalNumbers] = useState(100);
  const [drawDate, setDrawDate] = useState('2026-11-20');
  
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const [plan, setPlan] = useState('basic'); // 'starter' | 'basic' | 'custom'
  const [pixKeyType, setPixKeyType] = useState('cpf');
  const [pixKey, setPixKey] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  if (!isCreateOpen) return null;

  // AI Description Generator Simulation
  const handleGenerateAI = () => {
    if (!name) {
      alert('Por favor, digite o título da rifa primeiro!');
      return;
    }
    setIsGeneratingAI(true);
    setTimeout(() => {
      setDescription(
        `🎉 Concorra ao incrível prêmio "${name}"!\n\n` +
        `✅ Apenas R$ ${pricePerNumber},00 por número!\n` +
        `📅 Sorteio transparente pela Loteria Federal previsto para ${drawDate ? new Date(drawDate).toLocaleDateString('pt-BR') : 'breve'}.\n` +
        `⚡ Pagamento rápido e seguro via Pix com confirmação automática.\n\n` +
        `Garanta seus números da sorte agora mesmo e boa sorte!`
      );
      setIsGeneratingAI(false);
    }, 800);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Preencha o título da rifa!');
      setStep(1);
      return;
    }

    const created = addRaffle({
      name,
      pricePerNumber: Number(pricePerNumber),
      totalNumbers: Number(totalNumbers),
      drawDate,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&q=80',
      description,
      plan,
      pixKey,
      organizerName: organizerName || 'Organizador RiffaDigital',
      whatsapp,
      category: 'today'
    });

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsCreateOpen(false);
    setSelectedRaffle(created);
  };

  const progressPercentage = (step / 5) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-up">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0D1B2A] max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="border-b border-gray-100 p-5 dark:border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-brand dark:bg-brand/20 dark:text-glow">
                Etapa {step} de 5
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {step === 1 && 'Resumo & Números'}
                {step === 2 && 'Fotos & Apresentação com IA'}
                {step === 3 && 'Escolha do Plano'}
                {step === 4 && 'Chave Pix de Recebimento'}
                {step === 5 && 'Contato & Finalização'}
              </span>
            </div>
            <h3 className="font-display mt-1 text-lg font-bold text-gray-900 dark:text-white">
              Criar Nova Rifa Online
            </h3>
          </div>

          <button
            onClick={() => setIsCreateOpen(false)}
            aria-label="Fechar"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5">
          <div 
            className="h-full bg-gradient-to-r from-brand to-glow transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Modal Content Scrollable */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: RESUMO */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-up">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Qual será o Título da sua Rifa? *
                </label>
                <input
                  type="text"
                  placeholder="Ex: iPhone 15 Pro Max ou R$ 5.000 no Pix"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-brand focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:focus:border-brand"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Valor de cada número (R$) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={pricePerNumber}
                    onChange={(e) => setPricePerNumber(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-brand focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:focus:border-brand"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Sugestão: R$ 5,00, R$ 10,00 ou R$ 20,00</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Quantidade de Números *
                  </label>
                  <select
                    value={totalNumbers}
                    onChange={(e) => setTotalNumbers(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-brand focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:focus:border-brand"
                  >
                    <option value={50}>50 números (Plano Starter)</option>
                    <option value={100}>100 números (Mais popular)</option>
                    <option value={200}>200 números</option>
                    <option value={500}>500 números</option>
                    <option value={1000}>1.000 números</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Data prevista do sorteio
                </label>
                <input
                  type="date"
                  value={drawDate}
                  onChange={(e) => setDrawDate(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-brand focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:focus:border-brand"
                />
                <p className="text-[11px] text-gray-400 mt-1">Poderá ser alterada depois até a apuração do sorteio.</p>
              </div>

              {/* Live Preview of Projected Gross */}
              <div className="rounded-2xl border border-brand/20 bg-brand-soft/30 p-4 dark:bg-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Arrecadação prevista:</span>
                  <div className="text-lg font-bold text-brand dark:text-glow">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pricePerNumber * totalNumbers)}
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {totalNumbers} cotas × R$ {pricePerNumber},00
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: O VISUAL & IA */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-up">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  URL da Imagem de Capa do Prêmio
                </label>
                <input
                  type="url"
                  placeholder="https://exemplo.com/foto-do-premio.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-brand focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:focus:border-brand"
                />
                <p className="text-[11px] text-gray-400 mt-1">Se deixar em branco, usaremos uma foto ilustrativa de alta qualidade.</p>
              </div>

              {/* Quick Image Suggestions */}
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setImageUrl('https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&q=80')}
                  className="rounded-xl border border-gray-200 dark:border-white/10 px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:border-brand"
                >
                  Exemplo: Eletrônicos
                </button>
                <button
                  type="button"
                  onClick={() => setImageUrl('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80')}
                  className="rounded-xl border border-gray-200 dark:border-white/10 px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:border-brand"
                >
                  Exemplo: Moto / Carro
                </button>
                <button
                  type="button"
                  onClick={() => setImageUrl('https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&q=80')}
                  className="rounded-xl border border-gray-200 dark:border-white/10 px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:border-brand"
                >
                  Exemplo: Pix em Dinheiro
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Descrição Detalhada do Prêmio
                  </label>
                  
                  {/* AI Generator Button */}
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={isGeneratingAI}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-brand-soft px-3 py-1 text-xs font-bold text-brand hover:bg-brand dark:bg-brand/15 dark:text-glow dark:hover:bg-brand dark:hover:text-night transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {isGeneratingAI ? 'Gerando com IA...' : '✨ Gerar descrição com IA'}
                  </button>
                </div>
                
                <textarea
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Escreva detalhes sobre o prêmio, regras e condições do sorteio..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-brand focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:focus:border-brand"
                />
              </div>
            </div>
          )}

          {/* STEP 3: PLANO */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-up">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Selecione o plano de comissão para a sua rifa. Não há mensalidades: a comissão só é deduzida quando houver vendas pagas!
              </p>

              <div className="space-y-3">
                
                {/* Starter */}
                <div
                  onClick={() => setPlan('starter')}
                  className={`cursor-pointer rounded-2xl border p-4 flex items-center justify-between transition-all ${
                    plan === 'starter'
                      ? 'border-brand bg-brand-soft/40 ring-2 ring-brand/20 dark:bg-brand/10'
                      : 'border-gray-200 dark:border-white/10'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-gray-900 dark:text-white">Plano Starter</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Para rifas com até 50 cotas</div>
                    <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      Você recebe 90% das vendas
                    </div>
                  </div>
                  <div className="text-xl font-extrabold text-brand dark:text-glow">10%</div>
                </div>

                {/* Basic */}
                <div
                  onClick={() => setPlan('basic')}
                  className={`relative cursor-pointer rounded-2xl border p-4 flex items-center justify-between transition-all ${
                    plan === 'basic'
                      ? 'border-brand bg-brand-soft/40 ring-2 ring-brand/20 dark:bg-brand/10'
                      : 'border-gray-200 dark:border-white/10'
                  }`}
                >
                  <span className="absolute -top-2.5 right-4 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-night">
                    Mais recomendado
                  </span>
                  <div>
                    <div className="font-bold text-sm text-gray-900 dark:text-white">Plano Básico</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Para rifas com até 100 cotas</div>
                    <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      Você recebe 92% das vendas
                    </div>
                  </div>
                  <div className="text-xl font-extrabold text-brand dark:text-glow">8%</div>
                </div>

                {/* Custom */}
                <div
                  onClick={() => setPlan('custom')}
                  className={`cursor-pointer rounded-2xl border p-4 flex items-center justify-between transition-all ${
                    plan === 'custom'
                      ? 'border-brand bg-brand-soft/40 ring-2 ring-brand/20 dark:bg-brand/10'
                      : 'border-gray-200 dark:border-white/10'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-gray-900 dark:text-white">Plano Personalizado</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Para rifas acima de 100 cotas até 10.000</div>
                    <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      Você recebe 94% das vendas
                    </div>
                  </div>
                  <div className="text-xl font-extrabold text-brand dark:text-glow">6%</div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 4: RECEBIMENTO */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-up">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Tipo de Chave Pix para Recebimento
                </label>
                <select
                  value={pixKeyType}
                  onChange={(e) => setPixKeyType(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-brand focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:focus:border-brand"
                >
                  <option value="cpf">CPF / CNPJ</option>
                  <option value="email">E-mail</option>
                  <option value="phone">Telefone / Celular</option>
                  <option value="random">Chave Aleatória</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Sua Chave Pix *
                </label>
                <input
                  type="text"
                  placeholder="Digite sua chave Pix..."
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-brand focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:focus:border-brand"
                />
                <p className="text-[11px] text-gray-400 mt-1">Os valores das cotas vendidas serão transferidos para esta conta.</p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-500/20 dark:bg-emerald-950/20 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-800 dark:text-emerald-200">
                  <strong>Processamento Seguro Stone (Pagar.me):</strong> Seus dados bancários são protegidos com criptografia de ponta a ponta e auditoria bancária regular.
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: SOCIAL E CONTATO */}
          {step === 5 && (
            <div className="space-y-4 animate-fade-up">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Nome do Organizador ou Instituição *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Amanda Silva ou ONG Patinhas"
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-brand focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  WhatsApp para contato com compradores *
                </label>
                <input
                  type="text"
                  placeholder="(11) 99999-9999"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-brand focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:focus:border-brand"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="rounded border-gray-300 text-brand focus:ring-brand"
                />
                <label htmlFor="terms" className="text-xs text-gray-600 dark:text-gray-300">
                  Concordo com os Termos de Uso e Política de Sorteios da RiffaDigital.
                </label>
              </div>

              {/* Ready Summary */}
              <div className="rounded-2xl border border-brand/20 bg-brand-soft/30 p-4 dark:bg-white/5 space-y-1 text-xs">
                <div className="font-bold text-gray-900 dark:text-white">Resumo da sua campanha:</div>
                <div className="text-gray-600 dark:text-gray-300">• Título: {name || 'Não informado'}</div>
                <div className="text-gray-600 dark:text-gray-300">• {totalNumbers} cotas a R$ {pricePerNumber},00 cada</div>
                <div className="text-gray-600 dark:text-gray-300">• Previsão do Sorteio: {drawDate ? new Date(drawDate).toLocaleDateString('pt-BR') : 'A definir'}</div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-gray-100 p-4 sm:p-5 dark:border-white/10 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => {
                if (step === 1 && !name) {
                  alert('Por favor, informe o título da rifa.');
                  return;
                }
                setStep(prev => prev + 1);
              }}
              className="btn-shimmer flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold text-night shadow-sm hover:scale-[1.01]"
            >
              Avançar
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="btn-shimmer animate-glow-pulse flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-extrabold text-night shadow-lg shadow-brand/30 hover:scale-[1.02]"
            >
              <CheckCircle2 className="h-4 w-4" />
              Publicar minha Rifa Agora!
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
