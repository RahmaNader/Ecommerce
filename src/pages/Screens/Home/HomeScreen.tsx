import React from "react";
import { Home } from "@components/organisms";
import { Slider } from "@components/molecules";
import {Footer} from "@components/molecules";

const HomeScreen: React.FC = () => {
  return (
    <div className="bg-customBeige  min-h-screen mt-10">
      <Slider/>
      <Home/>
      <Footer/>

    </div>

  );
};

export default HomeScreen;
