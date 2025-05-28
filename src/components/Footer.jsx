import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#2F4156",
        color: "#F5EFEB",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
