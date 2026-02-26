import React from 'react';

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExport: (extension: 'sav' | 'srm') => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onExport }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-md w-full">
                <h2 className="text-2xl font-black mb-4">Export Save</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">Choose the file extension for your exported save.</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button onClick={() => onExport('sav')} className="py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">.SAV</button>
                    <button onClick={() => onExport('srm')} className="py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors">.SRM</button>
                </div>
                <button onClick={onClose} className="w-full py-3 text-gray-500 font-bold">Cancel</button>
            </div>
        </div>
    );
};
