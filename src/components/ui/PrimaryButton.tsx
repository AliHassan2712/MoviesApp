"use client";

//components
import Spinner from "./Spinner";

type PrimaryButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  [key: string]: any;
}


export default function PrimaryButton({
  children,
  isLoading,
  className = "",
  ...props
}: PrimaryButtonProps) {

  
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
