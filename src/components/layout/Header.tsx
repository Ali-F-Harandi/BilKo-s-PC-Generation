import React, { useState } from 'react';
import { Menu, X, Home, Grid, Database, Book, Trophy, Map, Settings, Monitor, Gift } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { SettingsModal } from '../ui/SettingsModal';

export const Header: React.FC = () => {
    const { getGameTheme } = useTheme();
    const gameTheme = getGameTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuItems = [
        { icon: <Home size={20} />, label: 'Dashboard' },
        { icon: <Grid size={20} />, label: 'PC Storage' },
        { icon: <Database size={20} />, label: 'Encounter DB' },
        { icon: <Book size={20} />, label: 'Pokédex' },
        { icon: <Trophy size={20} />, label: 'Battle Guide' },
        { icon: <Map size={20} />, label: 'World Events' },
        { icon: <Trophy size={20} />, label: 'Hall of Fame' },
    ];

    return (
        <>
            <header 
                className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300"
            >
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black shadow-lg"
                            style={{ backgroundColor: gameTheme?.color || '#EF4444' }}
                        >
                            PC
                        </div>
                        <h1 className="font-black text-xl tracking-tighter italic uppercase text-gray-900 dark:text-white">
                            Bilko's PC
                        </h1>
                    </div>

                    <button 
                        onClick={toggleMenu}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <Menu size={24} className="text-gray-700 dark:text-gray-200" />
                    </button>
                </div>
            </header>

            {/* Mobile/Sidebar Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-white dark:bg-gray-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        
                        {/* Menu Header */}
                        <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                            <h2 className="font-black text-xl uppercase tracking-widest text-gray-900 dark:text-white">Menu</h2>
                            <button 
                                onClick={toggleMenu}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <X size={24} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-1">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Navigation</div>
                            {menuItems.map((item, idx) => (
                                <button 
                                    key={idx}
                                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold transition-colors text-left"
                                >
                                    <span className="text-gray-400 dark:text-gray-500">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Preferences */}
                        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Preferences</div>
                            <button 
                                onClick={() => {
                                    setIsSettingsOpen(true);
                                    // toggleMenu(); // Keep menu open or close? Screenshot implies settings is a modal on top.
                                }}
                                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold transition-colors text-left shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                            >
                                <Settings size={20} className="text-gray-400 dark:text-gray-500" />
                                Settings
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            <SettingsModal 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)} 
            />
        </>
    );
};
