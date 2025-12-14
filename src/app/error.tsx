"use client";

// React
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-main px-6">
      <div className="max-w-md w-full bg-card border border-main rounded-xl p-8 text-center shadow-xl">

        <h1 className="text-3xl font-bold text-primary mb-3">
          Something went wrong 😢
        </h1>

        <p className="text-muted mb-6">
          An unexpected error occurred. Please try again.
        </p>

        <button
          onClick={reset}
          className="btn-primary px-6 py-3 rounded-lg font-semibold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
