"use client";

//components
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";

//hooks
import useSignup from "../hooks/useSignup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//validation
import { signupSchema, SignupSchemaType } from "../validation";


export default function SignupForm() {
  const { signup, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupSchemaType) => {
    await signup(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

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
