
// helpers
import cn from "@/lib/utils/cn";

type InputProps ={
  label?: string;
  error?: string;

  className?: string;
  [key: string]: any;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: InputProps) {
  
  return (
    <div className="space-y-1">
      
      {/* label */}
      {label && (
        <label className="text-text-soft block mb-1 font-medium">
          {label}
        </label>
      )}

      {/* wrapper */}
      <div className="relative flex items-center">
        
        {/* left icon */}
        {leftIcon && (
          <div className="absolute left-3 text-text-soft">
            {leftIcon}
          </div>
        )}

        {/* input */}
        <input
          className={cn(
            `w-full bg-card text-main border border-main rounded-lg p-3 outline-none
             focus:ring-2 focus:ring-primary placeholder:text-muted
            `,
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            className
          )}
          {...props}
        />

        {/* right icon */}
        {rightIcon && (
          <div className="absolute right-3 text-text-soft cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>

      {/* error */}
      {error && <p className="text-primary text-sm">{error}</p>}
    </div>
  );
}
