import React from 'react';
import { useGetAllMenu } from '../hooks/MenuHook';
import {  Plus } from 'lucide-react';
import BackHeader from '../components/layout/BackHeader';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

const Menu = () => {
  const { data: menu, isLoading } = useGetAllMenu();

  const handleAddToCart = (data)=>{

  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <BackHeader title="Menu" />

      <div className="p-8 max-w-[1400px] w-full mx-auto">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
          {/* Show 8 skeleton cards */}
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : menu?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
          {menu.data.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300"
            >
              <div className=" rounded-lg px-4 pt-4 overflow-hidden ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="p-4 w-full">
                <div className="flex items-baseline">
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <span className="bg-gray-200 text-xs px-2 py-1 capitalize rounded-lg ml-auto">{item.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg text-orange-600 font-semibold">₹{item.price}</span>

                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <button onClick={() => handleAddToCart(item)} disabled={!item.isAvailable} className={`w-full 
                  ${item.isAvailable? "bg-orange-500 cursor-pointer hover:bg-orange-600 text-white":""}  py-2 rounded-lg flex items-center justify-center transition`}>
                  {item.isAvailable?
                  <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add to Cart
                  </>: "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold text-gray-500">No menus available.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Menu;
