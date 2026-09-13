import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, MessageCircle, Clock, Headphones } from 'lucide-react';

export default function SupportSection() {
  const { setIsChatOpen } = useApp();

  return (
    <section id="suporte" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-brand/15 bg-white/85 p-6 sm:p-8 shadow-sm backdrop-blur-md transition-all hover:shadow-md dark:border-white/10 dark:bg-[#0D1B2A]/80">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand dark:bg-brand/15 dark:text-glow">
            <Headphones className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
              Suporte RiffaDigital
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Precisou de ajuda ou encontrou algum problema na plataforma? Fale com nosso time agora mesmo.
            </p>
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Email button */}
          <a
            href="mailto:riffadigital@mhtechconsultoria.com?subject=Suporte%20RiffaDigital&body=Olá%20time%20RiffaDigital,%0D%0A%0D%0AEstou%20com%20uma%20dúvida/problema%20em:%0D%0A%0D%0ADetalhes:%0D%0A%0D%0AObrigado."
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl border border-brand/15 bg-white py-3.5 px-5 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:border-brand/40 hover:shadow-md dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:hover:border-brand/40"
          >
            <Mail className="h-5 w-5 text-brand" />
            <span>Enviar E-mail para Suporte</span>
          </a>

          {/* Chat button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl border border-brand/40 bg-brand py-3.5 px-5 text-sm font-bold text-night shadow-md transition-all hover:bg-glow active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5 text-night" />
            <span>Falar com o suporte via chat</span>
          </button>

        </div>

        {/* Footer info */}
        <div className="mt-5 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3.5 w-3.5 text-brand" />
          <span>Horário de atendimento: <strong className="text-gray-700 dark:text-gray-200">seg–sex, 9h–18h (BRT)</strong>. Tempo médio de resposta: <strong className="text-gray-700 dark:text-gray-200">até 1 dia útil</strong>.</span>
        </div>

      </div>
    </section>
  );
}
