import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const authToken = Cookies.get("authToken");

  return authToken ? children : <Navigate to="/authentication" />;
};

export default PrivateRoute;