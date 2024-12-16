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
          style={{
            backgroundColor: "white",
            borderRadius: "50%",
            color: "#dc2626",
            width: "32px",
            height: "32px",
          }}
        />
      }
      style={{
        borderRadius: "9999px",
        backgroundColor: "#dc2626",
        color: "white",
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem 2rem",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        height:"50px",
        margin:"20px",
      }}
    >
      {message}
    </Alert>
  );
};

export default ErrorAlert;