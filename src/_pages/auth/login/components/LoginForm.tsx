"use client";

//Next
import { useRouter } from "next/navigation";
import Link from "next/link";

//toast
import toast from "react-hot-toast";

//hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "../hooks/useLogin";

//validation
import { loginSchema, LoginSchemaType } from "../validation";

//components
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SocialButtons from "@/components/ui/SocialButtons";

//paths constants
import { PATHS } from "@/constant/PATHS";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useLogin();
  const {fetchUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const success = await login(data);
    const user = await fetchUser()


    if (success) {
      if (user?.role == "admin") {
        router.push(PATHS.ADMIN)
      } else {
        toast.success("Welcome back!");
        setTimeout(() => {
          router.push(PATHS.HOME);
        }, 1000);
      }
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
          <p className="text-red-500 text-sm font-semibold">
            {error}
          </p>
        </div>
      )}

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

      <div className="text-right -mt-2">
        <Link
          href="/auth/forget-password"
          className="text-primary text-sm hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <PrimaryButton isLoading={isLoading} type="submit">
        Login
      </PrimaryButton>

      <div className="text-center">
        <p className="text-text-soft text-sm">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-primary font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>

      <SocialButtons />
    </form>
  );
}
