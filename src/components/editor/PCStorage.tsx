import React from 'react';
import { Box, Grid } from 'lucide-react';

export const PCStorage: React.FC = () => {
    // Mock data for 20 slots
    const slots = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                        <Grid size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">PC Storage</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Box 1</p>
                    </div>
                </div>
                <div className="text-sm font-bold text-gray-400">20/20</div>
            </div>

            <div className="grid grid-cols-5 gap-4 flex-grow">
                {slots.map((slot) => (
                    <div 
                        key={slot}
                        className="aspect-square bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer group relative"
                    >
                        <span className="text-xs font-bold text-gray-300 group-hover:text-blue-400 transition-colors">
                            {slot}
                        </span>
                        {/* Placeholder for Pokemon Sprite */}
                        {slot <= 6 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <button className="hover:text-blue-500 transition-colors">Previous Box</button>
                <span>Box 1 of 12</span>
                <button className="hover:text-blue-500 transition-colors">Next Box</button>
            </div>
        </div>
    );
};
