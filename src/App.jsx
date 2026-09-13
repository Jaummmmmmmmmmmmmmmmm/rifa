import React from 'react';
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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 dark:bg-[#0D1B2A] dark:text-slate-100 transition-colors duration-200">
      
      {/* Sticky Header / Navbar */}
      <Navbar />

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
      <Footer />

      {/* Mobile Floating Bottom Navigation */}
      <BottomNav />

      {/* Interactive Modals */}
      <CreateRaffleModal />
      <PublicRaffleModal />
      <DashboardModal />
      <LoginModal />
      <ChatSupportModal />

    </div>
  );
}
