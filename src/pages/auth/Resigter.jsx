import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, User, Loader2, ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import  { useRegister } from "../../hooks/AuthHook.jsx";
import toast from "react-hot-toast";
import { formatedError } from "../../utils/errorHandler.jsx";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: Login , isLoading: isRegistering } = useRegister();
  const onSubmit = async (data) => {

    console.log(data);
 
     await Login(data, 
      {
        onSuccess: (data)=>{
          console.log("registered successfully", data);
          toast.success("User Registered Successfully");
        },
        onError: (err)=>{
          toast.error(formatedError(err));
          console.log("regisration error", err);
        }
      })
    
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF4E6] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-lg">
  
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
            <User className="h-6 w-6" />
          </div>
  
          <h2 className="text-2xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Register to start ordering
          </p>
        </div>
  
        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
  
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-orange-400" />
              </div>
              <input
                {...register("name")}
                placeholder="Enter your name"
                className={`w-full rounded-md py-3 pl-10 text-sm outline-none ring-1 transition
                  ${
                    errors.name
                      ? "ring-red-500 bg-red-50"
                      : "ring-gray-300 focus:ring-orange-500"
                  }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>
  
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-orange-400" />
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className={`w-full rounded-md py-3 pl-10 text-sm outline-none ring-1 transition
                  ${
                    errors.email
                      ? "ring-red-500 bg-red-50"
                      : "ring-gray-300 focus:ring-orange-500"
                  }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
  
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-orange-400" />
              </div>
              <input
                {...register("password")}
                type="password"
                placeholder="Create a password"
                className={`w-full rounded-md py-3 pl-10 text-sm outline-none ring-1 transition
                  ${
                    errors.password
                      ? "ring-red-500 bg-red-50"
                      : "ring-gray-300 focus:ring-orange-500"
                  }`}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
  
          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-orange-400" />
              </div>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm password"
                className={`w-full rounded-md py-3 pl-10 text-sm outline-none ring-1 transition
                  ${
                    errors.confirmPassword
                      ? "ring-red-500 bg-red-50"
                      : "ring-gray-300 focus:ring-orange-500"
                  }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isRegistering}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-70"
          >
            {isRegistering ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Register
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
  
        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-orange-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
  
}
