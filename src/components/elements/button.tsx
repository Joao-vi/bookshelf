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
      className={`bg-button rounded px-4 py-2 
      hover-shadow
      ${variant === "secondary" && "bg-button-secondary text-headline"} 
      [&_svg]:text-paragraph
      ${isLoading ? "bg-[#b7b4af] cursor-not-allowed" : ""}
      ${props.className}
      `}
    >
      {children}
    </button>
  );
};
