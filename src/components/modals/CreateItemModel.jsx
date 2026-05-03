import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, XCircle, Loader, X, Plus } from "lucide-react";
import { zfd } from "zod-form-data";
import toast from "react-hot-toast";
import { extractMessageFromError } from "../../utils/errorHandler";
import { useCreateFood } from "../../hooks/adminHook";
import { motion } from "framer-motion";
import Checkbox from "../ui/Checkbox";

// ---------------------------
// Zod schema
// ---------------------------
const fileSchema = zfd.file(
  z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "File too large (max 5MB)")
    .refine((file) => file.type.startsWith("image/"), "Only image files allowed")
);

const FoodSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  image: fileSchema,
  isAvailable: z.boolean().default(true),
});

const CreateItemModel = ({ onClose }) => {
  const { mutateAsync: createFoodItem } = useCreateFood();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(FoodSchema),
    mode: "onChange", // track validation as user types
  });

  
  const isAvailable = watch("isAvailable");
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("isAvailable", data.isAvailable);

    try {
      await createFoodItem(formData);
  
      toast.success("Food Item Created Successfully");
      reset();
      setPreviewImage(null);
      onClose?.();
  
    } catch (error) {
      toast.error(extractMessageFromError(error));
    }
  };

  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg lg:max-w-2xl xl:max-w-3xl flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden"
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
              <Plus className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Add New Item</h2>
              <p className="text-xs text-gray-500">Fill in the details below</p>
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
          <div className="flex-1 overflow-y-auto">
            <form id="create-food-form" onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-5">
              {/* Name, Price, Category Grid for larger screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Food Name</label>
                  <input
                    {...register("name")}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                    placeholder="Enter food name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      {...register("price")}
                      className="w-full px-4 py-2.5 pl-8 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                      placeholder="0"
                    />
                  </div>
                  {errors.price && <p className="text-red-500 text-xs mt-1.5">{errors.price.message}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <input
                    {...register("category")}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
                    placeholder="e.g., Fast Food, Vegan, Drinks"
                  />
                  {errors.category && <p className="text-red-500 text-xs mt-1.5">{errors.category.message}</p>}
                </div>
              </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                rows={3}
                {...register("description")}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all resize-none"
                placeholder="Write a short description..."
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1.5">{errors.description.message}</p>
              )}
            </div>

            {/* Availability */}
            <div 
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer"
              onClick={() => setValue("isAvailable", !isAvailable, { shouldValidate: true })}
            >
              <Checkbox
                state={isAvailable}
                setState={() => setValue("isAvailable", !isAvailable, { shouldValidate: true })}
              />
              <label className="font-medium text-gray-700 text-sm cursor-pointer">
                Available for ordering
              </label>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Food Image</label>

              {/* Upload Box */}
              {!previewImage && (
                <label className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-orange-300 transition-colors cursor-pointer block">
                  <Upload className="text-gray-400 mx-auto mb-2" size={32} />
                  <span className="text-sm text-gray-500">Click to upload image</span>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image")}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreviewImage(URL.createObjectURL(file));
                        setValue("image", file, { shouldValidate: true });
                      }
                    }}
                  />
                </label>
              )}

              {/* Image Preview + Remove */}
              {previewImage && (
                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    onClick={() => {
                      setPreviewImage(null);
                      const fileInput = document.querySelector("input[type='file']");
                      if (fileInput) fileInput.value = "";
                      setValue("image", null, { shouldValidate: true });
                    }}
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              )}

              {errors.image && <p className="text-red-500 text-xs mt-1.5">{errors.image.message}</p>}
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-gray-100 px-6 py-4 bg-white shrink-0">
          <button
            type="submit"
            form="create-food-form"
            className="w-full bg-orange-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/25"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin h-4 w-4" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create Item
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateItemModel;
