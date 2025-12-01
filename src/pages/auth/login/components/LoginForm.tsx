"use client";

import { loginSchema, LoginSchemaType } from "../validation";
import SocialButtons from "@/components/ui/SocialButtons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "../hooks/useLogin";
import Link from "next/link";

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );
}

export default function LoginForm() {
  const { login, isLoading} = useLogin();

  const { handleSubmit, register, formState: { errors } } =
    useForm<LoginSchemaType>({
      resolver: yupResolver(loginSchema),
      mode: "onBlur",
    });

  const onSubmit = async (data: LoginSchemaType) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-text-soft block mb-1 font-medium">Email</label>
        <input
          {...register("email")}
          className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
          type="email"
          placeholder="example@mail.com"
        />
        {errors.email && <p className="text-primary text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="text-text-soft block mb-1 font-medium">Password</label>
        <input
          {...register("password")}
          className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
          type="password"
          placeholder="******"
        />
        {errors.password && <p className="text-primary text-sm mt-1">{errors.password.message}</p>}

        <div className="text-right mt-1">
          <Link href="/auth/forget-password" className="text-primary text-sm hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Loading...</span>
          </>
        ) : (
          "Login"
        )}
      </button>

      <SocialButtons mode="login" />

    </form>
  );
}
