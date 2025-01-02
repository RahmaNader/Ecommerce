import { RouterProvider } from "react-router-dom";
import { Navbar } from "@components/organisms";
import { AuthProvider } from "@services/auth/AuthContext";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="bg-customBeige min-h-screen">
          <Navbar />
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
