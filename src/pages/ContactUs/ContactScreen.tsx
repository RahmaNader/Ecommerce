import { Navbar } from "@components/organisms";
import React from "react";

const ContactScreen: React.FC = () => {
  return (
    <div className="bg-customBeige min-h-screen">
      <Navbar />
      <div className="bg-customBeige min-h-screen p-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-4">
          Feel free to reach out to us through the contact form.
        </p>
      </div>
    </div>
  );
};

export default ContactScreen;
