import React from "react";
// import { NavLink } from "react-router-dom";

const Footer = () => {
  let newDate = new Date();
  let year = newDate.getFullYear();

  

  return (
    <footer>
      Footer {year}
    </footer>
  );
};

export default Footer;
