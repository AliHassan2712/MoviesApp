"use client";

import { useState } from "react";
import useForgotPassword from "../hooks/useForgotPassword";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const { sendResetEmail, isLoading, error } = useForgotPassword();
  const [email, setEmail] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetEmail(email);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">

      {error && <p className="text-primary text-sm font-bold">{error}</p>}

      <Input
        label="Email"
        placeholder="example@mail.com"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
