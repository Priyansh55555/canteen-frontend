import React, { useState } from "react";
import { useCreateFood } from "../hooks/adminHook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, XCircle, PlusCircle, Loader } from "lucide-react";
import { zfd } from "zod-form-data";
import toast from "react-hot-toast";

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
});

const Dashboard = () => {
  const { mutate: createFoodItem } = useCreateFood();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(FoodSchema),
    mode: "onChange", // track validation as user types
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("image", data.image);

    createFoodItem(formData, {
      onSuccess: () => {
        toast.success("Food Item Created Successfully");
        reset();
        setPreviewImage(null);
      },
    });
  };

  return (
    <div className="w-full flex justify-center p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <PlusCircle size={26} /> Create New Food Item
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Food Name</label>
            <input
              {...register("name")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter price"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Category</label>
            <input
              {...register("category")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write a short description..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Food Image</label>

            {/* Upload Box */}
            {!previewImage && (
              <div className="border border-dashed border-gray-400 rounded-xl p-6 text-center hover:bg-gray-50">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:opacity-50 cursor-pointer"
            disabled={isSubmitting || !isValid} // disable if form invalid or submitting
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin h-5 w-5 text-white" />
                Submitting...
              </>
            ) : (
              "Create Food Item"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
