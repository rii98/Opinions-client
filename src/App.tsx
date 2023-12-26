import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Popular from "./pages/Popular";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/popular" element={<Popular />} />
    </Routes>
  );
};

export default App;
