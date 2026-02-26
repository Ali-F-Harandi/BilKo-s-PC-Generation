import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesSelected }) => {
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  }, [onFilesSelected]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <div 
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="w-full max-w-2xl p-12 border-4 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <Upload size={48} className="text-gray-400 mb-4" />
      <p className="text-lg font-bold text-gray-600 dark:text-gray-400">Drag & Drop your .sav file here</p>
      <p className="text-sm text-gray-400">or click to browse</p>
      <input 
        id="fileInput"
        type="file"
        className="hidden"
        accept=".sav,.srm"
        multiple
        onChange={onFileChange}
      />
    </div>
  );
};
