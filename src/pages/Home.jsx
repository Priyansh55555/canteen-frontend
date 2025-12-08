import React from 'react';
import { useGetAllMenu } from '../hooks/MenuHook';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';

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

const Home = () => {
  const { data: menu, isLoading } = useGetAllMenu();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Show 8 skeleton cards */}
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : menu?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {menu.data.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-500 mb-2">{item.category}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-800">${item.price}</span>
                  {item.isAvailable ? (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      Available
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <XCircle className="w-5 h-5 mr-1" />
                      Not Available
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center transition">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
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
  );
};

export default Home;
