import React, { useState } from "react";
import { X } from "lucide-react";
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
                        Delete Food Item
                    </h2>
                    <X
                        onClick={onClose}
                        className="rounded-lg cursor-pointer hover:bg-gray-200 text-gray-600 hover:text-gray-800 ml-auto w-9 h-9 p-1" />
                </div>

                <div className="text-lg"> <span className="text-gray-500 font-semibold">Food name : </span>{data.name}</div>
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-gray-800 font-semibold">
                        Are you sure you want to delete this food item?
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                        This action cannot be undone.
                    </p>
                </div>

                <div className="flex mt-3 gap-2">
                    <button onClick={onClose} className="cursor-pointer border border-gray-300 bg-gray-100 hover:bg-gray-200 w-full rounded-lg py-2">Cancle</button>
                    <button onClick={handleDelete} className="cursor-pointer  border-gray-300 bg-red-500 text-white w-full rounded-lg py-2">
                        {isDeleting ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                                Deleting...
                            </span>
                        ) : (
                            "Delete"
                        )}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DeleteItemModel;
