import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CommunityStats from './components/CommunityStats';
import RaffleShowcase from './components/RaffleShowcase';
import PricingSimulator from './components/PricingSimulator';
import FeaturesSection from './components/FeaturesSection';
import UseCasesSection from './components/UseCasesSection';
import Testimonials from './components/Testimonials';
import SupportSection from './components/SupportSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import CreateRaffleModal from './components/CreateRaffleModal';
import PublicRaffleModal from './components/PublicRaffleModal';
import DashboardModal from './components/DashboardModal';
import LoginModal from './components/LoginModal';
import ChatSupportModal from './components/ChatSupportModal';
import HiluxAdmin from './components/HiluxAdmin';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const checkIsAdmin = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      path.includes('admin') ||
      path.includes('rifa-alpha') ||
      hash.includes('admin') ||
      hash.includes('rifa-alpha')
    );
  };

  const [isAdminView, setIsAdminView] = useState(checkIsAdmin);

  useEffect(() => {
    const handleNavigation = () => {
      setIsAdminView(checkIsAdmin());
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  const goToAdmin = () => {
    window.history.pushState({}, '', '/rifa-alpha/admin');
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If URL or state is on Admin view
  if (isAdminView) {
    return <HiluxAdmin onBackToSite={goToSite} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 dark:bg-[#0D1B2A] dark:text-slate-100 transition-colors duration-200">
      
      {/* Sticky Header / Navbar */}
      <Navbar onGoToAdmin={goToAdmin} />

      {/* Main Sections */}
      <main className="flex-grow pb-16 md:pb-0">
        <Hero />
        <CommunityStats />
        <RaffleShowcase />
        <PricingSimulator />
        <FeaturesSection />
        <UseCasesSection />
        <Testimonials />
        <SupportSection />
        <BlogSection />
      </main>

      {/* Global Footer */}
      <Footer onGoToAdmin={goToAdmin} />

      {/* Mobile Floating Bottom Navigation */}
      <BottomNav />

      {/* Floating Shortcut to Hilux Admin */}
      <button
        onClick={goToAdmin}
        title="Acessar Painel Admin da Hilux"
        className="fixed bottom-20 right-4 z-40 hidden sm:flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-[#081320]/95 px-3.5 py-2 text-xs font-extrabold text-emerald-400 shadow-2xl backdrop-blur-md hover:bg-emerald-500 hover:text-slate-950 transition-all hover:scale-105 active:scale-95 group"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        <ShieldCheck className="h-4 w-4" />
        <span>Admin Hilux</span>
      </button>

      {/* Interactive Modals */}
      <CreateRaffleModal />
      <PublicRaffleModal />
      <DashboardModal />
      <LoginModal />
      <ChatSupportModal />

    </div>
  );
}
