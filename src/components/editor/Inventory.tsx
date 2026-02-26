import React from 'react';
import { Backpack, Search } from 'lucide-react';

export const Inventory: React.FC = () => {
    // Mock items
    const items = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        name: i % 2 === 0 ? 'Potion' : 'Poké Ball',
        count: Math.floor(Math.random() * 99) + 1
    }));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col overflow-hidden">
            <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-700 shrink-0">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                        <Backpack size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Item Box</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PC Items</p>
                    </div>
                </div>
                
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search items..." 
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar p-2 space-y-1">
                {items.map((item) => (
                    <div 
                        key={item.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl group transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors">
                                <div className="w-4 h-4 bg-current rounded-full opacity-50"></div>
                            </div>
                            <span className="font-bold text-gray-700 dark:text-gray-200 text-sm">{item.name}</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                            x{item.count}
                        </span>
                    </div>
                ))}
            </div>
            
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 shrink-0 text-center">
                <button className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-widest">
                    Deposit Item
                </button>
            </div>
        </div>
    );
};
