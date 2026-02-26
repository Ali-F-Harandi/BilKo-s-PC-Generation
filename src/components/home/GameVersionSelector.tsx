import React from 'react';
import { GameVersion } from '../../lib/parser/types';

interface GameVersionSelectorProps {
  filename: string;
  detectedVersion: GameVersion;
  onConfirm: (version: GameVersion) => void;
  onCancel: () => void;
}

export const GameVersionSelector: React.FC<GameVersionSelectorProps> = ({ filename, detectedVersion, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-black mb-4">Select Game Version</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">We detected <strong>{detectedVersion}</strong> for <code>{filename}</code>. Is this correct?</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(['Red', 'Blue', 'Yellow'] as GameVersion[]).map(v => (
            <button 
              key={v}
              onClick={() => onConfirm(v)}
              className={`py-3 rounded-xl font-bold transition-colors ${v === detectedVersion ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'}`}
            >
              {v}
            </button>
          ))}
        </div>
        <button onClick={onCancel} className="w-full py-3 text-gray-500 font-bold">Cancel</button>
      </div>
    </div>
  );
};
