import { BrowsePage, LoginPage } from "pages";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "store/auth-conext";

const PathGuard = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/browse" element={<BrowsePage />} />
        </Routes>
        <Toaster toastOptions={{ duration: 3000 }} />
      </Router>
    </AuthProvider>
  );
}

export default App;
