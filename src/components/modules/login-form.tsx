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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" />
      </div>
      <button type="submit" className="border p-2 rounded">
        Submit
      </button>
    </form>
  );
};
