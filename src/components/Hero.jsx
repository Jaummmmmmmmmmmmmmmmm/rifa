import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, TicketPlus, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  const { setIsCreateOpen, setIsLoginOpen, user, setIsDashboardOpen } = useApp();

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#0D1B2A] via-[#11283A] to-[#0C2F2B] text-white">
      {/* Background Animated Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-[.15]" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl animate-float-slow" />
        <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-gold/20 blur-3xl animate-float-mid" style={{ animationDelay: '1.4s' }} />
        <div className="absolute -bottom-16 -right-20 h-64 w-64 rounded-full bg-glow/15 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand/8 blur-[80px] animate-float-mid" style={{ animationDelay: '0.7s' }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          
          {/* Left Column: Copywriting & CTAs */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-glow ring-1 ring-brand/30">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Crie e venda em poucos dias
            </span>

            <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-[3.4rem]">
              Transforme suas ideias <span className="text-brand">em rifas online</span>, com poucos cliques🚀
            </h1>

            <p className="mt-5 text-sm leading-7 text-slate-200 sm:text-base md:max-w-[48ch]">
              Da cobrança via Pix ao acompanhamento das vendas, a RiffaDigital entrega{' '}
              <span className="font-semibold text-white">clareza operacional, confiança e ritmo</span> para quem quer vender melhor.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-start md:mt-8 animate-fade-up stagger-4">
              <button
                onClick={() => setIsCreateOpen(true)}
                className="btn-shimmer animate-glow-pulse relative inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-base font-bold text-night shadow-lg shadow-brand/30 transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <TicketPlus className="mr-2 h-5 w-5 text-night" />
                Criar minha rifa
              </button>

              <button
                onClick={() => user ? setIsDashboardOpen(true) : setIsLoginOpen(true)}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                {user ? 'Acessar meu painel' : 'Acessar minhas rifas'}
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-200/90 md:justify-start animate-fade-up stagger-5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand"></span>
                </span>
                <span>Pix com infraestrutura <strong>Stone (Pagar.me)</strong></span>
              </div>
              
              <div className="hidden h-3 w-px bg-white/20 sm:block"></div>
              
              <div className="hidden items-center gap-1.5 sm:flex">
                <span className="inline-block h-2 w-2 rounded-full bg-gold"></span>
                <span>Baixa automática e gestão centralizada</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mobile App Preview Mockup */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none animate-fade-up stagger-3">
            <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-brand/20 via-white/5 to-gold/10 border border-white/10 shadow-2xl">
              <img
                src="/mobile-app.png"
                alt="Preview do painel de controle da RiffaDigital"
                className="w-full h-auto rounded-2xl animate-float-mid object-contain shadow-2xl"
                loading="eager"
              />
              
              {/* Floating Highlight Pill */}
              <div className="absolute -bottom-3 -left-3 sm:-left-6 rounded-2xl border border-brand/30 bg-[#10212C]/90 p-3 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 font-medium">Confirmação Pix</div>
                  <div className="text-sm font-bold text-white">Baixa em segundos ⚡</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
