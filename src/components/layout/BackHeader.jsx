import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackHeader = ({ title, RightComponent }) => {

const navigate = useNavigate();
const handleClickBack = ()=>{
    navigate(-1);
}
  return (
    <div className='flex items-center px-4 justify-between border-b border-gray-300 shadow-sm'>
        <button onClick={handleClickBack} className="flex gap-2 py-4 cursor-pointer hover:bg-gray-100 bg-gray-50"><ChevronLeft /> Back</button>
        <div className='text-center font-semibold text-lg'>{title}</div>
        <div>{RightComponent}</div>
    </div>
  )
}

export default BackHeader