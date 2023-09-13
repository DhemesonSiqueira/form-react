import React, { InputHTMLAttributes, useId } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ name, type = "text", value, ...props }: RadioProps, ref) => {
    const radioId = useId();

    return (
      <div className="flex items-center mb-4">
        <input
          id={radioId}
          type={type}
          name={name}
          value={value}
          ref={ref}
          {...props}
          className="appearance-none w-4 h-4 checked:bg-violet-500 border-4 border-white ring-1 ring-zinc-400 rounded-full"
        />

        <label htmlFor={radioId} className="ml-2 text-zinc-500">
          {value}
        </label>
      </div>
    );
  }
);

export default Radio;
