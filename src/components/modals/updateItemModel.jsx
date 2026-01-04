import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, XCircle, PlusCircle, Loader, X } from "lucide-react";
import { zfd } from "zod-form-data";
import toast from "react-hot-toast";
import { extractMessageFromError } from "../../utils/errorHandler";
import { useUpdateFood } from "../../hooks/adminHook";
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
  image: fileSchema.optional(), // 👈 important
  isAvailable: z.boolean().default(true),
});

const UpdateItemModel = ({ defaultData, onClose }) => {
  const { mutateAsync: updateFoodItem } = useUpdateFood();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(FoodSchema),
    mode: "onChange", // track validation as user types
  });

  const isAvailable = watch("isAvailable");

  useEffect(() => {
    if (defaultData) {
      reset({
        name: defaultData.name || "",
        price: defaultData.price || "",
        category: defaultData.category || "",
        description: defaultData.description || "",
        image: undefined, // 👈 never set file here
        isAvailable: defaultData.isAvailable ?? true,
      });
    }

    setPreviewImage((prev) => {
      if (!defaultData?.image) return prev;
      return defaultData.image;
    });
  }, [defaultData, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("isAvailable", data.isAvailable);

    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      await updateFoodItem({
        body: formData,
        id: defaultData?._id,
      });

      toast.success("Food Item Updated Successfully");
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
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        className="w-full  max-w-xl flex flex-col overflow-y-auto  bg-white shadow-xl  max-h-full rounded-2xl p-6 m-2 border border-gray-400"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="flex items-start">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            Update Food Item
          </h2>
          <X
            onClick={onClose}
            className="rounded-lg cursor-pointer hover:bg-gray-200 text-gray-600 hover:text-gray-800 ml-auto w-9 h-9 p-1" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <div className="space-y-4 ">
            {/* Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Food Name</label>
              <input
                {...register("name")}
                className="w-full px-3 py-2 border bg-gray-100 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter food name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                {...register("price")}
                className="px-3 py-2 border bg-gray-100 border-gray-200 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter price"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Category</label>
              <input
                {...register("category")}
                className="px-3 py-2 border bg-gray-100 border-gray-200 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g., Fast Food, Vegan, Drinks"
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                {...register("description")}
                className="px-3 py-2 border bg-gray-100 border-gray-200 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Write a short description..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">

              <Checkbox
                state={isAvailable}
                setState={() => setValue("isAvailable", !isAvailable, { shouldValidate: true })}
              />
              <label className="font-medium text-gray-700">
                Available
              </label>
            </div>
            {/* Image Upload */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Food Image</label>

              {/* Upload Box */}
              {!previewImage && (
                <div className="border border-dashed bg-gray-100 border-gray-400 rounded-xl p-6 text-center hover:bg-gray-50">
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="text-gray-600" size={28} />
                    <span className="text-gray-600">Click to upload</span>
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
                </div>
              )}

              {/* Image Preview + Remove */}
              {previewImage && (
                <div className="mt-4 flex flex-col items-center">
                  <img
                    src={previewImage}
                    className="w-40 h-40 object-cover rounded-xl shadow"
                  />
                  <button
                    type="button"
                    className="mt-3 flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                    onClick={() => {
                      setPreviewImage(null);
                      const fileInput = document.querySelector("input[type='file']");
                      if (fileInput) fileInput.value = "";
                      setValue("image", null, { shouldValidate: true });
                    }}
                  >
                    <XCircle size={18} /> Remove Image
                  </button>
                </div>
              )}

              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:opacity-50 cursor-pointer"
            disabled={isSubmitting || !isValid} // disable if form invalid or submitting
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin h-5 w-5 text-white" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateItemModel;
