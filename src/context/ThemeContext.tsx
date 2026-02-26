import React, { createContext, useContext, useState, useEffect } from 'react';
import { SpriteStyle, ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [activeGameId, setActiveGameId] = useState<string | null>(null);
    const [spriteStyle, setSpriteStyle] = useState<SpriteStyle>('pixel');

    // Load preferences from local storage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) setTheme(savedTheme);
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');

        const savedSpriteStyle = localStorage.getItem('spriteStyle') as SpriteStyle | null;
        if (savedSpriteStyle) setSpriteStyle(savedSpriteStyle);

        const savedGameId = localStorage.getItem('activeGameId');
        if (savedGameId) setActiveGameId(savedGameId);
    }, []);

    // Save preferences
    useEffect(() => {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('spriteStyle', spriteStyle);
    }, [spriteStyle]);

    useEffect(() => {
        if (activeGameId) localStorage.setItem('activeGameId', activeGameId);
    }, [activeGameId]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const getGameTheme = () => {
        if (activeGameId === 'yellow') return { color: '#FACC15', name: 'Yellow' };
        if (activeGameId === 'blue') return { color: '#3B82F6', name: 'Blue' };
        if (activeGameId === 'red') return { color: '#EF4444', name: 'Red' };
        return { color: '#EF4444', name: 'Red' }; // Default
    };

    return (
        <ThemeContext.Provider value={{ 
            theme, toggleTheme, 
            activeGameId, setActiveGameId, getGameTheme,
            spriteStyle, setSpriteStyle 
        }}>
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
