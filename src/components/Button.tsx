import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className="bg-violet-600 w-11/12 max-w-xl h-14 p-4 mt-10 text-base text-white rounded-lg hover:bg-violet-500"
    />
  );
};

export default Button;
