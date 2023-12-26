import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
