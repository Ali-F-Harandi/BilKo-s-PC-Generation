
import React, { useMemo, useState } from 'react';
import { ParsedSave, TrainerInfo } from '../../lib/parser/types';
import { useTheme } from '../../context/ThemeContext';
import { Clock, Book, User, Heart, Coins, Trophy, Save, X, Swords } from 'lucide-react';
import { REGION_BADGES } from '../../lib/data/gameData';

interface TrainerCardProps {
    data: ParsedSave;
    onUpdate?: (updates: Partial<TrainerInfo>) => void;
}

const MAX_DEX = 151;

// Gen 1 Constants
const MAX_MONEY = 999999;
const MAX_COINS = 9999;
const MAX_HOURS = 255;
const MAX_MINUTES = 59;
const MAX_FRIENDSHIP = 255;
const MAX_NAME_LENGTH = 10;

export const TrainerCard: React.FC<TrainerCardProps> = ({ data, onUpdate }) => {
    const { getGameTheme } = useTheme();
    const gameTheme = getGameTheme();
    const t = data.trainer;
    const version = data.gameVersion || 'Yellow';
    const [isEditing, setIsEditing] = useState(false);
    
    // Local state for editing
    const [editForm, setEditForm] = useState({
        name: t.name,
        rivalName: t.rivalName || 'BLUE',
        id: t.id,
        money: t.money,
        coins: t.coins,
        pikachuFriendship: t.pikachuFriendship || 0,
        badges: t.badges,
        hours: parseInt(t.playTime.split('h')[0]) || 0,
        minutes: parseInt(t.playTime.split(' ')[1]) || 0
    });

    const displayBadges = REGION_BADGES[1];

    const trainerSpriteUrl = useMemo(() => {
        return 'https://play.pokemonshowdown.com/sprites/trainers/red-gen1.png';
    }, [version]);

    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val || 0, min), max);

    const handleBadgeToggle = (index: number) => {
        if (!isEditing) return;
        
        const currentBadges = editForm.badges;
        const bitMask = 1 << index;
        
        // Toggle bit
        const newBadges = (currentBadges & bitMask) 
            ? currentBadges & ~bitMask // Turn off
            : currentBadges | bitMask; // Turn on
            
        setEditForm({ ...editForm, badges: newBadges });
    };

    const handleSave = () => {
        if (onUpdate) {
            const formattedTime = `${editForm.hours}h ${editForm.minutes.toString().padStart(2, '0')}m`;
            onUpdate({
                name: editForm.name,
                rivalName: editForm.rivalName,
                id: editForm.id,
                money: editForm.money,
                coins: editForm.coins,
                pikachuFriendship: editForm.pikachuFriendship,
                badges: editForm.badges,
                playTime: formattedTime
            });
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditForm({
            name: t.name,
            rivalName: t.rivalName || 'BLUE',
            id: t.id,
            money: t.money,
            coins: t.coins,
            pikachuFriendship: t.pikachuFriendship || 0,
            badges: t.badges,
            hours: parseInt(t.playTime.split('h')[0]) || 0,
            minutes: parseInt(t.playTime.split(' ')[1]) || 0
        });
        setIsEditing(false);
    };

    return (
        <div className="bg-[#FEFCE8] dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border-4 border-gray-100 dark:border-gray-800 overflow-hidden relative flex flex-col transition-all duration-300">
            
            {/* Header Area */}
            <div 
                className="h-32 relative p-5 flex flex-col items-start justify-start overflow-hidden transition-colors duration-1000"
                style={{ backgroundColor: gameTheme?.color || '#FACC15' }}
            >
                {/* Pokeball Dot Pattern */}
                <div className="absolute inset-0 opacity-15 pointer-events-none" 
                     style={{ 
                        backgroundImage: `radial-gradient(circle at 10px 10px, white 2px, transparent 0)`,
                        backgroundSize: '20px 20px'
                     }}>
                </div>
                
                {/* Header Top Row: Name and ID */}
                <div className="w-full flex justify-between items-start relative z-10">
                    {isEditing ? (
                        <input 
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value.substring(0, MAX_NAME_LENGTH)})}
                            maxLength={MAX_NAME_LENGTH}
                            className="bg-black/20 text-white text-4xl font-black italic tracking-tighter rounded px-2 w-48 outline-none border-b-2 border-white/50 focus:border-white placeholder-white/50"
                            placeholder="NAME"
                        />
                    ) : (
                        <h2 className="text-4xl font-black text-white italic tracking-tighter drop-shadow-md uppercase">
                            {t.name}
                        </h2>
                    )}
                    
                    <div className="text-right">
                        <span className="text-[10px] font-black text-white/70 uppercase tracking-widest block">Trainer ID</span>
                        {isEditing ? (
                            <input 
                                type="text"
                                value={editForm.id}
                                onChange={(e) => setEditForm({...editForm, id: e.target.value.substring(0, 5)})}
                                maxLength={5}
                                className="bg-black/20 text-white text-xl font-black tracking-widest leading-none rounded px-1 w-20 text-right outline-none"
                            />
                        ) : (
                            <div className="text-xl font-black text-white tracking-widest leading-none">{t.id}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Avatar Frame */}
            <div className="absolute top-16 left-8 z-20">
                <div className="w-28 h-28 rounded-2xl bg-white dark:bg-gray-800 border-[6px] border-white dark:border-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.2)] overflow-hidden flex items-center justify-center relative transform -rotate-3">
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 opacity-50"></div>
                    <img 
                        src={trainerSpriteUrl} 
                        alt="Trainer" 
                        className="w-full h-full object-contain p-2 pixelated scale-125 relative z-10" 
                        draggable={false}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://play.pokemonshowdown.com/sprites/trainers/red-gen1.png' }}
                    />
                </div>
            </div>

            {/* Main Content Body */}
            <div className="px-5 pt-14 pb-6 space-y-3 flex-grow">
                
                {/* Mini Stats Grid (Time & Edit Buttons) */}
                <div className="flex justify-end gap-2 mb-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs font-bold text-gray-500 uppercase border border-gray-100 dark:border-gray-700">
                        <Clock size={12} /> 
                        {isEditing ? (
                             <div className="flex items-center gap-1">
                                 <input 
                                    type="number" 
                                    value={editForm.hours}
                                    onChange={(e) => setEditForm({...editForm, hours: clamp(parseInt(e.target.value), 0, MAX_HOURS)})}
                                    className="w-8 bg-gray-200 dark:bg-gray-700 rounded text-center outline-none"
                                 />
                                 <span>h</span>
                                 <input 
                                    type="number" 
                                    value={editForm.minutes}
                                    onChange={(e) => setEditForm({...editForm, minutes: clamp(parseInt(e.target.value), 0, MAX_MINUTES)})}
                                    className="w-8 bg-gray-200 dark:bg-gray-700 rounded text-center outline-none"
                                 />
                                 <span>m</span>
                             </div>
                        ) : (
                            t.playTime
                        )}
                    </div>
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1 bg-green-500 rounded-lg text-xs font-black text-white uppercase hover:bg-green-600 transition-colors shadow-md">
                                <Save size={12} /> SAVE
                            </button>
                            <button onClick={handleCancel} className="flex items-center gap-1.5 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-xs font-black text-gray-500 uppercase hover:bg-gray-300 transition-colors">
                                <X size={12} />
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs font-black text-blue-600 uppercase hover:bg-blue-100 transition-colors border border-blue-100 dark:border-blue-900/30">
                            <User size={12} /> EDIT CARD
                        </button>
                    )}
                </div>

                {/* Primary Stats Blocks */}
                <div className="space-y-2">
                    {/* Rival Name */}
                    <div className="bg-white dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between transition-colors hover:border-red-300 dark:hover:border-red-700">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white shadow-inner">
                                <Swords size={16} />
                            </div>
                            <span className="font-black text-gray-400 uppercase tracking-widest text-xs">Rival</span>
                        </div>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={editForm.rivalName}
                                onChange={(e) => setEditForm({...editForm, rivalName: e.target.value.substring(0, MAX_NAME_LENGTH)})}
                                maxLength={MAX_NAME_LENGTH}
                                className="text-xl font-black text-gray-900 dark:text-white tracking-tight text-right w-32 bg-gray-100 dark:bg-gray-900 rounded outline-none px-2 uppercase"
                            />
                        ) : (
                            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
                                {t.rivalName || 'BLUE'}
                            </span>
                        )}
                    </div>

                    {/* Money Block */}
                    <div className="bg-white dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between transition-colors hover:border-blue-300 dark:hover:border-blue-700">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white shadow-inner">
                                <span className="font-black text-sm italic">₽</span>
                            </div>
                            <span className="font-black text-gray-400 uppercase tracking-widest text-xs">Money</span>
                        </div>
                        {isEditing ? (
                            <input 
                                type="number" 
                                value={editForm.money}
                                onChange={(e) => setEditForm({...editForm, money: clamp(parseInt(e.target.value), 0, MAX_MONEY)})}
                                className="text-xl font-black text-gray-900 dark:text-white tracking-tight text-right w-32 bg-gray-100 dark:bg-gray-900 rounded outline-none px-2"
                            />
                        ) : (
                            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                {t.money.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Casino Coins */}
                    <div className="bg-white dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between transition-colors hover:border-indigo-300 dark:hover:border-indigo-700">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-inner">
                                <Coins size={16} />
                            </div>
                            <span className="font-black text-gray-400 uppercase tracking-widest text-xs">Casino Coins</span>
                        </div>
                        {isEditing ? (
                             <input 
                                type="number" 
                                value={editForm.coins}
                                onChange={(e) => setEditForm({...editForm, coins: clamp(parseInt(e.target.value), 0, MAX_COINS)})}
                                className="text-xl font-black text-gray-900 dark:text-white tracking-tight text-right w-24 bg-gray-100 dark:bg-gray-900 rounded outline-none px-2"
                            />
                        ) : (
                            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{t.coins}</span>
                        )}
                    </div>

                    {/* Pikachu Love (Yellow Specific) */}
                    {version.includes('Yellow') && (
                        <div className="bg-[#FFFBEB] dark:bg-yellow-900/10 p-3 rounded-xl border border-yellow-100 dark:border-yellow-900/30 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white shadow-inner">
                                    <Heart size={16} fill="currentColor" />
                                </div>
                                <span className="font-black text-yellow-600 uppercase tracking-widest text-xs">Pikachu Love</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                {isEditing ? (
                                    <input 
                                        type="number" 
                                        value={editForm.pikachuFriendship}
                                        onChange={(e) => setEditForm({...editForm, pikachuFriendship: clamp(parseInt(e.target.value), 0, MAX_FRIENDSHIP)})}
                                        className="text-xl font-black text-yellow-700 dark:text-yellow-500 text-right w-16 bg-white dark:bg-gray-900 rounded outline-none px-1"
                                    />
                                ) : (
                                    <span className="text-xl font-black text-yellow-700 dark:text-yellow-500">{t.pikachuFriendship || 0}</span>
                                )}
                                <span className="text-[10px] font-bold text-yellow-600/40">/255</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pokédex Progress */}
                <div className="bg-white/40 dark:bg-gray-900/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 space-y-3">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Book size={14} className="text-red-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Pokédex Progress</span>
                    </div>
                    
                    {/* Owned Progress */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                            <span className="text-gray-400">Owned</span>
                            <span className="text-gray-900 dark:text-white">{data.pokedexOwned} / {MAX_DEX}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700">
                            <div 
                                className="h-full bg-red-500 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(239,68,68,0.4)]" 
                                style={{ width: `${Math.min(100, (data.pokedexOwned / MAX_DEX) * 100)}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Seen Progress */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                            <span className="text-gray-400">Seen</span>
                            <span className="text-gray-900 dark:text-white">{data.pokedexSeen} / {MAX_DEX}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700">
                            <div 
                                className="h-full bg-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.4)]" 
                                style={{ width: `${Math.min(100, (data.pokedexSeen / MAX_DEX) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Badges Section */}
                <div className="pt-2">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                             <Trophy size={14} className="text-orange-400" />
                             <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Kanto Badges</h4>
                        </div>
                        {isEditing && <span className="text-[10px] text-gray-400 font-bold animate-pulse">Tap badge to toggle</span>}
                    </div>

                    <div className={`
                        bg-white/50 dark:bg-gray-800/80 p-4 rounded-[1.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700 grid grid-cols-4 gap-4 shadow-inner
                        ${isEditing ? 'border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10' : ''}
                    `}>
                        {displayBadges.map((badge, i) => {
                            // Check bit at index i in badges byte
                            const badgesSource = isEditing ? editForm.badges : t.badges;
                            const hasBadge = (badgesSource & (1 << i)) !== 0;
                            
                            return (
                                <div key={i} className="flex justify-center">
                                    <div 
                                        onClick={() => handleBadgeToggle(i)}
                                        className={`
                                            w-10 h-10 flex items-center justify-center transition-all duration-300
                                            ${hasBadge ? 'grayscale-0 opacity-100 scale-110 drop-shadow-lg' : 'grayscale opacity-20 brightness-75 scale-90'}
                                            ${isEditing ? 'cursor-pointer hover:scale-125 hover:opacity-80 active:scale-90' : ''}
                                        `} 
                                        title={badge.name}
                                    >
                                        <img 
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/${i + 1}.png`}
                                            alt={badge.name}
                                            className="w-full h-full object-contain pixelated"
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

            {/* Bottom Footer Accent */}
            <div className="h-2 bg-[#FACC15]" style={{ backgroundColor: gameTheme?.color }}></div>
        </div>
    );
};
