import { Button, Logo } from "components/elements";
import { LoginForm, OnSubmitProps, RegisterForm } from "components/modules";
import { useState } from "react";

import Modal from "react-modal";

import { Styles } from "react-modal";

const modalStyles: Styles = {
  overlay: {
    background: "rgba(17, 21, 24, 0.45)",
    transition: "background 0.3s cubic-bezier(0.6, 0.4, 0, 1)",
  },
  content: {
    maxWidth: "40rem",
    height: "100%",
    maxHeight: "40rem",
    margin: "0 auto",
  },
};

type IsOpen = "none" | "register" | "login";

export function Home() {
  const [isOpen, setIsOpen] = useState<IsOpen>("none");

  const handleLogin = (props: OnSubmitProps) => {
    console.log(props);
  };

  const handleRegister = (props: OnSubmitProps) => {
    console.log(props);
  };
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6">
      <Logo />
      <h1 className="font-bold text-4xl">Bookshelf</h1>
      <div className="flex  gap-4">
        <Button onClick={() => setIsOpen("login")}>Login</Button>
        <Button onClick={() => setIsOpen("register")}>Register</Button>
      </div>

      <Modal
        style={modalStyles}
        isOpen={isOpen === "register"}
        ariaHideApp={isOpen !== "register"}
        contentLabel="Registration form"
      >
        <main className="h-full flex flex-col items-center gap-3">
          <header>Register</header>
          <button
            onClick={() => setIsOpen("none")}
            className="absolute right-6 border p-2 rounded"
          >
            Close
          </button>

          <RegisterForm onSubmit={handleRegister} />
        </main>
      </Modal>

      <Modal
        style={modalStyles}
        isOpen={isOpen === "login"}
        contentLabel="Login form"
        ariaHideApp={isOpen !== "login"}
      >
        <main className="h-full flex flex-col items-center gap-3">
          <header>Login</header>
          <button
            onClick={() => setIsOpen("none")}
            className="absolute right-6 border p-2 rounded"
          >
            Close
          </button>

          <LoginForm onSubmit={handleLogin} />
        </main>
      </Modal>
    </main>
  );
}
