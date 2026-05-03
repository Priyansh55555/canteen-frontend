import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/loginSchema";
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";
import { formatedError } from "../../utils/errorHandler";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { mutate: Login } = useLogin();

  const onSubmit = async (data) => {
    await Login(data, {
      onSuccess: (data) => {
        toast.success("User Logged Successfully");
        navigate("/dashboard");
      },
      onError: (err) => {
        toast.error(formatedError(err));
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF4E6] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-lg">

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
            <Lock className="h-6 w-6" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Login to start ordering
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
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
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className={`w-full rounded-md py-3 pl-10 text-sm outline-none ring-1 transition
                  ${
                    errors.email
                      ? "ring-red-500 bg-red-50"
                      : "ring-gray-300 focus:ring-orange-500"
                  }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
          <div className="flex items-center justify-between">
  <label 
    htmlFor="password" 
    className="block text-sm font-medium leading-6 text-gray-900"
  >
    Password
  </label>
  <div className="text-sm">
    <a
      href="#"
      className="font-semibold text-orange-500 hover:text-orange-600 hover:underline"
    >
      Forgot password?
    </a>
  </div>
</div>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-orange-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={`w-full rounded-md py-3 pl-10 pr-10 text-sm outline-none ring-1 transition
                  ${
                    errors.password
                      ? "ring-red-500 bg-red-50"
                      : "ring-gray-300 focus:ring-orange-500"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

            
          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Login
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-orange-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
