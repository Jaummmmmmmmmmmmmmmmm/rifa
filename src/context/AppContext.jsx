import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialRaffles } from '../data/initialRaffles';
import { getSupabaseRaffles, syncRaffleToSupabase, subscribeToHiluxRealtime } from '../services/supabase';

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
      const saved = localStorage.getItem('raffles_data_v4');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialRaffles;
  });

  // Try fetching from Supabase on mount
  useEffect(() => {
    async function loadRemote() {
      const remote = await getSupabaseRaffles();
      if (remote && remote.length > 0) {
        setRaffles(prev => {
          // Merge remote with initial (preserving Hilux id 7777 at top)
          const remoteMap = new Map(remote.map(r => [r.id, r]));
          const merged = prev.map(p => {
            if (p.id === 7777) {
              return { ...p, organizerName: 'Jonathan', soldCount: Math.max(p.soldCount || 0, 3) };
            }
            return remoteMap.get(p.id) || p;
          });
          return merged;
        });
      }
    }
    loadRemote();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('raffles_data_v4', JSON.stringify(raffles));
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

  const login = (email, name = 'Jonathan') => {
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
    syncRaffleToSupabase(raffleObj);
    return raffleObj;
  };

  // Buy numbers on raffle
  const buyNumbers = (raffleId, count, buyerData) => {
    setRaffles(prev => prev.map(r => {
      if (r.id === raffleId) {
        const newSold = Math.min(r.totalNumbers, (r.soldCount || 0) + count);
        const updated = {
          ...r,
          soldCount: newSold,
          buyers: [...(r.buyers || []), { ...buyerData, count, date: new Date().toISOString() }]
        };
        syncRaffleToSupabase(updated);
        return updated;
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

  // Realtime Broadcast Channel across all tabs / sites / admin
  const [broadcastChannel] = useState(() => {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        return new BroadcastChannel('rifa_alpha_channel');
      }
    } catch (e) {}
    return null;
  });

  // Listen to external changes (other tab, admin, storage event)
  useEffect(() => {
    if (broadcastChannel) {
      broadcastChannel.onmessage = (event) => {
        if (event.data && event.data.type === 'SYNC_ALL_RAFFLES') {
          setRaffles(event.data.raffles);
        } else if (event.data && event.data.type === 'UPDATE_RAFFLE') {
          setRaffles(prev => prev.map(r => r.id === event.data.raffleId ? { ...r, ...event.data.updates } : r));
        }
      };
    }

    const handleStorage = (e) => {
      if (e.key === 'raffles_data_v4' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setRaffles(parsed);
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorage);
    
    // Cloud Realtime WebSocket Listener (across different devices/browsers)
    const unsubscribeCloud = subscribeToHiluxRealtime((data) => {
      if (data && data.raffleId) {
        setRaffles(prev => prev.map(r => r.id === data.raffleId ? { ...r, ...data.updates } : r));
      }
    });

    return () => {
      window.removeEventListener('storage', handleStorage);
      if (typeof unsubscribeCloud === 'function') unsubscribeCloud();
    };
  }, [broadcastChannel]);

  // Update specific raffle with automatic cross-tab broadcast & persistence
  const updateRaffle = (raffleId, updates) => {
    setRaffles(prev => {
      const updatedList = prev.map(r => {
        if (r.id === raffleId) {
          const updated = { ...r, ...updates };
          syncRaffleToSupabase(updated);
          return updated;
        }
        return r;
      });
      
      try {
        localStorage.setItem('raffles_data_v4', JSON.stringify(updatedList));
      } catch (e) {}

      if (broadcastChannel) {
        broadcastChannel.postMessage({
          type: 'UPDATE_RAFFLE',
          raffleId,
          updates
        });
      }

      return updatedList;
    });
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
        updateRaffle,
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
