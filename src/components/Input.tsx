import React, { InputHTMLAttributes, useId } from "react";

import { cn } from "@/lib/utils";

import icon from "../assets/error.svg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { name, type = "text", label, helperText = "", className, ...props },
    ref
  ) => {
    const inputId = useId();

    return (
      <div className="w-11/12 max-w-xl flex flex-col gap-2 text-sm text-slate-500 relative">
        <label htmlFor={inputId}> {label} </label>

        <input
          name={name}
          type={type}
          ref={ref}
          id={inputId}
          {...props}
          className={cn(
            "h-14 px-4 text-base border border-zinc-300 rounded-lg outline-violet-500",
            helperText && "border-2 border-red-500 outline-red-500",
            className
          )}
        />

        {helperText && (
          <>
            <img
              src={icon}
              alt="error icon"
              width={24}
              className="absolute right-4 top-11"
            />
            <span className="text-red-500 text-xs">{helperText}</span>
          </>
        )}
      </div>
    );
  }
);

export default Input;
