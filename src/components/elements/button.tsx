import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { children, isLoading = false, variant = "primary", ...rest } = props;
  return (
    <button
      {...rest}
      disabled={isLoading}
      className={`rounded px-4 py-2 
        shadow-hover-focus-idle
        hover:shadow-hover-on
        focus-within:shadow-focus-on
        transition-shadow
      [&_svg]:text-paragraph
      ${
        variant === "secondary"
          ? "bg-button-secondary text-headline"
          : "bg-button"
      } 
      ${isLoading ? "bg-[#b7b4af] cursor-not-allowed" : ""}
      ${props.className}
      `}
    >
      {children}
    </button>
  );
};
