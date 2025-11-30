"use client";

// components
import SocialButtons from "../../../../components/ui/SocialButtons";

//validation Yup schema
import { signupSchema, SignupSchemaType } from "../validation";

//hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSignup from "@/pages/account/signup/hooks/useSignup";

export default function SignupForm() {
  const { signup, isLoading, serverError, successMessage } = useSignup();

  const {
    handleSubmit,
    register,
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

      {/* GLOBAL MESSAGES */}
      {serverError && <p className="text-primary text-sm font-bold">{serverError}</p>}
      {successMessage && <p className="text-success text-sm font-bold">{successMessage}</p>}

      {/* FIRST + LAST NAME */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* FIRST NAME */}
        <div>
          <label className="text-text-soft block mb-1 font-medium">First Name</label>
          <input
            {...register("firstName")}
            className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary transition"
            type="text"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-primary text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        {/* LAST NAME */}
        <div>
          <label className="text-text-soft block mb-1 font-medium">Last Name</label>
          <input
            {...register("lastName")}
            className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary transition"
            type="text"
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-primary text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

      </div>

      {/* EMAIL */}
      <div>
        <label className="text-text-soft block mb-1 font-medium">Email</label>
        <input
          {...register("email")}
          className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary transition"
          type="email"
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="text-primary text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-text-soft block mb-1 font-medium">Password</label>
        <input
          {...register("password")}
          className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary transition"
          type="password"
          placeholder="******"
        />
        {errors.password && (
          <p className="text-primary text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <label className="text-text-soft block mb-1 font-medium">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary transition"
          type="password"
          placeholder="******"
        />
        {errors.confirmPassword && (
          <p className="text-primary text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* TERMS AND CONDITIONS */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("agree")}
          className="w-4 h-4 accent-primary"
        />
        <p className="text-text-soft text-sm">
          I agree to the{" "}
          <span className="text-primary underline cursor-pointer hover:text-primary/80">
            Terms of Service
          </span>
        </p>
      </div>

      {errors.agree && (
        <p className="text-primary text-sm mt-1">{errors.agree.message}</p>
      )}

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
      >
        {isLoading ? "Loading..." : "Sign Up"}
      </button>

      {/* SOCIAL BUTTONS */}
      <SocialButtons mode="signup" />

    </form>
  );
}
