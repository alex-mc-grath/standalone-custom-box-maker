import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [navShowing, toggleNav] = useState(false);

  const handleToggleNav = () => {
    toggleNav(!navShowing);
  };
  const closeNav = () => {
    toggleNav(!navShowing);
  };
  
  return (
    <nav>
      <div className={`nav-hamburger ${navShowing ? "open" : ""}`} onClick={handleToggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* <NavLink to="/">
        <img src={Logo} className="nav-logo" />
      </NavLink> */}
      <ul className={`${navShowing ? "show" : ""}`}>
        <li>
          <NavLink exact to="/" className="" activeClassName="underline" onClick={closeNav}>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
