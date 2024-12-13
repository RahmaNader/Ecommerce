import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-10 justify-center h-96 bg-mainColor">
      <h1 className="text-8xl font-bold text-wine font-playfair">404</h1>
      <p className="text-2xl text-ForthColor font-playfair px-6 text-center">Sorry, the page you're looking for does not exist.</p>
      <Link
        to="/"
        className="px-6 py-2 text-mainColor bg-wine font-Poppins rounded hover:bg-ForthColor transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
