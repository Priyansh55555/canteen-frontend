import React, { useState } from 'react';
import BackHeader from '../../components/layout/BackHeader';
import CreateItemModel from '../../components/modals/CreateItemModel';
import { AnimatePresence } from 'framer-motion';
import { useGetAllMenu } from '../../hooks/MenuHook';
import MenuEditCard from '../../components/menu/MenuEditCard';
import MenuCardSkeleton from '../../components/menu/MenuCardSkeleton';
import MenuEmptyState from '../../components/menu/MenuEmptyState';
import { useMinLoading } from '../../hooks/useMinLoading';


const MenuManagment = () => {
  const [showModel, setShowModel] = useState(false);
  const { data: menu, isLoading } = useGetAllMenu();

  const showSkeleton = useMinLoading(isLoading, 500);
  const AddNewItem = (
    <button
      onClick={() => setShowModel(true)}
      className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg"
    >
      Add Item
    </button>
  );

  return (
    <div className="flex flex-col pb-8">
      <BackHeader title="Menu Managment" RightComponent={AddNewItem} />

      <main className="px-4 pt-8 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full max-w-[1400px] mx-auto">
        {/* Loading Skeleton */}
        {showSkeleton &&
          Array.from({ length: 6 }).map((_, i) => (
            <MenuCardSkeleton key={i} />
          ))}

        {/* Empty State */}
        {!showSkeleton && (!menu?.data || menu.data.length === 0) && (
          <div className="col-span-full">
            <MenuEmptyState onAdd={() => setShowModel(true)} />
          </div>
        )}

        {/* Data */}
        {!showSkeleton &&
          menu?.data?.map((item) => (
            <MenuEditCard key={item._id} data={item} />
          ))}
      </main>

      <AnimatePresence>
        {showModel && (
          <CreateItemModel onClose={() => setShowModel(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuManagment;
