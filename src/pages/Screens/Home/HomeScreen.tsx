import React from "react";
import { Home } from "@components/organisms";
import { Slider} from "@components/molecules";

const HomeScreen: React.FC = () => {
  return (
    <div className="bg-customBeige min-h-screen">
      <Slider/>
      <Home/>
    </div>

  );
};

export default HomeScreen;