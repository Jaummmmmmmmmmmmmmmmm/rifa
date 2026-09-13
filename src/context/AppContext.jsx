import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialRaffles } from '../data/initialRaffles';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Raffles state
  const [raffles, setRaffles] = useState(() => {
    try {
      const saved = localStorage.getItem('raffles_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialRaffles;
  });

  useEffect(() => {
    try {
      localStorage.setItem('raffles_data', JSON.stringify(raffles));
    } catch (e) {}
  }, [raffles]);

  // Auth simulation
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const login = (email, name = 'Organizador') => {
    const u = { id: 'usr_' + Date.now(), email, name };
    setUser(u);
    localStorage.setItem('user_session', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
  };

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedRaffle, setSelectedRaffle] = useState(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Add new raffle
  const addRaffle = (newRaffle) => {
    const raffleObj = {
      id: Math.floor(Math.random() * 90000 + 10000),
      created_at: new Date().toISOString(),
      soldCount: 0,
      status: 'active',
      ...newRaffle
    };
    setRaffles(prev => [raffleObj, ...prev]);
    return raffleObj;
  };

  // Buy numbers on raffle
  const buyNumbers = (raffleId, count, buyerData) => {
    setRaffles(prev => prev.map(r => {
      if (r.id === raffleId) {
        const newSold = Math.min(r.totalNumbers, (r.soldCount || 0) + count);
        return {
          ...r,
          soldCount: newSold,
          buyers: [...(r.buyers || []), { ...buyerData, count, date: new Date().toISOString() }]
        };
      }
      return r;
    }));
  };

  // Draw winner
  const drawWinner = (raffleId, customWinningNumber = null) => {
    setRaffles(prev => prev.map(r => {
      if (r.id === raffleId) {
        const winNum = customWinningNumber || String(Math.floor(Math.random() * r.totalNumbers) + 1).padStart(4, '0');
        return {
          ...r,
          status: 'closed',
          winningNumber: winNum,
          category: 'completed'
        };
      }
      return r;
    }));
  };

  // Stats calculation
  const totalRaffles = 1870 + (raffles.length - initialRaffles.length);
  const totalNumbersSold = 380450 + raffles.reduce((acc, r) => acc + (r.soldCount || 0), 0);
  const totalArrecadado = 827900 + raffles.reduce((acc, r) => acc + ((r.soldCount || 0) * (r.pricePerNumber || 10)), 0);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        raffles,
        addRaffle,
        buyNumbers,
        drawWinner,
        user,
        login,
        logout,
        isCreateOpen,
        setIsCreateOpen,
        selectedRaffle,
        setSelectedRaffle,
        isDashboardOpen,
        setIsDashboardOpen,
        isLoginOpen,
        setIsLoginOpen,
        isChatOpen,
        setIsChatOpen,
        stats: {
          totalRaffles,
          totalNumbersSold,
          totalArrecadado
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
