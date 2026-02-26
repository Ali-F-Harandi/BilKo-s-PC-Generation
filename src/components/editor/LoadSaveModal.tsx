import React from 'react';

interface LoadSaveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFilesSelected: (files: File[]) => void;
}

export const LoadSaveModal: React.FC<LoadSaveModalProps> = ({ isOpen, onClose, onFilesSelected }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-md w-full">
                <h2 className="text-2xl font-black mb-4">Load Save File</h2>
                <input 
                    type="file" 
                    accept=".sav,.srm" 
                    multiple 
                    onChange={(e) => {
                        if (e.target.files) {
                            onFilesSelected(Array.from(e.target.files));
                            onClose();
                        }
                    }}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl mb-6"
                />
                <button onClick={onClose} className="w-full py-3 bg-gray-100 dark:bg-gray-800 font-bold rounded-xl">Cancel</button>
            </div>
        </div>
    );
};
