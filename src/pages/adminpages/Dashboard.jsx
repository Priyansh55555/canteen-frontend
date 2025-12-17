import React, { useMemo } from 'react'
import { useGetUser } from '../../hooks/AuthHook';
import { History, ListOrdered, ShoppingBag, UtensilsCrossed, UtensilsCrossedIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { Statics } from "../../constants/DashboardStatics";


const Dashboard = () => {
  const { data } = useGetUser();
  const isAdmin = data?.user?.role === "admin";
  const navigate = useNavigate();

  return (
    <div className='flex flex-col'>
      <Header />
      <div className="p-6 w-full max-w-[1400px] mx-auto">
        <div className="p-4 rounded-xl w-full bg-white border border-gray-200">
          <p className='font-semibold text-lg'> Welcome, {data?.user?.name}</p>
          <p className="text-gray-600 mt-4"> {isAdmin ? "Manage orders and menu from your dashboard" : "Ready to order delicious food? Check out our menu and place your order!"} </p>
        </div>

        {isAdmin ?
          <>
            <div className="grid mt-6 gap-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
              {
                Statics.map((item) => (
                  <StaticsCard key={item.heading} heading={item.heading} statics={item.statics} icon={item.icon} />
                ))
              }
            </div>
          </>
          :
          null
        }
        <div className="grid mt-6 gap-4  sm:grid-cols-2 grid-cols-1 ">
          {isAdmin ?
            cardDataAdmin.map((item) => (
              <Card key={item.label} data={item} />
            ))
            :
            cardData.map((item) => (
              <Card key={item.label} data={item} />
            ))
          }
        </div>

        <div className="flex items-center gap-4 mt-6 rounded-lg p-6 justify-center flex-col bg-white border border-gray-200 ">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
          <p className="font-semibold text-xl">Ready to Order?</p>
          <p className="text-gray-700">Browse our delicious menu and place your order</p>
          <button onClick={() => navigate("/menu")} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">View Menu</button>
        </div>
      </div>
    </div>

  )
}

export default Dashboard


const StaticsCard = ({ heading, statics, icon }) => {

  return (
    <div className="p-4 bg-white rounded-lg w-full flex items-center border border-gray-300">
      <div className="flex flex-col">
        <p className="text-gray-500">{heading}</p>
        <span className="text-3xl mt-2">{statics}</span>
      </div>
      <div className="ml-auto">
        <icon.icon className={`size-10 text-${icon.color}-500`} />
      </div>
    </div>
  );
}


const cardDataAdmin = [
  {
    icon: <ListOrdered className="bg-blue-300/50 text-blue-600 rounded-full w-14 h-14 p-3" />,
    label: "Order Queue",
    description: "Manage live orders",
    link: "/order-queue"
  },
  {
    icon: <UtensilsCrossed className="bg-orange-300/50 text-orange-600 rounded-full w-14 h-14 p-3 " />,
    label: "Menu Management",
    description: "Add, edit or remove items",
    link: "/menu-managment"
  }
]

const cardData = [
  {
    icon: <UtensilsCrossedIcon className="bg-orange-300/50 text-orange-600 rounded-full w-14 h-14 p-3 " />,
    label: "Browse Menu",
    description: "View available items",
    link: "/menu"
  }, {
    icon: <History className="bg-blue-300/50 text-blue-600 rounded-full w-14 h-14 p-3" />,
    label: "Order History",
    description: "live Order Track",
    link: "/order-history"
  }
]


const Card = ({ data }) => {

  const { icon, label, description, link } = data;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(link);
  }

  return (
    <div
      onClick={handleNavigate}
      className="flex rounded-lg gap-4 items-center border p-4 bg-white border-gray-300 cursor-pointer hover:shadow-lg">
      <div className="">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{label}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}