import React from 'react';

const MenuCardSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 animate-pulse">
      {/* Image */}
      <div className="h-40 w-full bg-gray-200 rounded-lg" />

      {/* Title + checkbox */}
      <div className="flex items-center mt-3">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="ml-auto h-5 w-5 bg-gray-200 rounded" />
      </div>

      {/* Category */}
      <div className="h-3 w-24 bg-gray-200 rounded mt-2" />

      {/* Price */}
      <div className="h-4 w-16 bg-gray-200 rounded mt-4" />

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <div className="h-9 w-full bg-gray-200 rounded-lg" />
        <div className="h-9 w-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
};

export default MenuCardSkeleton;
