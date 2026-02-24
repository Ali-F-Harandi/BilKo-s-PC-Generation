
import React, { useState, useEffect } from 'react';
import { ParsedSave, PokemonStats, TrainerInfo, Item } from '../../lib/parser/types';
import { TrainerCard } from './TrainerCard';
import { PartyList } from './PartyList';
import { PCStorage } from './PCStorage';
import { Inventory } from './Inventory';
import { EditorTools } from './EditorTools';
import { PokemonEditorModal } from './pokemon/PokemonEditorModal'; 
import { Pokedex } from './Pokedex';
import { BattleGuide } from './BattleGuide';
import { HallOfFame } from './HallOfFame';
import { EventFlagsManager } from './EventFlagsManager';
import { EncounterDatabase } from './EncounterDatabase'; // Import
import { LayoutGrid, Book, Trophy, Map, Home, Database, Swords } from 'lucide-react'; // Added Swords Icon
import { MoveLocation } from '../../lib/utils/manipulation';
import { SortScope, SortCriteria, SortDirection } from '../../lib/utils/sortManager';
import { SortSettingsModal } from './SortSettingsModal';

export type DashboardTab = 'home' | 'storage' | 'pokedex' | 'battle' | 'events' | 'hof' | 'encounters';

interface EditorDashboardProps {
    data: ParsedSave;
    onSaveUpdate: (newData: ParsedSave) => void;
    onOpenLoadModal: () => void;
    onExport: () => void;
    
    // Sort Handler
    onSort: (scope: SortScope, criteria: SortCriteria, direction: SortDirection, includeAllSaves: boolean) => void;

    // Global Move Props
    isMoveMode: boolean;
    setIsMoveMode: (val: boolean) => void;
    globalMoveSources: MoveLocation[]; 
    onMovePokemon: (target: MoveLocation, e?: React.MouseEvent) => void;
    onToggleSelection: (target: MoveLocation) => void;
    onDropPokemon: (target: MoveLocation, e?: React.DragEvent) => void;
    
    onShowToast: (msg: string) => void;

    // Tab Control
    activeTab: DashboardTab;
    onTabChange: (tab: DashboardTab) => void;
}

