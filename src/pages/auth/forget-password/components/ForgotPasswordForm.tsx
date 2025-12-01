"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useForgotPassword from "../hooks/useForgotPassword";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Link from "next/link";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "../validation";

export default function ForgotPasswordForm() {
  const { sendResetEmail, isLoading } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    await sendResetEmail(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <Input
        label="Email"
        placeholder="example@mail.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <PrimaryButton isLoading={isLoading} type="submit">
        Send Reset Link
      </PrimaryButton>

      <div className="text-center">
        <Link href="/auth/login" className="text-primary text-sm hover:underline">
          Back to Login
        </Link>
      </div>

    </form>
  );
}
