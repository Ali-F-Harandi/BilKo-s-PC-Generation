
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SpriteStyle = 'normal' | 'artwork' | 'game';

interface SettingsContextType {
    spriteStyle: SpriteStyle;
    setSpriteStyle: (style: SpriteStyle) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [spriteStyle, setSpriteStyle] = useState<SpriteStyle>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('spriteStyle');
            return (saved as SpriteStyle) || 'game';
        }
        return 'game';
    });

    useEffect(() => {
        localStorage.setItem('spriteStyle', spriteStyle);
    }, [spriteStyle]);

    return (
        <SettingsContext.Provider value={{ spriteStyle, setSpriteStyle }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
