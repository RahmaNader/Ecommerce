import { Navbar } from "@components/organisms";
import { Home } from "@components/organisms";
import { Slider } from "@components/molecules";
import {Footer} from "@components/molecules";

import React from "react";

const HomeScreen: React.FC = () => {
  return (
    <div className="bg-customBeige  min-h-screen">
      <Navbar />
      <Slider/>
      <Home/>
      <Footer/>

    </div>
  );
};

export default HomeScreen;
