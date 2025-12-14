"use client";

//components
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

//hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useResetPassword from "../hooks/useResetPassword";

//validation Yup
import { resetPasswordSchema, ResetPasswordSchemaType } from "../validation";


export default function ResetPasswordForm({ token } : { token: string }) {
  const { resetPassword, isLoading, error } = useResetPassword();

  const { register, handleSubmit, formState: { errors } } =
    useForm<ResetPasswordSchemaType>({
      resolver: yupResolver(resetPasswordSchema),
      mode: "onBlur",
    });

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    await resetPassword(token, data.password , data.confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {error && <p className="text-primary text-sm font-bold">{error}</p>}

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
