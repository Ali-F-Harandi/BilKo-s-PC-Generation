import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../context/ThemeContext';
import { X, Gamepad2, Image as ImageIcon, Palette, Check, Settings, Info, Database } from 'lucide-react';
import { getPokemonSpriteUrl } from '../../lib/utils/sprites';
import { SpriteStyle } from '../../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type SettingsTab = 'appearance' | 'general' | 'about';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { spriteStyle, setSpriteStyle, getGameTheme, activeGameId } = useTheme();
    const gameTheme = getGameTheme();
    const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    const styles: { id: SpriteStyle; title: string; desc: string; icon: React.ReactNode }[] = [
        {
            id: 'pixel',
            title: 'Game Style',
            desc: 'Authentic retro pixel art based on your game version.',
            icon: <Gamepad2 size={20} />
        },
        {
            id: 'normal',
            title: 'Modern',
            desc: 'Standard high-res sprites from modern games.',
            icon: <ImageIcon size={20} />
        },
        {
            id: 'artwork',
            title: 'Artwork',
            desc: 'Official Ken Sugimori watercolor illustrations.',
            icon: <Palette size={20} />
        }
    ];

    // Preview Pokemon: Pikachu (25), Charizard (6), Mewtwo (150)
    const previewMons = [25, 6, 150];

    const tabs = [
        { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
        { id: 'general', label: 'General', icon: <Settings size={18} /> },
        { id: 'data', label: 'Data', icon: <Database size={18} /> },
        { id: 'about', label: 'About', icon: <Info size={18} /> },
    ];

    const modalContent = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 w-full max-w-4xl h-[600px] rounded-2xl shadow-2xl overflow-hidden flex animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-800">
                
                {/* Sidebar */}
                <div className="w-64 bg-gray-50 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                    <div className="p-6">
                        <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                            <Settings className="text-gray-400" />
                            Settings
                        </h2>
                    </div>
                    
                    <nav className="flex-grow px-3 space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as SettingsTab)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    <div className="p-4 text-xs text-center text-gray-400 font-mono">
                        v0.1.0-alpha
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow flex flex-col bg-white dark:bg-gray-900 relative">
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
                        {activeTab === 'appearance' && (
                            <div className="space-y-8 max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Appearance</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Customize how the application looks and feels.</p>
                                </div>

                                {/* Sprite Style Selection */}
                                <section>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        Pokemon Sprite Style
                                    </label>
                                    <div className="grid grid-cols-1 gap-4">
                                        {styles.map((style) => (
                                            <button
                                                key={style.id}
                                                onClick={() => setSpriteStyle(style.id)}
                                                className={`group relative flex items-center gap-5 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                                                    spriteStyle === style.id 
                                                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' 
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-gray-800/50'
                                                }`}
                                            >
                                                <div className={`p-4 rounded-xl transition-colors ${
                                                    spriteStyle === style.id 
                                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                                                }`}>
                                                    {style.icon}
                                                </div>
                                                
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`font-bold text-lg ${
                                                            spriteStyle === style.id ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                                                        }`}>
                                                            {style.title}
                                                        </span>
                                                        {spriteStyle === style.id && (
                                                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                                                Active
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {style.desc}
                                                    </p>
                                                </div>

                                                {spriteStyle === style.id && (
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">
                                                        <Check size={24} strokeWidth={3} />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {/* Live Preview */}
                                <section className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center justify-between mb-6">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            Live Preview
                                        </label>
                                        <span className="text-xs font-mono text-gray-400">
                                            {activeGameId ? activeGameId.toUpperCase() : 'RED/BLUE'} MODE
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-center gap-12 items-end h-32">
                                        {previewMons.map((id) => (
                                            <div key={id} className="group relative flex flex-col items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl rounded-full transition-opacity duration-500 -bottom-4"></div>
                                                    <img 
                                                        src={getPokemonSpriteUrl(id, spriteStyle, activeGameId || 'red')} 
                                                        alt={`Pokemon ${id}`}
                                                        className={`w-24 h-24 object-contain drop-shadow-xl transition-all duration-300 ${
                                                            spriteStyle === 'pixel' ? 'pixelated scale-125' : ''
                                                        }`}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">
                                                    {id === 25 ? 'Pikachu' : id === 6 ? 'Charizard' : 'Mewtwo'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'general' && (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400">
                                    <Settings size={32} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">General Settings</h3>
                                    <p className="text-gray-500">More configuration options coming soon.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <div className="text-center mb-8">
                                    <div 
                                        className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white font-black shadow-xl mb-4 text-2xl"
                                        style={{ backgroundColor: gameTheme?.color || '#EF4444' }}
                                    >
                                        PC
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Bilko's PC</h3>
                                    <p className="text-gray-500">Generation 1 Save Editor</p>
                                </div>
                                
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                                    <p>
                                        Bilko's PC is a modern, web-based save editor for Pokemon Red, Blue, and Yellow. 
                                        It is designed to be safe, easy to use, and beautiful.
                                    </p>
                                    <p>
                                        This project is open source and built with React, TypeScript, and Tailwind CSS.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};
