import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import PostContextProvider from "./context/PostContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PostContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PostContextProvider>
);
