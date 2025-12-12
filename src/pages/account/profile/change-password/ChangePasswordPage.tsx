"use client";

import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import useChangePassword from "./hooks/useChangePassword";

import {
  ChangePasswordSchemaType,
  changePasswordSchema,
} from "./validation";

export default function ChangePasswordPage() {
  const { changePassword, isLoading } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: yupResolver(changePasswordSchema),
  });

  return (
    <div className=" flex justify-center pt-11 px-6 bg-main">
      <div className="w-full max-w-3xl bg-[var(--color-background-card)]  border border-main rounded-xl shadow-2xl p-10 backdrop-blur-md">
        
        <h1 className="text-3xl font-bold text-main mb-3">Security Settings</h1>
        <p className="text-muted mb-6">Change your password to keep your account safe.</p>

        <form onSubmit={handleSubmit(changePassword)} className="space-y-6">
          
          <Input
            label="Current Password"
            type="password"
            error={errors.currentPassword?.message}
            {...register("currentPassword")}
          />

          <Input
            label="New Password"
            type="password"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          <Input
            label="Confirm Password"
            type="password"
            error={errors.confirmNewPassword?.message}
            {...register("confirmNewPassword")}
          />

          <PrimaryButton type="submit" isLoading={isLoading}>
            Update Password
          </PrimaryButton>

        </form>
      </div>
    </div>
  );
}
