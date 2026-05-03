import React, { useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { extractMessageFromError } from "../../utils/errorHandler";
import { motion } from "framer-motion";
import { useDeleteFood } from "../../hooks/adminHook";

const DeleteItemModel = ({ data, onClose }) => {
    const { mutateAsync: deleteFoodItem } = useDeleteFood();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteFoodItem(data._id);
            toast.success("Food Item Deleted Successfully");
            onClose();
        } catch (error) {
            toast.error(extractMessageFromError(error));
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <motion.div onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div onClick={e => e.stopPropagation()} className="w-full max-w-md flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden"
                style={{ maxHeight: '85vh' }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {/* Fixed Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                            <Trash2 className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Delete Food Item</h2>
                            <p className="text-xs text-gray-500">This action is permanent</p>
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
                    <div className="text-sm">
                        <span className="text-gray-500 font-medium">Food name: </span>
                        <span className="text-gray-900 font-semibold">{data.name}</span>
                    </div>
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-gray-800 font-semibold text-sm">
                                    Are you sure you want to delete this food item?
                                </p>
                                <p className="text-xs text-red-600 mt-1">
                                    This action cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="border-t border-gray-100 px-6 py-4 bg-white shrink-0">
                    <div className="flex gap-3">
                        <button 
                            onClick={onClose} 
                            className="flex-1 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleDelete} 
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DeleteItemModel;
