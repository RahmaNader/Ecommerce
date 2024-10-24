import { Navbar } from "@components/organisms";
import React from "react";

const AboutScreen: React.FC = () => {
  return (
    <div className="bg-customBeige min-h-screen">
      <Navbar />
      <div className="bg-customBeige min-h-screen p-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4">Learn more about our company and mission.</p>
      </div>
    </div>
  );
};

export default AboutScreen;
