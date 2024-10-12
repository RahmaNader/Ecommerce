import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot from React 18
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

// Correct way to initialize in React 18
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
