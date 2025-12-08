// components/LoginForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/loginSchema";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/AuthHook";
import { formatedError } from "../../utils/errorHandler";
import toast from "react-hot-toast";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
   const { mutate: Login , isLoading } = useLogin();
  const onSubmit = async (data) => {
    console.log(data);
 
    await Login(data, 
      {
        onSuccess: (data)=>{
          console.log("registered successfully", data);
          toast.success("User Loged Successfully");
          navigate("/dashboard");
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
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block  text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`block w-full outline-none rounded-md border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200
                    ${errors.email 
                      ? "ring-red-500 focus:ring-red-500 bg-red-50" 
                      : "ring-gray-300 focus:ring-blue-600 hover:ring-gray-400"
                    }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-pulse">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`block  outline-none w-full rounded-md border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200
                    ${errors.password 
                      ? "ring-red-500 focus:ring-red-500 bg-red-50" 
                      : "ring-gray-300 focus:ring-blue-600 hover:ring-gray-400"
                    }`}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-pulse">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign in
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </div>

          {/* Footer Link */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup"  className="cursor-pointer font-semibold leading-6 text-blue-600 hover:text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}