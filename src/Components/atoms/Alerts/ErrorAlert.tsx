import React from "react";
import Alert from "@mui/material/Alert";
import ErrorIcon from "@mui/icons-material/Error";

const ErrorAlert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Alert
      severity="error"
      icon={
        <ErrorIcon
          fontSize="inherit"
          sx={{
            backgroundColor: "white",
            borderRadius: "50%",
            color: "#dc2626",
            width: "32px",
            height: "32px",
          }}
        />
      }
      sx={{
        borderRadius: "9999px",
        backgroundColor: "#dc2626",
        color: "white",
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem 2rem",
        height: "50px",
        maxWidth: "400px",
        margin: "0 auto",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        "@media (max-width: 640px)": {
          width: "250px", 
          padding: "0.5rem 1rem", 
          fontSize: "0.6rem", 
          margin: "5px auto",
        },
      }}
    >
      {message}
    </Alert>
  );
};

export default ErrorAlert;