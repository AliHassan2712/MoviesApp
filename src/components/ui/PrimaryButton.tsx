"use client";

import Spinner from "./Spinner";

export default function PrimaryButton({
  children,
  isLoading,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`w-full btn-primary py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
