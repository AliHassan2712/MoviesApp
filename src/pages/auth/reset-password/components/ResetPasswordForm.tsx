"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useResetPassword from "../hooks/useResetPassword";
import { resetPasswordSchema, ResetPasswordSchemaType } from "../validation";

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );
}

export default function ResetPasswordForm() {
  const { resetPassword, isLoading } =
    useResetPassword();

  const { register, handleSubmit, formState: { errors } } =
    useForm<ResetPasswordSchemaType>({
      resolver: yupResolver(resetPasswordSchema),
      mode: "onBlur",
    });

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    await resetPassword(data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-text-soft block mb-1 font-medium">Password</label>
        <input
          {...register("password")}
          type="password"
          className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary placeholder:text-muted"
          placeholder="New password"
        />
        {errors.password && <p className="text-primary text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <label className="text-text-soft block mb-1 font-medium">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          type="password"
          className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary placeholder:text-muted"
          placeholder="Confirm password"
        />
        {errors.confirmPassword && <p className="text-primary text-sm">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Spinner /> 
            <span>Saving...</span>
          </>
        ) : (
          "Reset Password"
        )}
      </button>

    </form>
  );
}
