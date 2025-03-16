import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Navbar } from "@components/organisms";
import { AuthProvider } from "@services/auth/AuthContext";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "react-query";
import { LanguageProvider } from "./context/LanguageProvider"; 

import "./i18n"; 

function App() {
  const queryClient = new QueryClient();

  return (
    <LanguageProvider> 
      <Suspense fallback="Loading...">
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <div className="bg-customBeige min-h-screen">
              <Navbar />
              <RouterProvider router={router} />
            </div>
          </QueryClientProvider>
        </AuthProvider>
      </Suspense>
    </LanguageProvider>
  );
}

export default App;
