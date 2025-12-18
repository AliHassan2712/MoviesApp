"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useSignup from "../hooks/useSignup";
import { signupSchema, SignupSchemaType } from "../validation";
import { PATHS } from "@/constant/PATHS";

export default function SignupForm() {
  const router = useRouter();
  const { signup, isLoading, error } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
  });

const onSubmit = async (data: SignupSchemaType) => {
  const success = await signup(data);

  if (success) {
    toast.success("Account created successfully");
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="John"
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <Input
          label="Last Name"
          placeholder="Doe"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <Input
        label="Email"
        placeholder="example@mail.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
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
        Sign Up
      </PrimaryButton>
    </form>
  );
}
