import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import CreateNew from "./pages/CreateNew";
import Search from "./components/Search";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Upvotes from "./pages/Upvotes";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/followers/:id" element={<Followers />} />
        <Route path="/following/:id" element={<Following />} />
        <Route path="/post/create" element={<CreateNew />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post/:postid/upvotes" element={<Upvotes />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
