import { Button, Logo } from "components/elements";
import { LoginForm, OnSubmitProps, RegisterForm } from "components/modules";
import { useState } from "react";

import { Spinner, X } from "phosphor-react";

import Modal from "react-modal";

import { Styles } from "react-modal";

const modalStyles: Styles = {
  overlay: {
    background: "rgba(17, 21, 24, 0.45)",
    transition: "background 0.3s cubic-bezier(0.6, 0.4, 0, 1)",
  },
  content: {
    maxWidth: "35rem",
    height: "max-content",
    margin: "auto",
    background: "#f9f4ef",
    inset: 0,
    padding: "40px 10px",
  },
};

type IsOpen = "none" | "register" | "login";

export function LoginPage() {
  const [isOpen, setIsOpen] = useState<IsOpen>("none");

  const handleLogin = (props: OnSubmitProps) => {
    console.log(props);
  };

  const handleRegister = (props: OnSubmitProps) => {
    console.log(props);
  };
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-4">
      <Logo width="80" height="80" />
      <h1 className="font-bold text-4xl">Bookshelf</h1>
      <div className="flex  gap-4">
        <Button onClick={() => setIsOpen("login")}>Login</Button>
        <Button onClick={() => setIsOpen("register")} variant="secondary">
          Register
        </Button>
      </div>

      <Modal
        style={modalStyles}
        isOpen={isOpen === "register"}
        ariaHideApp={isOpen !== "register"}
        contentLabel="Registration form"
      >
        <main className="h-full flex flex-col items-center gap-3">
          <header className="font-extrabold text-3xl mb-3">Register</header>
          <Button
            onClick={() => setIsOpen("none")}
            className="absolute top-3 right-6 px-[10px] py-[12px] bg-button-secondary"
          >
            <X color="black" weight="bold" />
          </Button>

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
          <header className="font-extrabold text-3xl mb-3">Login</header>
          <Button
            onClick={() => setIsOpen("none")}
            className="absolute top-3 right-6 px-[10px] py-[12px]"
            variant="secondary"
          >
            <X color="black" weight="bold" />
          </Button>

          <LoginForm onSubmit={handleLogin} />
        </main>
      </Modal>
    </main>
  );
}