import { Cart, Navbar } from "@components/organisms";
import React from "react";

const HomeScreen: React.FC = () => {
  return (
    <div className="bg-customBeige min-h-screen">
      <Navbar />
      <Cart />
    </div>
  );
};

export default HomeScreen;
