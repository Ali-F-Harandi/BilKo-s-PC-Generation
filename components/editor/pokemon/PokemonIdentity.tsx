
import React from 'react';
import { PokemonStats, GameVersion } from '../../../lib/parser/types';
import { User, Fingerprint } from 'lucide-react';
import { Autocomplete } from '../../ui/Autocomplete';
import { TypeBadge } from '../../ui/PokemonBadges';
import { POKEMON_NAMES } from '../../../lib/data/pokemonNames';
import { useSettings } from '../../../context/SettingsContext';
import { getPokemonSpriteUrl } from '../../../lib/utils/sprites';

interface PokemonIdentityProps {
    mon: PokemonStats;
    types: string[];
    version?: GameVersion;
    updateField: (field: keyof PokemonStats, value: any) => void;
    handleSpeciesChange: (name: string) => void;
    handleExpChange: (newExp: number) => void;
}

export const PokemonIdentityView: React.FC<PokemonIdentityProps> = ({ 
    mon, types, version, updateField, handleSpeciesChange, handleExpChange 
}) => {
    const { spriteStyle } = useSettings();
    
    // Safety clamp
    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
    
    const spriteUrl = getPokemonSpriteUrl(mon.dexId, spriteStyle, version);

    return (
        <div className="flex flex-col gap-6 bg-white dark:bg-gray-900 h-full">
            {/* Sprite & Types */}
            <div className="flex flex-col items-center">
                <div className="w-64 h-64 relative flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-inner mb-4">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 rounded-[2rem]"></div>
                    <img 
                        src={spriteUrl} 
                        className="w-48 h-48 object-contain pixelated drop-shadow-2xl z-10 transition-transform hover:scale-110 duration-500"
                        alt={mon.speciesName}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' }}
                    />
                    {/* Type Badges */}
                    <div className="absolute -bottom-3 flex gap-2">
                        {types.map(t => <TypeBadge key={t} type={t} size="md" className="shadow-lg border-2 border-white dark:border-gray-900" />)}
                    </div>
                </div>
                
                {/* Species Selector */}
                <div className="w-full mt-2">
                    <label className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase ml-1 mb-1">
                        <span>Species</span>
                        <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">#{mon.dexId.toString().padStart(3, '0')}</span>
                    </label>
                    <Autocomplete 
                        options={POKEMON_NAMES.slice(0, 152)} 
                        value={mon.speciesName} 
                        onChange={handleSpeciesChange}
                        placeholder="Change Species..."
                        className="shadow-sm"
                    />
                </div>
            </div>

            {/* EXP Block */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-3 border border-blue-100 dark:border-blue-800/30">
                <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                    Experience Points
                </label>
                <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg p-1.5 border border-blue-200 dark:border-blue-800/50 shadow-inner">
                    <input 
                        type="number" 
                        value={mon.exp} 
                        onChange={(e) => handleExpChange(Number(e.target.value))} 
                        className="w-full text-center text-sm font-mono font-bold bg-transparent outline-none text-gray-700 dark:text-gray-200"
                    />
                </div>
            </div>

            {/* OT Block */}
            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-3 border border-purple-100 dark:border-purple-800/30">
                <label className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
                    Original Trainer
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-1.5 border border-purple-200 dark:border-purple-800/50 shadow-inner flex items-center gap-1.5">
                        <User size={12} className="text-purple-400" />
                        <input 
                            type="text" 
                            value={mon.originalTrainerName}
                            onChange={(e) => updateField('originalTrainerName', e.target.value)}
                            maxLength={10}
                            className="w-full text-xs font-bold bg-transparent outline-none text-gray-700 dark:text-gray-200"
                            placeholder="OT Name"
                        />
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-1.5 border border-purple-200 dark:border-purple-800/50 shadow-inner flex items-center gap-1.5">
                        <Fingerprint size={12} className="text-purple-400" />
                        <input 
                            type="number" 
                            value={mon.originalTrainerId}
                            onChange={(e) => updateField('originalTrainerId', clamp(Number(e.target.value), 0, 65535))}
                            className="w-full text-xs font-mono font-bold bg-transparent outline-none text-gray-700 dark:text-gray-200"
                            placeholder="ID"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
