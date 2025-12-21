import { BrushCleaning } from 'lucide-react';
import React from 'react';

const MenuEmptyState = ({ onAdd }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <BrushCleaning className='text-gray-600 w-10 h-10' />

      <h2 className="text-xl font-semibold text-gray-800">
        No menu items found
      </h2>

      <p className="text-gray-500 mt-2 max-w-sm">
        You haven’t added any items to your menu yet. Start by creating your first item.
      </p>

      <button
        onClick={onAdd}
        className="mt-6 bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-lg"
      >
        Add First Item
      </button>
    </div>
  );
};

export default MenuEmptyState;