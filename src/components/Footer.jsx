import React from 'react';
import { Ticket, Mail, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-12 pb-8 dark:border-white/10 dark:bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand to-glow text-night shadow-md">
                <Ticket className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Riffa<span className="text-brand dark:text-glow">Digital</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 max-w-sm">
              Estrutura para organizar, vender e acompanhar rifas com mais confiança, clareza operacional e ritmo de crescimento.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep dark:border-gold/20 dark:bg-gold/10 dark:text-gold">
              Fintech para organizadores
            </div>
          </div>

          {/* Col 2: Useful Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Links Úteis
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#hero" className="hover:text-brand dark:hover:text-glow transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#vitrine" className="hover:text-brand dark:hover:text-glow transition-colors">
                  Vitrine de Rifas
                </a>
              </li>
              <li>
                <a href="#precos" className="hover:text-brand dark:hover:text-glow transition-colors">
                  Planos e Simulador de Preços
                </a>
              </li>
              <li>
                <a href="#recursos" className="hover:text-brand dark:hover:text-glow transition-colors">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-brand dark:hover:text-glow transition-colors">
                  Blog RiffaDigital
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand dark:hover:text-glow transition-colors">
                  Termos de Uso & Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Security */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Segurança & Contato
            </h4>

            {/* Social & Contact */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/riffadigital/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram RiffaDigital"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:text-brand hover:border-brand dark:border-white/10 dark:text-gray-300 transition"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="mailto:riffadigital@mhtechconsultoria.com"
                aria-label="Email RiffaDigital"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 hover:text-brand hover:border-brand dark:border-white/10 dark:text-gray-300 transition"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>

            {/* Stone Pagar.me badge */}
            <div className="rounded-2xl border border-brand/15 bg-gray-50/80 p-4 dark:border-white/10 dark:bg-[#10212C]">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-900 dark:text-white">
                <ShieldCheck className="h-4 w-4 text-brand" />
                Pagamento seguro integrado
              </div>
              <img 
                src="/selo_pagarme.webp" 
                alt="Pagar.me Stone" 
                className="h-6 w-auto object-contain opacity-90 mb-2" 
              />
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Checkout e carteira digital processadas pela Pagar.me (Uma empresa da Stone Co).
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div>
            © 2026 RiffaDigital • Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1">
            Feito com <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" /> para organizadores em todo o Brasil
          </div>
        </div>

      </div>
    </footer>
  );
}
