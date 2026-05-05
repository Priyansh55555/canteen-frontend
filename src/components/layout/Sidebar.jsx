import React, { useMemo, useState } from 'react'
import { History, Home, LayoutDashboard, LogOut, ShoppingCart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetUser, useLogout } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const handleNavigate = (path)=>{
    navigate(path);
  }
  const { mutate : Logout } = useLogout();
  const { data : user, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const routes = useMemo(() =>[
    {
      label: "Admin Dashboard",
      path: "/Dashboard",
      Icon: LayoutDashboard 
    },
    {
      label: "Home",
      path: "/home",
      Icon: Home  
    },
    {
      label: "Cart",
      path: "/cart",
      Icon: ShoppingCart  
    },
    {
      label: "Order History",
      path: "/order-history",
      Icon: History  
    },
    {
      label: "User",
      path: "/user",
      Icon: User  
    }
  ], []);

  const handleLogout = async()=>{
  try{
     Logout(undefined,{
      onSuccess: ()=>{
        console.log("success")
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success("User Loged out Successfully.");
        navigate("/");
      },
      onError: (err)=>{
        toast.error("Could not log out user. plese try again.")
        console.log(err);
      }
    });
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className='max-w-[250px] w-0 overflow-x-hidden sm:w-full bg-gray-900 h-screen flex flex-col '>
      <div className='mb-4 mt-3 text-2xl font-bold pl-4 text-orange-500 '>
        Canteen App
      </div>
      <div className='h-full'>
        {routes.map(({Icon, label, path},idx) =>(
          <div key={path} onClick={()=> handleNavigate(path)} className={`p-3 m-2 flex items-center gap-4  rounded-lg cursor-pointer
              ${location.pathname === path ? "font-medium bg-orange-500 text-white" : "text-gray-500 hover:bg-white/10"}
          `}>
            <Icon className="size-5"/>
            {label}
          </div>
        ))}
      </div>

      <div className='relative '>
        <div onClick={()=>setShowProfileDialog(prev => !prev)} className='select-none relative mt-auto flex items-center gap-x-3 p-3 m-2 rounded-lg font-medium cursor-pointer hover:bg-white/30'>
          <div  className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">P</div>
          <div className='flex flex-col '>
            <p className='text-sm text-white font-semibold'>{user?.user?.name}</p>
            <p className='text-sm text-gray-400'>{user?.user?.email}</p>
          </div>
        </div>
          { showProfileDialog &&
            <div className="absolute overflow-hidden  bottom-[calc(100%+5px)] bg-white left-1/2 -translate-x-1/2 text-xl w-[90%]  rounded-lg flex flex-col">
              <button onClick={handleLogout} className='p-2 flex items-center text-start text-red-600 w-full  hover:bg-blue-100 cursor-pointer'>
                <p>Logout </p>
                <LogOut className="ml-auto" />
              </button>
            </div>
          }
      </div>
    </div>
  )
}

export default Sidebar