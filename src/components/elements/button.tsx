import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "highlight";
  isLoading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    isLoading = false,
    variant = "primary",
    className,
    disabled,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      disabled={isLoading || disabled}
      className={`
        rounded px-4 py-2 
        shadow-hover-focus-idle
        hover:shadow-hover-on
        focus-within:shadow-focus-on
        transition-all
        outline-none
      [&_svg]:text-paragraph'
      ${variant === "primary" && "bg-button"}
      ${variant === "secondary" && "bg-button-secondary text-headline"} 
      ${variant === "highlight" && "bg-highlight"}
      ${isLoading || disabled ? "bg-[#b7b4af] cursor-not-allowed" : ""}
      ${className}`}
    >
      {children}
    </button>
  );
};
