import React from 'react'
import { useGetUser } from '../../hooks/AuthHook'
import { ShieldUser } from 'lucide-react';
import ProfileDropDown from '../common/ProfileDropDown';

const Header = () => {
  const { data } = useGetUser();
  const isAdmin = data?.user?.role === "admin";

  return (
    <div className="flex border-b px-4 border-gray-200">
      {isAdmin &&
        <div>
          <h2 className="flex items-center py-4 text-xl font-semibold space-x-4"><ShieldUser className="text-blue-500" />Admin Panel</h2>
        </div>
      }
      <ProfileDropDown />
    </div>
  )
}

export default Header