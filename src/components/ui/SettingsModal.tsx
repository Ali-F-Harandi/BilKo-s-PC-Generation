import React from 'react';
import { X, Image as ImageIcon, Settings } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { SpriteStyle } from '../../types';

interface SettingsModalProps {
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
    const { spriteStyle, setSpriteStyle } = useTheme();

    return (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500">
                            <Settings size={20} />
                        </div>
                        <h2 className="font-black text-xl text-gray-800 dark:text-white uppercase tracking-wide">Settings</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
                    
                    {/* Sprite Style Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <ImageIcon size={16} />
                            Sprite Style
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                            <label className={`
                                flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all
                                ${spriteStyle === 'game' 
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800'}
                            `}>
                                <div className="flex-grow">
                                    <div className="font-black text-gray-900 dark:text-white text-lg">Game (Default)</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Authentic generation 1 sprites based on your save file version.</div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${spriteStyle === 'game' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {spriteStyle === 'game' && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
                                </div>
                                <input 
                                    type="radio" 
                                    name="spriteStyle" 
                                    value="game" 
                                    checked={spriteStyle === 'game'}
                                    onChange={() => setSpriteStyle('game')}
                                    className="hidden"
                                />
                            </label>

                            <label className={`
                                flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all
                                ${spriteStyle === 'normal' 
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800'}
                            `}>
                                <div className="flex-grow">
                                    <div className="font-black text-gray-900 dark:text-white text-lg">Normal</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Standard modern sprites from PokeAPI.</div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${spriteStyle === 'normal' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {spriteStyle === 'normal' && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
                                </div>
                                <input 
                                    type="radio" 
                                    name="spriteStyle" 
                                    value="normal" 
                                    checked={spriteStyle === 'normal'}
                                    onChange={() => setSpriteStyle('normal')}
                                    className="hidden"
                                />
                            </label>

                            <label className={`
                                flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all
                                ${spriteStyle === 'artwork' 
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800'}
                            `}>
                                <div className="flex-grow">
                                    <div className="font-black text-gray-900 dark:text-white text-lg">Artwork</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">High quality official Pokemon artwork.</div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${spriteStyle === 'artwork' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {spriteStyle === 'artwork' && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
                                </div>
                                <input 
                                    type="radio" 
                                    name="spriteStyle" 
                                    value="artwork" 
                                    checked={spriteStyle === 'artwork'}
                                    onChange={() => setSpriteStyle('artwork')}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                </div>
                
                {/* Footer */}
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
