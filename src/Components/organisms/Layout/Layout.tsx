import React from "react";
import { Navbar } from "@components/organisms";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
