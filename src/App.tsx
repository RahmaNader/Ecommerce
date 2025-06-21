import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Navbar } from "@components/organisms";
import { AuthProvider } from "@services/auth/AuthContext";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "react-query";
import { LanguageProvider } from "./context/LanguageProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./i18n";

function App() {
  const queryClient = new QueryClient();

  // Make sure your client ID is correct
  const googleClientId =
    "761509372349-n9mrdsbuhjvn40b4ha2afgobblrgegpb.apps.googleusercontent.com";

  return (
    <Suspense fallback="Loading...">
      <GoogleOAuthProvider clientId={googleClientId}>
        <LanguageProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <div className="bg-customBeige min-h-screen">
                <Navbar />
                <RouterProvider router={router} />
              </div>
            </QueryClientProvider>
          </AuthProvider>
        </LanguageProvider>
      </GoogleOAuthProvider>
    </Suspense>
  );
}

export default App;
