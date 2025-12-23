"use client";

//Next
import { useRouter } from "next/navigation";
import Link from "next/link";

//toast
import toast from "react-hot-toast";

//hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useForgotPassword from "../hooks/useForgotPassword";

//components
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";


//validation
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "../validation";

//paths constants
import { PATHS } from "@/constant/PATHS";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { sendResetEmail, isLoading, error } =
    useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: yupResolver(forgotPasswordSchema),
  });

const onSubmit = async (data: ForgotPasswordSchemaType) => {
  const success = await sendResetEmail(data.email);

  if (success) {
    toast.success("Reset link sent. Check your email");
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
        label="Email"
        placeholder="example@mail.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <PrimaryButton isLoading={isLoading} type="submit">
        Send Reset Link
      </PrimaryButton>

      <div className="text-center">
        <Link
          href={`${PATHS.LOGIN}`}
          className="text-primary text-sm hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}
