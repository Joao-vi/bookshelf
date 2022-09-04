import { BrowsePage, LoginPage } from "pages";
import toast, { Toaster } from "react-hot-toast";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuthContext } from "store/auth-conext";

import { BookPage } from "pages/book";
import { NotFound } from "pages/not-found";
import { QueryClientProvider } from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";
import { rqClient } from "lib/react-query";
import { FavoritesPage } from "pages/favorites";

const PathGuard = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user } = useAuthContext();

  if (!user) {
    toast.error("Your session has expired.", { id: "session-expired" });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const MyRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route
      path="/browse"
      element={
        <PathGuard>
          <BrowsePage />
        </PathGuard>
      }
    />
    <Route
      path="/book/:id"
      element={
        <PathGuard>
          <BookPage />
        </PathGuard>
      }
    />
    <Route
      path="/favorites"
      element={
        <PathGuard>
          <FavoritesPage />
        </PathGuard>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

function App() {
  return (
    <Router>
      <QueryClientProvider client={rqClient}>
        <ReactQueryDevtools />
        <AuthProvider>
          <MyRoutes />
          <Toaster toastOptions={{ duration: 3000 }} />
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
