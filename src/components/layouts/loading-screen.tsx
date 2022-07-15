import { Spinner } from "phosphor-react";

export const LoadingScreen = () => (
  <div className="bg-background fixed w-screen h-screen flex justify-center items-center">
    <Spinner size={32} weight="bold" className="spinner-animation" />
  </div>
);
