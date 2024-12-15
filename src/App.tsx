import { RouterProvider } from "react-router-dom";
import { Navbar } from "@components/organisms";
import { AuthProvider } from "@services/auth/AuthContext";
import { router } from "./router";

function App() {
  return (
    <AuthProvider>
      <div className="bg-customBeige min-h-screen">
        <Navbar />
        {/* Render the Cart component */}
        {/* <Cart /> */}
        {/* Render the routing system */}
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
