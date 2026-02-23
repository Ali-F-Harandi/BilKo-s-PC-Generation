
import React from 'react';
import { X, Settings as SettingsIcon, Image, Monitor, Palette } from 'lucide-react';
import { useSettings, SpriteStyle } from '../../context/SettingsContext';
import { useTheme } from '../../context/AppThemeContext';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { spriteStyle, setSpriteStyle } = useSettings();
    const { mode, toggleMode } = useTheme();

    if (!isOpen) return null;

    const styles: { id: SpriteStyle; name: string; description: string; icon: React.ReactNode }[] = [
        { 
            id: 'game', 
            name: 'Game Style', 
            description: 'Authentic Red/Blue or Yellow sprites based on save file.',
            icon: <Monitor size={20} />
        },
        { 
            id: 'normal', 
            name: 'Modern Sprite', 
            description: 'Standard modern sprites from PokeAPI.',
            icon: <Image size={20} />
        },
        { 
            id: 'artwork', 
            name: 'Official Artwork', 
            description: 'High-quality official artwork for all Pokemon.',
            icon: <Palette size={20} />
        },
    ];

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-950/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <SettingsIcon size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Settings</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Configuration</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    
                    {/* Theme Section */}
                    <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Appearance</h4>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                                    {mode === 'light' ? <Palette size={18} /> : <Palette size={18} />}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">Dark Mode</p>
                                    <p className="text-xs text-gray-500">Toggle dark theme for the app.</p>
                                </div>
                            </div>
                            <button 
                                onClick={toggleMode}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${mode === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${mode === 'dark' ? 'translate-x-6' : ''}`} />
                            </button>
                        </div>
                    </section>

                    {/* Sprite Style Section */}
                    <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Pokemon Sprites</h4>
                        <div className="space-y-3">
                            {styles.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setSpriteStyle(style.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group ${
                                        spriteStyle === style.id 
                                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400' 
                                            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                        spriteStyle === style.id 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                                    }`}>
                                        {style.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-bold text-sm ${spriteStyle === style.id ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                                            {style.name}
                                        </p>
                                        <p className="text-xs text-gray-500 leading-tight mt-0.5">
                                            {style.description}
                                        </p>
                                    </div>
                                    {spriteStyle === style.id && (
                                        <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 dark:bg-gray-950/50 border-t border-gray-100 dark:border-gray-800">
                    <button 
                        onClick={onClose}
                        className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black py-4 rounded-2xl transition-transform active:scale-95 shadow-xl shadow-black/10 dark:shadow-white/5 uppercase tracking-widest text-xs"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
