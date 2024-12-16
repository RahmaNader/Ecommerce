import React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const SuccessAlert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Alert
      severity="success"
      icon={
        <CheckIcon
          fontSize="inherit"
          sx={{
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "8px",
            color: "#22c55e",
            width: "32px",
            height: "32px",
          }}
        />
      }
      sx={{
        borderRadius: "9999px",
        backgroundColor: "#22c55e",
        color: "white",
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem 2rem",
        height:"50px",
        margin:"20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {message}
    </Alert>
  );
};

export default SuccessAlert;