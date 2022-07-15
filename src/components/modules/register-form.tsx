import { Input, Button } from "components/elements";
import { Spinner } from "phosphor-react";
import { FormEvent } from "react";
import { FormElements, OnSubmitProps } from "./types";

interface RegisterFormProps {
  onSubmit: (props: OnSubmitProps) => void;
  isLoading: boolean;
  isError: boolean;
}

export const RegisterForm = ({
  onSubmit,
  isError,
  isLoading,
}: RegisterFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = e.currentTarget.elements as FormElements;
    onSubmit({ username: username.value, password: password.value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
      <Input
        label="Username"
        id="username"
        type="text"
        autoFocus
        isError={isError}
        required
      />
      <Input
        label="Password"
        id="password"
        type="password"
        autoComplete="current-password"
        required
      />
      <Button
        type="submit"
        className="self-stretch mt-3 flex justify-center"
        isLoading={isLoading}
      >
        {isLoading ? (
          <Spinner
            size={20}
            weight="bold"
            aria-label="loading"
            className="spinner-animation"
          />
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
};
