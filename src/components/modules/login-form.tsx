import { Button, Input } from "components/elements";
import { Spinner } from "phosphor-react";
import { FormEvent } from "react";
import { FormElements, OnSubmitProps } from "./types";

interface LoginFormProps {
  onSubmit: (props: OnSubmitProps) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = e.currentTarget.elements as FormElements;
    onSubmit({ username: username.value, password: password.value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
      <Input label="Username" id="username" type="text" />
      <Input label="Password" id="password" type="password" />
      <Button type="submit" className="self-stretch mt-3 flex justify-center">
        Submit
        {/* <Spinner size={22} weight="bold" className="spinner-animation" aria-label="loading" /> */}
      </Button>
    </form>
  );
};
