import React from 'react';
import { ParsedSave } from '../../lib/parser/types';
import { SortScope, SortCriteria, SortDirection } from '../../lib/utils/sortManager';
import { MoveLocation } from '../../lib/utils/manipulation';

export type DashboardTab = 'home' | 'party' | 'pc' | 'inventory' | 'pokedex' | 'hall-of-fame' | 'encounters' | 'storage' | 'battle' | 'events' | 'hof';

interface EditorDashboardProps {
    data: ParsedSave;
    activeTab: DashboardTab;
    onTabChange: (tab: DashboardTab) => void;
    onSaveUpdate: (newData: ParsedSave) => void;
    onOpenLoadModal: () => void;
    onExport: () => void;
    onSort: (scope: SortScope, criteria: SortCriteria, direction: SortDirection, includeAllSaves: boolean) => void;
    isMoveMode: boolean;
    setIsMoveMode: (val: boolean) => void;
    globalMoveSources: MoveLocation[];
    onMovePokemon: (location: MoveLocation, e?: React.MouseEvent) => void;
    onToggleSelection: (location: MoveLocation) => void;
    onDropPokemon: (target: MoveLocation, e?: React.DragEvent) => void;
    onShowToast: (msg: string) => void;
}

export const EditorDashboard: React.FC<EditorDashboardProps> = ({ data, activeTab, onTabChange }) => {
    return (
        <div className="p-8">
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">Editor Dashboard</h2>
            <div className="flex gap-4 mb-8">
                {(['home', 'party', 'pc', 'inventory', 'pokedex', 'hall-of-fame', 'encounters'] as DashboardTab[]).map(tab => (
                    <button 
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`px-6 py-2 rounded-full font-bold uppercase text-sm tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-gray-900 hover:bg-gray-100'}`}
                    >
                        {tab.replace('-', ' ')}
                    </button>
                ))}
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                <p>Viewing <strong>{activeTab}</strong> for {data.trainer.name}'s save.</p>
                <p className="text-gray-500 mt-4">This is a placeholder for the actual editor components.</p>
            </div>
        </div>
    );
};
