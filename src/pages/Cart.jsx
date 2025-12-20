import React, { useState } from 'react'
import BackHeader from '../components/layout/BackHeader';
import { useCartStore } from '../stores/cartStore';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmCheckoutModel from '../components/modals/ConfirmCheckoutModel';
import { AnimatePresence } from 'framer-motion';
import TokenCard from '../components/cart/TokenCard';

const Cart = () => {
  const CartItems = useCartStore(state => state.cartItems);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const clearCart = useCartStore(state => state.clearCart);
  
  const navigate = useNavigate();
  const CartIsEmpty = CartItems.length===0;
  const length = CartIsEmpty? "" : "("+CartItems.length+")";
  const [ showConfirmModel , setShowConfirmModel ] = useState(false);
  const [ tokenNumber, setTokenNumber ] = useState(null);

  const handleCartClose = (data)=>{
    setShowConfirmModel(false);
    if(!data?.data?.tokenNumber) return;
    clearCart();
    setTokenNumber(data.data.tokenNumber)
  }

  if(tokenNumber)
    return <TokenCard data={tokenNumber} />

  return (
    <div className="bg-gray-100 min-h-screen">
        <BackHeader title={"Cart"+length} />
        <div className="max-w-[1400px] w-full mx-auto px-4 pt-6 pb-40 space-y-4 ">
          {CartItems.map(item => (
            <CartItem data={item} key={item._id} />
          ))}
        </div>

        {CartIsEmpty &&
           <div className="flex items-center gap-4 mt-6 rounded-lg p-6 justify-center flex-col">
           <ShoppingBag className="w-20 h-20 text-gray-300" />
           <p className="font-semibold text-xl">Your cart is empty</p>
           <p className="text-gray-700">Add items from the menu to get started</p>
           <button onClick={() => navigate("/menu")} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">Browse Menu</button>
         </div>
        }

        {!CartIsEmpty &&
        <div className="fixed bottom-0 border border-gray-200 bg-white py-3 w-full">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex justify-between"> <p className="text-lg text-gray-500">Total Amount : </p> 
            <span className="text-xl font-semibold">₹{getTotalPrice()}</span>
            </div>
            <button 
            onClick={()=> setShowConfirmModel(true)}
            className="mt-4 w-full rounded-lg bg-orange-500 text-white text-center font-semibold px-4 py-3 hover:bg-orange-600 cursor-pointer">Proceed to Checkout</button>
            </div>
        </div>
      }
      <AnimatePresence>
      {showConfirmModel &&
        <ConfirmCheckoutModel onClose={handleCartClose}/>
      }
      </AnimatePresence>
    </div>
  )
}

const CartItem = ({data})=>{
  const totalPrice = data.price * data.quantity;
  
  const increaseQty = useCartStore(state => state.increaseQty);
  const decreaseQty = useCartStore(state => state.decreaseQty);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  return (
    <div className="max-h-lg h-38 border border-gray-300 overflow-hidden rounded-xl flex items-center px-4 bg-white gap-4">
      <img className="rounded-xl h-30 w-30" src={data.image} alt={data.name} />
      <div className="flex flex-col w-full justify-between h-full py-6">
        <div className="flex justify-between w-full">
          <h1 className="font-semibold text-lg">{data.name}</h1>
          <Trash2   onClick={() => removeFromCart(data._id)} className="text-red-500 hover:text-red-600 cursor-pointer" />
        </div>
          <span className="text-orange-500  text-lg">₹{data.price}</span>
        <div className="flex justify-between w-full">
        <div className='flex items-center gap-2'>
          <Minus onClick={() => decreaseQty(data._id)} className="bg-gray-200 p-1 rounded-sm cursor-pointer select-none"/>
          <span>{data.quantity}</span>
          <Plus onClick={() => increaseQty(data._id)} className="bg-gray-200 p-1 rounded-sm cursor-pointer select-none"/>
        </div>
          <span  className="text-xl">₹{totalPrice}</span>
        </div>
      </div>
    </div>
  )
}
export default Cart