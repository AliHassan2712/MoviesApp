"use client";

import { resetPasswordSchema, ResetPasswordSchemaType } from "../validation";
import useResetPassword from "../hooks/useResetPassword";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function ResetPasswordForm() {
  const { resetPassword, isLoading, } = useResetPassword();

  const { register, handleSubmit, formState: { errors } } =
    useForm<ResetPasswordSchemaType>({
      resolver: yupResolver(resetPasswordSchema),
      mode: "onBlur",
    });

  return (
    <form onSubmit={handleSubmit((data) => resetPassword(data.password, data.confirmPassword))} className="space-y-6">

      <Input
        label="New Password"
        type="password"
        placeholder="******"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="******"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <PrimaryButton isLoading={isLoading} type="submit">
        Reset Password
      </PrimaryButton>

    </form>
  );
}
