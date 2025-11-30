"use client";

//validation Yup schema
import { loginSchema, LoginSchemaType } from "../validation";
import SocialButtons from "@/components/ui/SocialButtons";

//hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "../hooks/useLogin";


export default function LoginForm() {
  const { login, isLoading, serverError, success } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginSchemaType) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Server Messages */}
      {serverError && (
        <p className="text-primary text-sm font-bold">{serverError}</p>
      )}

      {success && (
        <p className="text-success text-sm font-bold">{success}</p>
      )}

      {/* EMAIL */}
      <div>
        <label className="text-text-soft block mb-1 font-medium">Email</label>
        <input
          {...register("email")}
          className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
          type="email"
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="text-primary text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-text-soft block mb-1 font-medium">Password</label>
        <input
          {...register("password")}
          className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
          type="password"
          placeholder="******"
        />
        {errors.password && (
          <p className="text-primary text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
      >
        {isLoading ? "Loading..." : "Login"}
      </button>

      <SocialButtons mode="login" />
    </form>
  );
}
