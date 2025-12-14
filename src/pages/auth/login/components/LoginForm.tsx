"use client";

//Next
import Link from "next/link";

//hooks
import useLogin from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//components
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SocialButtons from "@/components/ui/SocialButtons";

//validation Yup
import { loginSchema, LoginSchemaType } from "../validation";

export default function LoginForm() {
  const { login, isLoading, error } = useLogin();

  const { register, handleSubmit, formState: { errors } } =
    useForm<LoginSchemaType>({
      resolver: yupResolver(loginSchema),
      mode: "onBlur",
    });

  return (
    <form onSubmit={handleSubmit(login)} className="space-y-6">

      {/* API Error */}
      {error && <p className="text-primary text-sm font-bold">{error}</p>}

      {/* EMAIL */}
      <Input
        label="Email"
        placeholder="example@mail.com"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* PASSWORD */}
      <Input
        label="Password"
        type="password"
        placeholder="******"
        error={errors.password?.message}
        {...register("password")}
      />

      {/* Forgot Password */}
      <div className="text-right -mt-2">
        <Link href="/auth/forget-password" className="text-primary text-sm hover:underline">
          Forgot password?
        </Link>
      </div>

      {/* LOGIN BUTTON */}
      <PrimaryButton isLoading={isLoading} type="submit">
        Login
      </PrimaryButton>

      {/* SIGNUP LINK */}
      <div className="text-center">
        <p className="text-text-soft text-sm">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      {/* SOCIAL LOGIN */}
      <SocialButtons mode="login" />
    </form>
  );
}
