import { CircleNotch, MagnifyingGlass, X } from "phosphor-react";
import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
  label?: string;
  hasIcon?: boolean;
  isLoading?: boolean;
  isError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  label,
  hasIcon = false,
  isLoading = false,
  isError = false,
  ...rest
}: InputProps) => (
  <div>
    {!!label && (
      <label htmlFor={rest.id} className="block mb-1">
        {label}
      </label>
    )}
    <div className="flex items-center bg-button-secondary  px-3 rounded hover-shadow font-medium">
      <input {...rest} className="bg-transparent outline-none py-2" />
      {hasIcon && isLoading ? (
        <CircleNotch size={20} weight="bold" className="spinner-animation" />
      ) : isError ? (
        <X size={20} weight="bold" color="#d00000" />
      ) : (
        <MagnifyingGlass size={20} weight="bold" />
      )}
    </div>
  </div>
);

export { Input };
