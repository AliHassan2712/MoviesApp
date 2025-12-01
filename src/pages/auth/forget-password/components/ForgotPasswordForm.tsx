"use client";

import { useState } from "react";
import Link from "next/link";
import useForgotPassword from "../hooks/useForgotPassword";

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );
}

export default function ForgotPasswordForm() {
  const { sendResetEmail, isLoading } =
    useForgotPassword();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetEmail(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-text-soft block mb-1 font-medium">Email</label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-card text-main border border-main rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary placeholder:text-muted"
          type="email"
          placeholder="example@mail.com"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Sending...</span>
          </>
        ) : (
          "Send Reset Link"
        )}
      </button>

      <div className="text-center">
        <Link href="/auth/login" className="text-primary text-sm hover:underline">
          Back to Login
        </Link>
      </div>

    </form>
  );
}
