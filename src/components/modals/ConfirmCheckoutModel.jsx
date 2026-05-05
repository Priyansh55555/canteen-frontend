import React, { useState } from "react";
import { X, ShoppingCart, Check } from "lucide-react";
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
        <motion.div onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div onClick={e => e.stopPropagation()} className="w-full max-w-lg flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden"
                style={{ maxHeight: '85vh' }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {/* Fixed Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <ShoppingCart className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Confirm Your Order</h2>
                            <p className="text-xs text-gray-500">Review your order details</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Order Summary</h3>
                    
                    <div className="space-y-3 mb-4">
                        <div className="grid grid-cols-[2fr_1fr_1fr] text-xs font-semibold text-gray-500 pb-2 border-b border-gray-100">
                            <p>Item Name</p>
                            <p className="text-center">Qty</p>
                            <p className="text-right">Price</p>
                        </div>
                        {CartItems.map(item => (
                            <ItemSummaryCard key={item._id} data={item} />
                        ))}
                    </div>

                    <div className="flex justify-between items-center bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <p className="text-sm font-medium text-gray-700">Total Amount</p> 
                        <span className="text-lg font-bold text-orange-600">₹{getTotalPrice()}</span>
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="border-t border-gray-100 px-6 py-4 bg-white shrink-0">
                    <div className="flex gap-3">
                        <button 
                            disabled={isLoading} 
                            onClick={onClose} 
                            className="flex-1 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button 
                            disabled={isLoading} 
                            onClick={handleCheckout} 
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-orange-500/25"
                        >
                            {isLoading ? (
                                <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    Confirm Order
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};


const ItemSummaryCard = ({data})=>{
    const totalPrice = data.price * data.quantity;
    return (
        <div className="grid grid-cols-[2fr_1fr_1fr] text-sm py-2 border-b border-gray-50 last:border-0">
            <p className="capitalize text-gray-700">{data.name}</p>
            <p className="text-center text-gray-600">{Math.max(0, data.quantity)}</p>
            <p className="text-right text-gray-700 font-medium">₹{totalPrice}</p>
        </div>
    )
}

export default ConfirmCheckoutModel;
