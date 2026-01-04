import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackHeader = ({ title, RightComponent }) => {

  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  }
  return (
    <div className="sticky z-10 top-0 border-b border-gray-300 bg-white shadow-sm">
      <div className='grid grid-cols-3 items-center max-w-[1400px] w-full mx-auto  px-4 justify-between'>
        <button onClick={handleClickBack} className="flex gap-2 sm:py-6 py-3 text-gray-700 [justify-self:left] hover:text-black cursor-pointer"><ChevronLeft /> Back</button>
        <div className='text-center font-semibold text-lg'>{title}</div>
        {RightComponent}
      </div>
    </div>
  )
}

export default BackHeader