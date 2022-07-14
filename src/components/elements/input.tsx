import { MagnifyingGlass } from "phosphor-react";
import { InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
  hasIcon?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, hasIcon = false, ...rest }: InputProps) => (
  <div>
    {!!label && (
      <label htmlFor={rest.id} className="block mb-1">
        {label}
      </label>
    )}
    <div className="flex items-center bg-button-secondary  px-3 rounded hover-shadow font-medium">
      <input {...rest} className="bg-transparent outline-none py-2" />
      {hasIcon && <MagnifyingGlass size={20} weight="bold" />}
    </div>
  </div>
);

export { Input };
