import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
  label?: string;
  isLoading?: boolean;
  isError?: boolean;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  const {
    label,
    isLoading = false,
    isError = false,
    children,
    ...rest
  } = props;
  return (
    <div>
      {!!label && (
        <label htmlFor={rest.id} className="block mb-1">
          {label}
        </label>
      )}
      <div
        className={`flex items-center bg-button-secondary px-3 rounded font-medium
          shadow-hover-focus-idle focus-within:shadow-focus-on hover:shadow-hover-on
           transition-hover-focus border
        ${isError && "border-red-500 animate-shake-x"}
        `}
      >
        <input
          {...rest}
          className={"bg-transparent outline-none py-2"}
          aria-invalid={isError}
        />
        {children}
      </div>
    </div>
  );
};

export { Input };

/*
        {hasIcon && isLoading ? (
        <CircleNotch size={20} weight="bold" className="spinner-animation" />
      ) : isError ? (
        <X size={20} weight="bold" color="#d00000" />
      ) : (
        <MagnifyingGlass size={20} weight="bold" />
      )}
*/
