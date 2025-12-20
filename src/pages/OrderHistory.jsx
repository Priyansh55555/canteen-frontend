import React from 'react'
import { useGetUserOrders } from '../hooks/useOrder';
import BackHeader from '../components/layout/BackHeader';
import { formateMDYTime } from "../utils/formateDate";
import { Clock } from 'lucide-react';

//   {
//       "_id": "6946b7aad85d7c0b417615ac",
//       "userId": "6932c66515ff663e0b714e5f",
//       "items": [
//           {
//               "menuItemId": {
//                   "_id": "69469ab9ae95c35b69a03276",
//                   "name": "Monkey Soop",
//                   "price": 100,
//                   "category": "Veg",
//                   "description": "monkey king soop",
//                   "image": "https://res.cloudinary.com/dm95nztgz/image/upload/v1766234808/canteen_items/kvtq8lrrd4blimb3q5dn.png",
//                   "isAvailable": true,
//                   "createdAt": "2025-12-20T12:46:49.242Z",
//                   "updatedAt": "2025-12-20T12:47:57.316Z",
//                   "__v": 0
//               },
//               "quantity": 5,
//               "_id": "6946b7aad85d7c0b417615ad"
//           }
//       ],
//       "totalAmount": 500,
//       "tokenNumber": 4,
//       "status": "pending",
//       "createdAt": "2025-12-20T14:50:18.161Z",
//       "updatedAt": "2025-12-20T14:50:18.161Z",
//       "__v": 0
//   }

const OrderHistory = () => {
  const { data: userOrders, isLoading } = useGetUserOrders();

  return (
    <div className="bg-gray-100 min-h-screen">
          <BackHeader title="Order History"/>          
          <div className="flex flex-col justify-center mx-auto p-4 max-w-[1400px]">
            {userOrders?.orders?.map(order => (
              <OrderHistoryCard data={order} key={order._id} />
            ))}
          </div>
    </div>
  )
}

export default OrderHistory

const OrderHistoryCard = ({ data }) =>{

  return(
    <div className="border border-gray-300 max-w-[300px] bg-white rounded-lg p-4 ">
        <div className="w-full flex"> 
          <span className="text-lg font-semibold mr-2">Token </span>
          <span className="border-2 border-orange-500 text-orange-500 px-2 rounded-lg pl-2">{data.tokenNumber}</span>
          <span className="ml-auto">{data.status}</span>
          </div>
        
        <div className="text-sm text-gray-500 mt-4 flex items-center gap-2"><Clock className="w-4 h-4" />{formateMDYTime(data.createdAt)}</div>
        <div className="flex justify-between border-t border-gray-200 mt-4 pt-2"> 
          <span className="font-semibold text-gray-600 text-lg">Total Amount : </span> 
        <span className="text-orange-500 text-xl">₹{data.totalAmount}</span></div>
    </div>
  )
}