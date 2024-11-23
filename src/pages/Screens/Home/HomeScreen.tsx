import React from "react";
import { Home } from "@components/organisms";
import { Slider, Footer } from "@components/molecules";

const HomeScreen: React.FC = () => {
  return (
    <div className="bg-customBeige min-h-screen">
      <Slider/>
      <Home/>
      <Footer/>
    </div>

  );
};

export default HomeScreen;
