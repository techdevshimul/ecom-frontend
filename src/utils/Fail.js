import React, { useEffect } from "react";

const Fail = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location = "https://ecom-frontend-steel.vercel.app/user/dashboard";
    }, 3000);
  }, []);

  return (
    <div style={{ margin: "20px 0px", textAlign: "center" }}>
      <p style={{ fontSize: "25px", color: "red" }}>Your Payment Has Failed!</p>
      <a
        style={{
          color: "green",
          textDecoration: "none",
          fontSize: "20px",
          border: "2px solid #ced4da",
          borderRadius: "10px",
          padding: "10px",
          fontWeight: "bold",
        }}
        href="https://ecom-frontend-steel.vercel.app/user/dashboard"
      >
        Go Back To Dashboard
      </a>
    </div>
  );
};

export default Fail;
