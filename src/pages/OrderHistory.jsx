import React, { useEffect, useState } from 'react';
import { useGetUserOrders } from '../hooks/useOrder';
import BackHeader from '../components/layout/BackHeader';
import OrderHistoryCard from '../components/order-history/OrderHistoryCard';
import { useNavigate } from 'react-router-dom';
import socket from '../utils/socket';

const OrderHistory = () => {
  const { data: userOrders, isLoading } = useGetUserOrders();
  const isEmpty = !isLoading && !userOrders?.orders?.length;
  
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    if (!isLoading && userOrders?.orders) {
      setOrders(userOrders.orders);
    }
  }, [isLoading, userOrders]);

  // 2️⃣ Listen for live updates from socket
  useEffect(() => {
    const handleOrderUpdate = (data) => {
      console.log("Live order update received:", data);

      // Update the matching order's status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === data.orderId
            ? { ...order, status: data.status }
            : order
        )
      );
    };

    socket.on("order-status-updated", handleOrderUpdate);

    // Cleanup listener on unmount
    return () => {
      socket.off("order-status-updated", handleOrderUpdate);
    };
  }, []);

  // Tab options
  const tabs = ['Active', 'Completed', 'Cancelled'];
  const [activeTab, setActiveTab] = useState('Active');

  const navigate = useNavigate();
  // Filter orders based on selected tab
  const filteredOrders = (orders || []).filter(order => {
    const status = order.status.toLowerCase();
    if (activeTab === 'Active') return ['pending', 'preparing', 'ready'].includes(status);
    if (activeTab === 'Completed') return status === 'completed';
    if (activeTab === 'Cancelled') return status === 'cancelled';
    return true;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <BackHeader title="Order History" />

      <div className="max-w-[1400px] mx-auto p-4">

        {/* --- Tabs --- */}
        <div className="flex gap-2 mb-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-orange-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- Empty State --- */}
        {(!filteredOrders.length && !isLoading) && (
          <div className="py-8 max-w-xl rounded-lg border-2 border-dashed border-gray-200 mx-auto flex flex-col items-center justify-center bg-white">
            <p className="text-3xl font-semibold mt-2">No Orders Yet</p>
            <p className="max-w-sm px-4 text-center text-gray-500 mt-4">
              Start your culinary journey! Browse our menu and place your first order.
            </p>
            <button onClick={() => navigate('/menu')} className="cursor-pointer hover:bg-orange-600 mt-4 px-4 py-2 text-white bg-orange-500 rounded-lg w-fit mx-auto">
              Browse Menu
            </button>
          </div>
        )}

        {/* --- Order Cards --- */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 mx-4 grid-cols-1 gap-4">
          {filteredOrders.map(order => (
            <OrderHistoryCard data={order} key={order._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
