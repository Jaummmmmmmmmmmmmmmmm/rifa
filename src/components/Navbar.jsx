import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Ticket, 
  Home, 
  TicketPlus, 
  CircleDollarSign, 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  LayoutDashboard, 
  FileText, 
  Video, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  Menu, 
  X,
  MessageCircle,
  Bell,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ onGoToAdmin }) {
  const { 
    theme, 
    toggleTheme, 
    user, 
    logout, 
    setIsCreateOpen, 
    setIsDashboardOpen, 
    setIsLoginOpen, 
    setIsChatOpen 
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const exploreRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close explore dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`sticky top-0 inset-x-0 z-50 transition-all duration-200 border-b ${
      isScrolled 
        ? 'bg-white/95 dark:bg-[#0D1B2A]/95 backdrop-blur-md border-gray-200 dark:border-white/10 shadow-lg' 
        : 'bg-white/90 dark:bg-[#0D1B2A]/90 backdrop-blur-sm border-gray-100 dark:border-white/5'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="group inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand to-glow text-night shadow-md shadow-brand/20 transition-transform group-hover:scale-105">
                <Ticket className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Riffa<span className="text-brand dark:text-glow">Digital</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 ml-6">
              <a 
                href="#" 
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:text-brand hover:bg-brand-soft/60 dark:hover:text-glow dark:hover:bg-white/5 transition-colors"
              >
                <Home className="h-4 w-4" />
                Início
              </a>

              <button 
                onClick={() => setIsCreateOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:text-brand hover:bg-brand-soft/60 dark:hover:text-glow dark:hover:bg-white/5 transition-colors"
              >
                <TicketPlus className="h-4 w-4" />
                Criar rifa
              </button>

              <button 
                onClick={() => scrollToSection('precos')}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:text-brand hover:bg-brand-soft/60 dark:hover:text-glow dark:hover:bg-white/5 transition-colors"
              >
                <CircleDollarSign className="h-4 w-4" />
                Preços
              </button>

              <button 
                onClick={() => scrollToSection('recursos')}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:text-brand hover:bg-brand-soft/60 dark:hover:text-glow dark:hover:bg-white/5 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Guia do organizador
              </button>

              <button 
                onClick={() => setIsChatOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:text-brand hover:bg-brand-soft/60 dark:hover:text-glow dark:hover:bg-white/5 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Suporte
              </button>

              {/* Explorar Dropdown */}
              <div className="relative" ref={exploreRef}>
                <button 
                  onClick={() => setExploreOpen(prev => !prev)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:text-brand hover:bg-brand-soft/60 dark:hover:text-glow dark:hover:bg-white/5 transition-colors"
                >
                  Explorar
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
                </button>

                {exploreOpen && (
                  <div className="absolute left-0 mt-2 w-52 overflow-hidden rounded-2xl border border-gray-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#10212C]/95 animate-fade-up">
                    <button 
                      onClick={() => { setExploreOpen(false); setIsDashboardOpen(true); }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-brand-soft hover:text-brand dark:hover:bg-white/5 dark:hover:text-glow transition-colors text-left"
                    >
                      <LayoutDashboard className="h-4 w-4 text-brand" />
                      Dashboard
                    </button>
                    <button 
                      onClick={() => { setExploreOpen(false); scrollToSection('blog'); }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-brand-soft hover:text-brand dark:hover:bg-white/5 dark:hover:text-glow transition-colors text-left"
                    >
                      <FileText className="h-4 w-4 text-brand" />
                      Blog RiffaDigital
                    </button>
                    <button 
                      onClick={() => { setExploreOpen(false); scrollToSection('suporte'); }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-brand-soft hover:text-brand dark:hover:bg-white/5 dark:hover:text-glow transition-colors text-left"
                    >
                      <HelpCircle className="h-4 w-4 text-brand" />
                      Central de Ajuda & FAQ
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema claro/escuro"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-white/10 dark:bg-[#10212C] dark:text-gray-200 dark:hover:bg-white/10"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-gold" /> : <Moon className="h-4 w-4 text-brand" />}
            </button>

            {/* User Session or Login Button */}
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setIsDashboardOpen(true)}
                  className="flex items-center gap-2 rounded-xl border border-brand/20 bg-brand-soft/50 px-3 py-1.5 text-xs font-semibold text-brand dark:text-glow hover:bg-brand-soft transition"
                >
                  <User className="h-3.5 w-3.5" />
                  {user.name}
                </button>
                <button
                  onClick={logout}
                  title="Sair"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-rose-500 dark:border-white/10 dark:text-gray-400"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hidden sm:inline-flex items-center justify-center rounded-xl border border-gray-200/80 bg-white/70 px-4 py-2 text-xs font-semibold text-gray-800 shadow-sm transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Acessar minhas rifas
              </button>
            )}

            {/* Admin Hilux Shortcut */}
            <button
              onClick={onGoToAdmin}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition"
              title="Gerenciar vendas da Hilux em tempo real"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Hilux</span>
            </button>

            {/* Criar Rifa CTA Button */}
            <button
              onClick={() => setIsCreateOpen(true)}
              className="btn-shimmer relative inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold shadow-md shadow-brand/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <TicketPlus className="h-4 w-4 text-night" />
              <span>Criar rifa</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Abrir menu"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-700 dark:border-white/10 dark:text-gray-300 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/60 dark:border-white/10 py-4 px-2 space-y-1 bg-white dark:bg-[#0D1B2A] animate-fade-up">
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollToSection('hero'); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-brand-soft"
            >
              <Home className="h-4 w-4 text-brand" />
              Início
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setIsCreateOpen(true); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-brand-soft"
            >
              <TicketPlus className="h-4 w-4 text-brand" />
              Criar rifa
            </button>
            <button 
              onClick={() => scrollToSection('precos')}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-brand-soft"
            >
              <CircleDollarSign className="h-4 w-4 text-brand" />
              Preços & Simulador
            </button>
            <button 
              onClick={() => scrollToSection('recursos')}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-brand-soft"
            >
              <BookOpen className="h-4 w-4 text-brand" />
              Guia do organizador
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setIsDashboardOpen(true); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-brand-soft"
            >
              <LayoutDashboard className="h-4 w-4 text-brand" />
              Dashboard
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-brand-soft"
            >
              <FileText className="h-4 w-4 text-brand" />
              Blog
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setIsChatOpen(true); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-brand-soft"
            >
              <MessageCircle className="h-4 w-4 text-brand" />
              Suporte & Chat
            </button>
            <div className="pt-2 border-t border-gray-100 dark:border-white/10 space-y-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onGoToAdmin?.(); }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-sm font-bold text-emerald-400"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Hilux (/rifa-alpha/admin)
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); setIsLoginOpen(true); }}
                className="w-full flex items-center justify-center rounded-xl border border-brand/20 bg-brand-soft/40 py-2.5 text-sm font-semibold text-brand dark:text-glow"
              >
                {user ? `Painel de ${user.name}` : 'Acessar minhas rifas'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