export const EditorDashboard: React.FC<EditorDashboardProps> = ({ 
    data: initialData, 
    onSaveUpdate, 
    onOpenLoadModal, 
    onExport,
    onSort,
    isMoveMode,
    setIsMoveMode,
    globalMoveSources,
    onMovePokemon,
    onToggleSelection,
    onDropPokemon,
    onShowToast,
    activeTab,
    onTabChange
}) => {
    // Sync state when switching tabs
    const [data, setData] = useState<ParsedSave>(initialData);
    useEffect(() => {
        setData(initialData);
        setSelectedPokemon(null);
    }, [initialData]);

    const updateData = (newData: ParsedSave) => {
        setData(newData);
        onSaveUpdate(newData);
    };

    const [selectedPokemon, setSelectedPokemon] = useState<{ mon: PokemonStats, source: 'party' | 'box', index: number, boxIndex?: number } | null>(null);
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    
    const handleImportBox = (newBoxData: PokemonStats[], boxIndex: number) => {
        const newData = { ...data };
        newData.pcBoxes[boxIndex] = newBoxData;
        
        // If we updated the currently active in-game box, update cache
        if (boxIndex === newData.currentBoxId) {
            newData.currentBoxPokemon = newBoxData;
            newData.currentBoxCount = newBoxData.length;
        }
        
        updateData(newData);
    };

    // Handler to Add Pokemon from Encounter DB (Single Mon)
    const handleAddPokemon = (mon: PokemonStats, target: 'party' | 'pc') => {
        const newData = { ...data };
        
        if (target === 'party') {
            if (newData.party.length < 6) {
                mon.isParty = true;
                newData.party.push(mon);
                newData.partyCount = newData.party.length;
                updateData(newData);
            } else {
                onShowToast("Party is full! Try adding to PC.");
            }
        } else {
            // Find space in Current Box first, then iterate
            let targetBoxIndex = newData.currentBoxId;
            let added = false;

            // Check current box
            if (newData.pcBoxes[targetBoxIndex].length < 20) {
                newData.pcBoxes[targetBoxIndex].push(mon);
                added = true;
            } else {
                // Find any box
                for (let i = 0; i < 12; i++) {
                    if (newData.pcBoxes[i].length < 20) {
                        newData.pcBoxes[i].push(mon);
                        targetBoxIndex = i;
                        added = true;
                        break;
                    }
                }
            }

            if (added) {
                // Update cache if we modified current box
                if (targetBoxIndex === newData.currentBoxId) {
                    newData.currentBoxPokemon = newData.pcBoxes[targetBoxIndex];
                    newData.currentBoxCount = newData.pcBoxes[targetBoxIndex].length;
                }
                updateData(newData);
            } else {
                onShowToast("PC Storage is completely full!");
            }
        }
    };

    const handlePokemonClick = (mon: PokemonStats, source: 'party' | 'box', index: number, boxIndex: number | undefined, e: React.MouseEvent) => {
        if (isMoveMode) {
            const location: MoveLocation = source === 'party' 
                ? { type: 'party', index } 
                : { type: 'box', boxIndex: boxIndex!, index };
            
            // Delegate to parent App.tsx handler with event for Shift/Ctrl logic
            onMovePokemon(location, e);
        } else {
            // Edit Mode
            setSelectedPokemon({ mon, source, index, boxIndex });
        }
    };

    const handleEmptySlotClick = (location: MoveLocation, e: React.MouseEvent) => {
        if (isMoveMode) {
            onMovePokemon(location, e);
        }
    };

    const handleCloseEditor = () => {
        setSelectedPokemon(null);
    };

    const handleSavePokemon = (updatedMon: PokemonStats) => {
        if (!selectedPokemon) return;

        const newData = { ...data };

        if (selectedPokemon.source === 'party') {
            newData.party[selectedPokemon.index] = updatedMon;
        } else if (selectedPokemon.source === 'box' && selectedPokemon.boxIndex !== undefined) {
            newData.pcBoxes[selectedPokemon.boxIndex][selectedPokemon.index] = updatedMon;
            if (selectedPokemon.boxIndex === data.currentBoxId) {
                newData.currentBoxPokemon = newData.pcBoxes[selectedPokemon.boxIndex];
            }
        }

        updateData(newData);
    };

    const handleSetActiveBox = (boxIndex: number) => {
        const newData = { ...data };
        newData.currentBoxId = boxIndex;
        // In Gen 1 logic, we assume PC Boxes array is the source of truth
        newData.currentBoxPokemon = newData.pcBoxes[boxIndex];
        newData.currentBoxCount = newData.pcBoxes[boxIndex].length;
        updateData(newData);
    };

    const handleTrainerUpdate = (updates: Partial<TrainerInfo>) => {
        const newData = {
            ...data,
            trainer: { ...data.trainer, ...updates }
        };
        updateData(newData);
    };

    const handlePokedexUpdate = (owned: boolean[], seen: boolean[]) => {
        const ownedCount = owned.filter((f, i) => i > 0 && i <= 151 && f).length;
        const seenCount = seen.filter((f, i) => i > 0 && i <= 151 && f).length;
        
        const newData = {
            ...data,
            pokedexOwnedFlags: owned,
            pokedexSeenFlags: seen,
            pokedexOwned: ownedCount,
            pokedexSeen: seenCount
        };
        updateData(newData);
    };

    const handleEventFlagsUpdate = (newFlags: boolean[]) => {
        const newData = { ...data, eventFlags: newFlags };
        updateData(newData);
    };

    const handleInventoryUpdate = (newItems: Item[], newPcItems: Item[]) => {
        const newData = { ...data, items: newItems, pcItems: newPcItems };
        updateData(newData);
    };

    const TabButton = ({ id, icon: Icon, label }: { id: DashboardTab, icon: React.ElementType, label: string }) => {
        const isActive = activeTab === id;
        return (
            <button
                onClick={() => onTabChange(id)}
                className={`
                    flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ease-in-out shrink-0 h-10 select-none
                    ${isActive 
                        ? 'bg-blue-600 text-white shadow-md pr-4' 
                        : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-14 justify-center'
                    }
                `}
                title={label}
            >
                <Icon size={22} className={isActive ? 'text-white' : ''} />
                <span className={`font-bold text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${isActive ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'}`}>
                    {label}
                </span>
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 font-sans transition-colors duration-300">
            {/* Modals */}
            {selectedPokemon && (
                <PokemonEditorModal 
                    pokemon={selectedPokemon.mon} 
                    generation={data.generation} 
                    onClose={handleCloseEditor} 
                    onSave={handleSavePokemon}
                />
            )}

            <SortSettingsModal 
                isOpen={isSortModalOpen}
                onClose={() => setIsSortModalOpen(false)}
                onApply={onSort}
            />

            {/* Top Toolbar (Controls + Search) */}
            <EditorTools 
                onExport={onExport} 
                onImport={onOpenLoadModal} 
                isMoveMode={isMoveMode}
                onToggleMoveMode={setIsMoveMode}
            />

            {/* Tab Navigation Bar (Scrollable, Expanding) */}
            <div className="sticky top-[4.5rem] z-30 bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-2">
                <div className="max-w-[100rem] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
                    <TabButton id="home" icon={Home} label="Dashboard" />
                    <TabButton id="storage" icon={LayoutGrid} label="PC & Bag" />
                    <TabButton id="encounters" icon={Database} label="Encounters" />
                    <TabButton id="pokedex" icon={Book} label="Pokédex" />
                    <TabButton id="battle" icon={Swords} label="Battle Guide" /> {/* Updated Icon */}
                    <TabButton id="events" icon={Map} label="Events" />
                    <TabButton id="hof" icon={Trophy} label="Hall of Fame" />
                </div>
            </div>

            <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* HOME TAB: Trainer & Party */}
                    {activeTab === 'home' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left Column: Trainer Card (3 Cols) */}
                            <div className="lg:col-span-4 xl:col-span-3">
                                <TrainerCard 
                                    data={data} 
                                    onUpdate={handleTrainerUpdate}
                                />
                            </div>
                            
                            {/* Right Column: Party (9 Cols) */}
                            <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
                                <div>
                                    <PartyList 
                                        party={data.party} 
                                        generation={data.generation}
                                        gameVersion={data.gameVersion}
                                        isMoveMode={isMoveMode}
                                        onEnableMoveMode={() => setIsMoveMode(true)} 
                                        selectedMoveSources={globalMoveSources}
                                        onPokemonClick={(mon, idx, e) => handlePokemonClick(mon, 'party', idx, undefined, e)}
                                        onEmptySlotClick={(idx, e) => handleEmptySlotClick({ type: 'party', index: idx }, e)}
                                        onToggleSelection={(idx) => onToggleSelection({ type: 'party', index: idx })}
                                        onDropPokemon={(idx, e) => onDropPokemon({ type: 'party', index: idx }, e)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'storage' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* PC Storage (Right on Desktop, Top on Mobile) */}
                            <div className="lg:col-span-9 h-auto lg:order-2">
                                <PCStorage 
                                    boxes={data.pcBoxes}
                                    currentBoxIndex={data.currentBoxId}
                                    isMoveMode={isMoveMode}
                                    onEnableMoveMode={() => setIsMoveMode(true)} // Enable on drag/long press
                                    onToggleMoveMode={() => setIsMoveMode(!isMoveMode)}
                                    selectedMoveSources={globalMoveSources}
                                    onPokemonClick={(mon, idx, boxIdx, e) => handlePokemonClick(mon, 'box', idx, boxIdx, e)}
                                    onEmptySlotClick={(idx, boxIdx, e) => handleEmptySlotClick({ type: 'box', boxIndex: boxIdx, index: idx }, e)}
                                    onToggleSelection={(idx, boxIdx) => onToggleSelection({ type: 'box', boxIndex: boxIdx, index: idx })}
                                    onDropPokemon={(idx, boxIdx, e) => onDropPokemon({ type: 'box', boxIndex: boxIdx, index: idx }, e)}
                                    onSortClick={() => setIsSortModalOpen(true)}
                                    onSetActiveBox={handleSetActiveBox}
                                    onImport={handleImportBox}
                                    onToast={onShowToast}
                                />
                            </div>

                            {/* Inventory (Left on Desktop, Bottom on Mobile) */}
                            <div className="lg:col-span-3 h-[500px] lg:h-full overflow-hidden lg:order-1">
                                <Inventory 
                                    items={data.items} 
                                    pcItems={data.pcItems}
                                    isMoveMode={isMoveMode}
                                    onEnableMoveMode={() => setIsMoveMode(true)} // Enable on long press
                                    onUpdate={handleInventoryUpdate}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'encounters' && (
                        <div className="w-full">
                            <EncounterDatabase 
                                data={data} 
                                onAddPokemon={handleAddPokemon}
                                onToast={onShowToast}
                            />
                        </div>
                    )}
                    
                    {activeTab === 'pokedex' && (
                         <div className="w-full">
                            <Pokedex data={data} onUpdate={handlePokedexUpdate} />
                         </div>
                    )}

                    {activeTab === 'battle' && (
                        <div className="h-[700px]">
                            <BattleGuide />
                        </div>
                    )}

                    {activeTab === 'events' && (
                        <div className="w-full">
                            <EventFlagsManager data={data} onUpdate={handleEventFlagsUpdate} />
                        </div>
                    )}

                    {activeTab === 'hof' && (
                        <div className="w-full">
                            <HallOfFame data={data} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
