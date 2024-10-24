import { Navbar } from "@components/organisms";
import React from "react";

const HomeScreen: React.FC = () => {
  return (
    <div className="bg-customBeige min-h-screen">
      <Navbar />
      <div className="bg-customBeige min-h-screen p-8">
        <h1 className="text-3xl font-bold">Welcome to Home</h1>
        <p className="mt-4">This is the Home Screen content.</p>
      </div>
    </div>
  );
};

export default HomeScreen;
