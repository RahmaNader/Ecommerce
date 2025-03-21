import React from "react";
import ReactDOM from "react-dom/client";
import './i18n';
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "react-query";
import { LanguageProvider } from "./context/LanguageProvider";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Initialize your QueryClient
const queryClient = new QueryClient();

// Define your Google OAuth client ID
const googleClientId = "478766202773-3a2j4siq6cb4sjediej70to1rftlhdhi.apps.googleusercontent.com";

// Main App component
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

// Render your React application root with all providers
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
