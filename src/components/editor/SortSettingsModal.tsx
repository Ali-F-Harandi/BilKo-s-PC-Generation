import React from 'react';
import { X } from 'lucide-react';

interface SortSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSortChange: (sort: string) => void;
}

export const SortSettingsModal: React.FC<SortSettingsModalProps> = ({ isOpen, onClose, onSortChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Sort Settings</h2>
        <div className="space-y-2">
          <button
            onClick={() => onSortChange('dex')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
          >
            Sort by Pokedex Number
          </button>
          <button
            onClick={() => onSortChange('name')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
          >
            Sort by Name
          </button>
        </div>
      </div>
    </div>
  );
};
