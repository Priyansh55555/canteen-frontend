import React, { useMemo, useState } from 'react'
import CreateItemModel from '../../components/modals/CreateItemModel';
import { useGetUser } from '../../hooks/AuthHook';
import { ChartColumn, Clock5, List, ListOrdered, ListOrderedIcon, UtensilsCrossed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';

const Dashboard = () => {
  const { data } = useGetUser();


  const Statics = useMemo(() => {
    return [{
      heading: "Total Orders Today",
      statics: "23",
      icon: {
        icon: ChartColumn,
        color: "blue"
      }
    }, {
      heading: "Current Serving",
      statics: "23",
      icon: {
        icon: Clock5,
        color: "green"
      }
    }, {
      heading: "Pending Orders",
      statics: "23",
      icon: {
        icon: List,
        color: "orange"
      }
    }]
  }, []);
  return (
    <div className='flex flex-col'>
      <Header />
      <div className="p-4">

        <div className="p-4 rounded-xl w-full bg-white border border-gray-200">
          <p className='font-semibold text-lg'> Welcome, {data?.user?.name}</p>
          <p className="text-gray-600 mt-4"> Manage orders and menu from your dashboard </p>
        </div>


        <div className="grid mt-4 gap-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
          {
            Statics.map((item) => (
              <StaticsCard key={item.heading} heading={item.heading} statics={item.statics} icon={item.icon} />
            ))
          }
        </div>

        <div className="grid mt-4 gap-4  sm:grid-cols-2 grid-cols-1 ">
          {
            cardData.map((item) => (
              <Card key={item.label} data={item} />
            ))
          }
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


const cardData = [
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