import React from 'react';

export const Features: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold mb-2">Edit Party</h3>
        <p className="text-gray-600 dark:text-gray-400">Modify your Pokemon's stats, moves, and more.</p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold mb-2">PC Storage</h3>
        <p className="text-gray-600 dark:text-gray-400">Manage all 12 boxes of your PC storage.</p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
        <h3 className="text-xl font-bold mb-2">Inventory</h3>
        <p className="text-gray-600 dark:text-gray-400">Edit your bag and PC items.</p>
      </div>
    </div>
  );
};
