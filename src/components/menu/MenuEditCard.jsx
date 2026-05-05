import { SquarePen, Trash2 } from 'lucide-react'
import React, {  useState } from 'react'
import Checkbox from '../ui/Checkbox'
import UpdateItemModel from '../modals/updateItemModel';
import { AnimatePresence } from 'framer-motion';
import DeleteItemModel from '../modals/DeleteItemModel';

// {
//     "_id": "693446685aabc6b00600d17c",
//     "name": "monkey frie",
//     "price": 1000,
//     "category": "fast food",
//     "description": "ksdjlkfd",
//     "image": "https://res.cloudinary.com/dm95nztgz/image/upload/v1765033575/canteen_items/beuhhp7kh3osnvpcyumb.png",
//     "isAvailable": true,
//     "createdAt": "2025-12-06T15:06:16.462Z",
//     "updatedAt": "2025-12-06T15:06:16.462Z",
//     "__v": 0
// }
const MenuEditCard = ({data}) => {

  const [ showUpdateModel, setShowUpdateModel ] = useState(false);
  const [ showDeleteModel, setShowDeleteModel ] = useState(false);

  return (
    <div className="bg-white flex flex-col  p-4 rounded-lg overflow-hidden shadow-sm border border-gray-200">
        <img className="rounded-lg object-cover h-50 w-full" src={data.image} alt={data.name} />

    <div className="flex justify-between">
          {/* Left info */}
          <div className="flex flex-col  mt-2">
          <p className="text-lg font-semibold capitalize">{data.name}</p>
          
        <span className="text-gray-500 text-sm">{data.category}</span>
        <span className='text-orange-500 text-lg pt-2 pb-4'>₹{data.price}</span>
         
        </div>
        
{/* Right Info */}
        <div className="flex flex-col items-end ml-auto mt-3 gap-3">
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500">Available</span>
            <Checkbox disabled={true} state={data.isAvailable} setState={() => void(0)} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500">View on Landing page</span>
            <Checkbox disabled={true} state={data.canShowWithoutLogin} setState={() => void(0)} />
          </div>
          </div>
          
    </div>
        <div className='flex gap-2'>
          <button
          onClick={()=> setShowUpdateModel(true)}
          className='w-full cursor-pointer hover:bg-gray-100 border-gray-200 text-center border rounded-lg flex justify-center items-center gap-2'>
            <SquarePen className='w-4 h-4' />Edit</button>
          <button
          onClick={()=> setShowDeleteModel(true)}
          className='border border-gray-200 hover:bg-gray-100 text-red-500  cursor-pointer rounded-lg px-3 py-2'> <Trash2  className='w-4 h-4' /></button>
        </div>

        <AnimatePresence>
            {showUpdateModel &&
                <UpdateItemModel defaultData={data} onClose={() => setShowUpdateModel(false)} />
            }
            {showDeleteModel &&
              <DeleteItemModel data={data}   onClose={() => setShowDeleteModel(false)} />
            }
            </AnimatePresence>
    </div>
  )
}

export default MenuEditCard