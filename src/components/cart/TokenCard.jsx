import { CircleCheckBig } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const TokenCard = ( {data} ) => {
    const navigate = useNavigate();
  return (
    <div className="flex w-full items-center justify-center h-screen bg-[#FFF4E6] px-4">
        <div className="flex flex-col items-center justify-center p-8 max-w-[450px] w-full bg-white border border-gray-200 rounded-xl mx-auto">
        <CircleCheckBig className="text-green-500 w-20 h-20" />
        <h2 className="text-xl mt-4 font-bold">Order Placed Successfully!</h2>
        <p className="text-gray-600 mt-2 mb-6"> Your token number is</p>
        <div className="w-full bg-orange-500 text-white rounded-lg p-6 flex flex-col items-center justify-center">
        <span className="text-sm">Token Number</span>
        <span className="text-6xl">{data}</span>
        </div>
        <button className="font-semibold w-full py-1 cursor-pointer rounded-lg bg-orange-500 hover:bg-orange-600 text-white mt-2">Track Order Status</button>
        <button
        onClick={() => navigate("/dashboard")}
        className="font-semibold w-full py-1 cursor-pointer rounded-lg bg-white hover:bg-gray-100 border border-gray-300 mt-2">Back to Dashboard</button>
    </div>
  </div>
  )
}

export default TokenCard