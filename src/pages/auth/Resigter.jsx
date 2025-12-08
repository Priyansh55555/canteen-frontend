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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl">

        {/* Header */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us today and start your journey
          </p>
        </div>

        {/* Social Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>

          <button  className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
            <Github className="h-5 w-5" />
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Full Name</label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("name")}
                placeholder="John Doe"
                className={`block w-full outline-none rounded-md border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm transition-all duration-200
                  ${errors.name ? "ring-red-500 focus:ring-red-500 bg-red-50" : "ring-gray-300 focus:ring-blue-600 hover:ring-gray-400"}`}
              />
            </div>
            {errors.name && <p className="mt-2 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Email address</label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className={`block w-full outline-none rounded-md border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm transition-all duration-200
                  ${errors.email ? "ring-red-500 focus:ring-red-500 bg-red-50" : "ring-gray-300 focus:ring-blue-600 hover:ring-gray-400"}`}
              />
            </div>
            {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password Group */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900">Password</label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className={`block w-full outline-none rounded-md border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm transition-all duration-200
                    ${errors.password ? "ring-red-500 focus:ring-red-500 bg-red-50" : "ring-gray-300 focus:ring-blue-600 hover:ring-gray-400"}`}
                />
              </div>
              {errors.password && <p className="mt-2 text-xs text-red-600">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900">Confirm</label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="••••••••"
                  className={`block w-full outline-none rounded-md border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm transition-all duration-200
                    ${errors.confirmPassword ? "ring-red-500 focus:ring-red-500 bg-red-50" : "ring-gray-300 focus:ring-blue-600 hover:ring-gray-400"}`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isRegistering}
            className="group cursor-pointer relative flex w-full justify-center rounded-md bg-green-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 disabled:opacity-70 transition-all duration-200"
          >
            {isRegistering ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Create Account
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
