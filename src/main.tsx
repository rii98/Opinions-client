import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import PostContextProvider from "./context/PostContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PostContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PostContextProvider>
  </BrowserRouter>
);
