"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { PATHS } from "@/constant/PATHS";

import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "./validation";

import { useChangePassword } from "./hooks/useChangePassword";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { submit, isLoading } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    const result = await submit(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Password updated successfully");
    router.push(PATHS.PROFILE);
  };

  return (
    <div className="flex justify-center pt-11 px-6 bg-main">
      <div className="w-full max-w-3xl bg-card rounded-xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold mb-3">
          Security Settings
        </h1>
        <p className="text-muted mb-6">
          Change your password to keep your account safe.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
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
