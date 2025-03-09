import React from "react";
import { Navbar } from "@components/organisms";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@components/molecules";

const Layout: React.FC = () => {
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  return (
    <>
      <Navbar />
      <Outlet />
      {!isSearchPage && <Footer />}
    </>
  );
};

export default Layout;