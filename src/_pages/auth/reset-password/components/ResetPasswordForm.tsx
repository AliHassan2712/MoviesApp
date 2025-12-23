"use client";

//Next
import { useRouter } from "next/navigation";

//toast
import toast from "react-hot-toast";

//components
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

//hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useResetPassword from "../hooks/useResetPassword";

//validation
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "../validation";

//paths constants
import { PATHS } from "@/constant/PATHS";

export default function ResetPasswordForm({
  token,
}: {
  token: string;
}) {
  const router = useRouter();
  const { resetPassword, isLoading, error } =
    useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onBlur",
  });

const onSubmit = async (data: ResetPasswordSchemaType) => {
  const success = await resetPassword(
    token,
    data.password,
    data.confirmPassword
  );

  if (success) {
    toast.success("Password reset successfully");
    setTimeout(() => {
      router.push(PATHS.LOGIN);
    }, 1000);
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {error && (
        <p className="text-red-500 text-sm font-semibold">
          {error}
        </p>
      )}

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
