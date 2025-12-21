import React from 'react'
import { useGetUser } from '../../hooks/AuthHook'
import { ShieldUser, UtensilsCrossed } from 'lucide-react';
import ProfileDropDown from '../common/ProfileDropDown';

const Header = () => {
  const { data } = useGetUser();
  const isAdmin = data?.user?.role === "admin";

  return (
    <div className=" border-gray-200  border-b  px-4">
      <div className="flex items-center max-w-[1400px] w-full mx-auto">
        {isAdmin ?
          <div>
            <h2 className="flex items-center py-4 text-xl font-semibold space-x-4"><ShieldUser className="text-blue-500" />Admin Panel</h2>
          </div>
          :
          <div className="flex gap-2 px-4 py-4 items-center text-lg font-semibold">
            <UtensilsCrossed className="text-orange-500 w-6 h-6" />
            Canteen
          </div>
        }
        <ProfileDropDown />
      </div>
    </div>
  )
}

export default Header