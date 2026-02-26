import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeContextType, ThemeMode, ThemeColor, GameCartridge } from '../types';
import { pokemonGames } from '../data/games';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from local storage or default to light
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('themeMode');
      return (saved as ThemeMode) || 'light';
    }
    return 'light';
  });

  const [theme, setTheme] = useState<ThemeColor>('default');
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const getGameTheme = (): GameCartridge | undefined => {
      if (!activeGameId) return undefined;
      return pokemonGames.find(g => g.id === activeGameId);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, theme, setTheme, activeGameId, setActiveGameId, getGameTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
