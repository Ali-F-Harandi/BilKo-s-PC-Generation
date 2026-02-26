import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { X, Gamepad2, Image as ImageIcon, Palette, Check } from 'lucide-react';
import { getPokemonSpriteUrl } from '../../lib/utils/sprites';
import { SpriteStyle } from '../../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { spriteStyle, setSpriteStyle, getGameTheme, activeGameId } = useTheme();
    const gameTheme = getGameTheme();

    if (!isOpen) return null;

    const styles: { id: SpriteStyle; title: string; desc: string; icon: React.ReactNode }[] = [
        {
            id: 'pixel',
            title: 'Game Style',
            desc: 'Red/Blue or Yellow sprites based on your save file version. Authentic retro look!',
            icon: <Gamepad2 size={24} />
        },
        {
            id: 'normal',
            title: 'Normal',
            desc: 'Standard Pokemon sprites from the main series games.',
            icon: <ImageIcon size={24} />
        },
        {
            id: 'artwork',
            title: 'Official Artwork',
            desc: 'Beautiful official artwork illustrations by Ken Sugimori.',
            icon: <Palette size={24} />
        }
    ];

    // Preview Pokemon: Pikachu (25), Charizard (6), Mewtwo (150)
    const previewMons = [25, 6, 150];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div 
                    className="px-6 py-4 flex items-center justify-between text-white"
                    style={{ backgroundColor: gameTheme?.color || '#1F2937' }}
                >
                    <div className="flex items-center gap-2">
                        <Palette size={20} />
                        <h2 className="text-lg font-bold">Settings</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                    
                    {/* Sprite Style Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-gray-400 dark:text-gray-500 uppercase text-xs font-bold tracking-widest">
                            <ImageIcon size={14} />
                            <span>Pokemon Sprite Style</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Choose how Pokemon sprites are displayed throughout the editor.
                        </p>

                        <div className="space-y-3">
                            {styles.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setSpriteStyle(style.id)}
                                    className={`
                                        w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all
                                        ${spriteStyle === style.id 
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500' 
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                                        }
                                    `}
                                >
                                    <div className={`
                                        p-3 rounded-xl shrink-0
                                        ${spriteStyle === style.id 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                        }
                                    `}>
                                        {style.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`font-bold ${spriteStyle === style.id ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                                                {style.title}
                                            </span>
                                            {spriteStyle === style.id && (
                                                <div className="bg-blue-500 text-white rounded-full p-0.5">
                                                    <Check size={12} strokeWidth={4} />
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {style.desc}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-gray-400 dark:text-gray-500 uppercase text-xs font-bold tracking-widest">
                            <span>Preview</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 flex justify-around items-end border border-gray-100 dark:border-gray-700/50">
                            {previewMons.map((id) => (
                                <div key={id} className="flex flex-col items-center gap-3 w-20">
                                    <img 
                                        src={getPokemonSpriteUrl(id, spriteStyle, activeGameId || 'red')} 
                                        alt={`Pokemon ${id}`}
                                        className={`w-16 h-16 object-contain drop-shadow-md transition-all duration-300 ${spriteStyle === 'pixel' ? 'pixelated scale-125' : ''}`}
                                    />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                        {id === 25 ? 'Pikachu' : id === 6 ? 'Charizard' : 'Mewtwo'}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-center text-gray-400 mt-3 italic">
                            {activeGameId === 'yellow' ? 'Yellow' : 'Red/Blue'} sprites shown. Yellow sprites will appear for Yellow save files.
                        </p>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                    <button 
                        onClick={onClose}
                        className="w-full py-3 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all"
                        style={{ backgroundColor: '#2563EB' }} // Always blue for primary action
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
