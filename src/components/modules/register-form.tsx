import { Input, Button } from "components/elements";
import { FormEvent } from "react";
import { FormElements, OnSubmitProps } from "./types";

interface RegisterFormProps {
  onSubmit: (props: OnSubmitProps) => void;
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = e.currentTarget.elements as FormElements;
    onSubmit({ username: username.value, password: password.value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
      <Input label="Username" id="username" type="text" />
      <Input label="Password" id="password" type="password" />
      <Button type="submit" className="self-stretch mt-3">
        Submit
      </Button>
    </form>
  );
};
