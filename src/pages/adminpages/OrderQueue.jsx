import React, { useMemo, useState } from 'react'
import BackHeader from '../../components/layout/BackHeader'
import { ChefHat, PackageOpen } from 'lucide-react' // Added PackageOpen for empty state
import { useGetAllOrders, useUpdateOrderStatus } from '../../hooks/adminHook';
import OrderCard from "../../components/order-queue/OrderCard";
import toast from 'react-hot-toast';
import { extractMessageFromError } from '../../utils/errorHandler';
import { Statics , filters } from "../../constants/OrderQueue";

const OrderQueue = () => {
    const [currentFilter, setCurrentFilter ] = useState("Pending");
    const [chandingStatus, setChangindStatus ] = useState(false);
    const {data: orders, isLoading } = useGetAllOrders();
    
    const { mutateAsync: updateOrderStatus } = useUpdateOrderStatus();
    
    const filteredOrders = useMemo(()=>{
        if(isLoading || !orders?.orders) return [];
        if(currentFilter === "All") return orders.orders;
        return orders.orders.filter(order => order.status?.toLowerCase() === currentFilter?.toLowerCase());
    },[currentFilter, orders, isLoading]);

    const statics = useMemo(()=>{
        if(isLoading || !orders?.orders) return {};
        return orders.orders.reduce((countMap, currentItem) => {
            const status = currentItem.status.toLowerCase();
            countMap[status] = (countMap[status] || 0) + 1;
            return countMap;
          }, {});
    },[orders, isLoading]);

    const handleStatusChange = async(id, newStatus) =>{
        setChangindStatus(true);
        try {
            await updateOrderStatus({id, newStatus});
            toast.success("Order status updated Successfully");
        } catch (error) {
            toast.error(extractMessageFromError(error));
        } finally {
            setChangindStatus(false);
        }
    }

    return (
        <div className="pb-8">
            <BackHeader title="Order Queue" />

            <div className='max-w-[1400px] mx-auto'>
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 w-full p-4 overflow-x-auto">
                    {Statics.map(s => (
                        <div key={s.status} className={`p-4 min-w-[90px] text-center flex flex-col gap-2 justify-center items-center rounded-xl w-full border ${s.theme_color}`}>
                            <s.icon />
                            <p className="font-bold text-lg">{statics[s.status.toLowerCase()] ?? 0}</p>
                            <p className="text-sm opacity-80">{s.status}</p>
                        </div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="rounded-full mb-6 mx-4 flex flex-wrap gap-2">
                    {filters.map(item => (
                        <div 
                            key={item.status}
                            onClick={() => setCurrentFilter(item.status)} 
                            className={`relative flex items-center rounded-full justify-center w-fit gap-2 py-1.5 px-4 cursor-pointer transition-all
                            ${currentFilter === item.status ? item?.class : "bg-gray-50 border border-gray-200 hover:bg-gray-100"}`}
                        >
                            <item.icon className={`w-4 h-4 text-gray-500 ${currentFilter === item.status ? item?.iconClass : ""}`} />
                            <span className="text-sm font-medium">{item.status}</span>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        <p className="mt-4 text-gray-500 font-medium">Loading orders...</p>
                    </div>
                ) : filteredOrders.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 mx-4 grid-cols-1 gap-4">
                        {filteredOrders.map(order => (
                            <OrderCard order={order} key={order.id} onStatusChange={handleStatusChange} />
                        ))}
                    </div>
                ) : (
                    /* EMPTY STATE */
                    <div className="flex flex-col items-center justify-center py-24 mx-4 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
                        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                            <PackageOpen className="w-12 h-12 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700">No {currentFilter !== "All" ? currentFilter : ""} Orders</h3>
                        <p className="text-gray-500 text-center max-w-xs mt-2">
                            {currentFilter === "All" 
                                ? "You don't have any orders in the system yet." 
                                : `There are currently no orders with the status "${currentFilter}".`}
                        </p>
                        {currentFilter !== "All" && (
                            <button 
                                onClick={() => setCurrentFilter("All")}
                                className="mt-6 text-primary font-medium hover:underline"
                            >
                                View all orders
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderQueue