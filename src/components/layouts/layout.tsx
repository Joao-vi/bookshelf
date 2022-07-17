import { Button } from "components/elements";
import { ArrowRight, SignOut, User } from "phosphor-react";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "store/auth-conext";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { user, setUser } = useAuthContext();

  const { pathname } = useLocation();
  const push = useNavigate();

  console.log(location);
  const handleLogout = () => {
    window.localStorage.removeItem("session");
    push("/");
    setUser(undefined);
  };

  const unselectedStyle = `bg-button-secondary text- px-3 py-1 rounded-lg text-base
  hover:bg-button hover:text-gray-100 transition`;

  const selectedStyle = `bg-highlight px-3 py-1 rounded-lg text-gray-100 `;
  return (
    <div className="min-h-screen flex flex-col gap-5 px-5 pt-5">
      <header className="w-full flex justify-end items-center gap-2">
        <nav className="mr-auto text-lg flex items-center gap-2">
          <a
            href="/browse"
            className={
              pathname.includes("/browse") ? selectedStyle : unselectedStyle
            }
          >
            Browse
          </a>
          <ArrowRight weight="bold" />
          <a
            href="/book"
            className={
              pathname.includes("/book") ? selectedStyle : unselectedStyle
            }
          >
            Browse
          </a>
        </nav>

        {!!user && (
          <span className="self-stretch bg-card rounded px-2 flex items-center gap-1">
            <User size={18} weight="bold" />
            João
          </span>
        )}
        <Button
          className="flex gap-1 items-center"
          variant="highlight"
          onClick={handleLogout}
        >
          Logout <SignOut size={18} weight="bold" />
        </Button>
      </header>
      {children}
      <footer className="mt-auto border-t p-3 text-center font-medium text-slate-400">
        <span>Bookshelf</span>
      </footer>
    </div>
  );
};
