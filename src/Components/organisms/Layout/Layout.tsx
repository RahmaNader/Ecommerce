import React from "react";
import { Navbar } from "@components/organisms";
import { Outlet } from "react-router-dom";
import { Footer } from "@components/molecules";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
