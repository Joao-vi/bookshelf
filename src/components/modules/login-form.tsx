import { Button, Input } from "components/elements";
import {
  CheckCircle,
  Eye,
  EyeSlash,
  Spinner,
  User,
  UserSquare,
} from "phosphor-react";
import { FormEvent, useState } from "react";
import { FormElements, OnSubmitProps } from "./types";

interface LoginFormProps {
  onSubmit: (props: OnSubmitProps) => void;
  isLoading: boolean;
  isError: boolean;
  isSucess: boolean;
}

export const LoginForm = ({
  onSubmit,
  isLoading,
  isError,
  isSucess,
}: LoginFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = e.currentTarget.elements as FormElements;
    onSubmit({ username: username.value, password: password.value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
      <Input
        label="Username"
        id="username"
        type="text"
        required
        isError={isError}
        autoFocus
      >
        <User size={20} weight="bold" />
      </Input>

      <Input
        label="Password"
        id="password"
        type={isPasswordVisible ? "text" : "password"}
        isError={isError}
        required
      >
        <div
          role="button"
          aria-label="Show password"
          onClick={() => setIsPasswordVisible((state) => !state)}
        >
          {isPasswordVisible ? (
            <Eye size={20} weight="bold" />
          ) : (
            <EyeSlash size={20} weight="bold" />
          )}
        </div>
      </Input>
      <Button
        type="submit"
        className="self-stretch mt-3 flex justify-center"
        isLoading={isLoading}
        variant={isSucess ? "highlight" : "primary"}
      >
        {isLoading ? (
          <Spinner
            size={20}
            weight="bold"
            aria-label="loading"
            className="spinner-animation"
          />
        ) : isSucess ? (
          <CheckCircle size={20} weight="bold" aria-label="Success" />
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
};
