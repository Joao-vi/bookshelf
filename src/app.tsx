import { BrowsePage, LoginPage } from "pages";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/browse" element={<BrowsePage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
