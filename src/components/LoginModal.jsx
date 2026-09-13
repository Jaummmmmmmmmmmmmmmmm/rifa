import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginModal() {
  const { isLoginOpen, setIsLoginOpen, login } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isLoginOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    login(email, name || email.split('@')[0]);
    setIsLoginOpen(false);
  };

  const handleGoogleLogin = () => {
    login('organizador@gmail.com', 'Organizador Demo');
    setIsLoginOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-up">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0D1B2A] p-6 sm:p-8">
        
        {/* Close */}
        <button
          onClick={() => setIsLoginOpen(false)}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center mb-6">
          <div className="h-12 w-12 bg-brand-soft text-brand dark:bg-brand/20 dark:text-glow rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
            Acessar Minhas Rifas
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Entre sem precisar de senha através de link mágico ou conta Google.
          </p>
        </div>

        {/* Google button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-3 px-4 text-xs font-bold text-gray-800 shadow-sm hover:bg-gray-50 dark:border-white/10 dark:bg-[#10212C] dark:text-white dark:hover:bg-white/5 transition"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Continuar com Google
        </button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-white/10" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-2 text-gray-400 dark:bg-[#0D1B2A]">
              Ou por e-mail
            </span>
          </div>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Seu Nome:
            </label>
            <input
              type="text"
              placeholder="Ex: Carlos Mendes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-gray-900 dark:border-white/10 dark:bg-[#10212C] dark:text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Seu E-mail:
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-gray-900 dark:border-white/10 dark:bg-[#10212C] dark:text-white focus:border-brand focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="btn-shimmer w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold text-night shadow-sm hover:scale-[1.01] transition"
          >
            Acessar Painel Agora
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <ShieldCheck className="h-3.5 w-3.5 text-brand" />
          <span>Ambiente autenticado e seguro</span>
        </div>

      </div>
    </div>
  );
}
