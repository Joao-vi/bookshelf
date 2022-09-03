import { Button } from "components/elements";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bookmark, SignOut, User } from "phosphor-react";
import { ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "store/auth-conext";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { user, setUser } = useAuthContext();

  const { pathname } = useLocation();
  const push = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("session");
    push("/");
    setUser(undefined);
  };

  const unselectedStyle = `bg-button-secondary text- px-3 py-1 rounded-lg text-base
  hover:bg-button hover:text-gray-100 transition`;

  const selectedStyle = `bg-highlight px-3 py-1 rounded-lg text-gray-100 `;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="min-h-screen flex flex-col gap-5 px-5 pt-5"
      key={pathname}
    >
      <header className="w-full flex justify-end items-center gap-2">
        <nav className="mr-auto text-lg flex items-center gap-2">
          <NavLink
            to="/browse"
            className={
              pathname.includes("/browse") ? selectedStyle : unselectedStyle
            }
          >
            Browse
          </NavLink>
          {pathname.includes("/book") && (
            <>
              <ArrowRight weight="bold" />
              <NavLink to="/book" className={selectedStyle}>
                Book
              </NavLink>
            </>
          )}
          {pathname.includes("/favorites") && (
            <>
              <ArrowRight weight="bold" />
              <NavLink to="/book" className={selectedStyle}>
                Favorites
              </NavLink>
            </>
          )}
        </nav>

        {!!user && (
          <span className="self-stretch bg-card rounded px-2 flex items-center gap-1">
            <User size={18} weight="bold" />
            {user.username}
          </span>
        )}

        <NavLink
          to="/favorites"
          className="self-stretch bg-card rounded px-2 flex items-center gap-1"
        >
          <Bookmark size={18} weight="bold" />
          Favorites
        </NavLink>

        <Button
          className="flex gap-1 items-center"
          variant="highlight"
          onClick={handleLogout}
        >
          Logout <SignOut size={18} weight="bold" />
        </Button>
      </header>

      <AnimatePresence>{children}</AnimatePresence>

      <footer className="mt-auto border-t p-3 text-center font-medium text-slate-400">
        <span>Bookshelf</span>
      </footer>
    </motion.div>
  );
};
