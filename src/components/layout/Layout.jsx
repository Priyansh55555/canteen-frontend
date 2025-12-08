import React from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const authRoutes = ["/", "/signup"];
const Layout = ({children}) => {
  const location = useLocation();
  console.log(location.pathname)
  if(authRoutes.some((r) => r===location.pathname)) return children;
  return (
    <div className='flex min-h-screen'>
        <Sidebar />
      <main className='bg-gray-50 w-full h-screen'>
        {children}
      </main>
    </div>
  )
}

export default Layout