import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { extractMessageFromError } from "../../utils/errorHandler";
import { motion } from "framer-motion";
import { useCartStore } from "../../stores/cartStore";
import { usePlaceOrder } from "../../hooks/useOrder";

const ConfirmCheckoutModel = ({onClose}) => {

      const CartItems = useCartStore(state => state.cartItems);
      const getTotalPrice = useCartStore(state => state.getTotalPrice);
      const { mutateAsync: placeOrder } = usePlaceOrder();
      const [ isLoading, setIsLoading ] = useState();

      const handleCheckout = async () => {
        try {
            setIsLoading(true);
            const res = await placeOrder({items : CartItems});
            toast.success("Order Placed Successfully");
            onClose({ data : res });
        } catch (error) {
            toast.error(extractMessageFromError(error));
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <motion.div onClick={onClose} className="fixed inset-0 bg-black/20 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div onClick={e => e.stopPropagation()} className="w-full  max-w-xl flex flex-col overflow-y-auto  bg-white shadow-xl  max-h-full rounded-2xl p-6 m-2 border border-gray-400"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <div className="flex items-start">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        Confirm Your Order
                    </h2>
                    <X
                        onClick={onClose}
                        className="rounded-lg cursor-pointer hover:bg-gray-200 text-gray-600 hover:text-gray-800 ml-auto w-9 h-9 p-1" />
                </div>

                <div>
                    <h3 className="text-lg">Order Summary</h3>
                    
                    <div className="grid mb-2 grid-cols-[2fr_1fr_1fr] font-semibold text-gray-500">
                        <p className="">Item Name:</p>
                        <p className="">Qty</p>
                        <p className="">Total Price</p>
                     </div>
                    {CartItems.map(item => (
                        <ItemSummaryCard key={item._id} data={item} />
                    ))}
                </div>
                <div className="mt-4 text-lg flex justify-between bg-orange-100 border-orange-300 border rounded-lg p-4">
                    <p>Total Amount : </p> 
                    <span className="font-semibold"> ₹{getTotalPrice()}</span>
                 </div>
             

                <div className="flex mt-3 gap-2">
                    <button disabled={isLoading} onClick={onClose} className="cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200 w-full rounded-lg py-2">Cancle</button>
                    <button disabled={isLoading} onClick={handleCheckout} className="cursor-pointer max-sm:text-sm border-gray-300 bg-orange-500 text-white w-full rounded-lg py-2">
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                                Plcing order...
                            </span>
                        ) : (
                            "Confirm Checkout"
                        )}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};


const ItemSummaryCard = ({data})=>{
    const totalPrice = data.price * data.quantity;
    return (
        <div className="grid grid-cols-[2fr_1fr_1fr]">
            <p className="capitalize">{data.name}</p>
            <p className="">{data.quantity}</p>
            <p className="">₹{totalPrice}</p>
        </div>
    )
}

export default ConfirmCheckoutModel;
