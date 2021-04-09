import React from "react";

// styles
import classes from "./Logo.module.scss";

// Router
import { NavLink } from "react-router-dom";

const Logo = () => {
  const toggleTheme = (e) => {
    e.preventDefault();
    if (!document.documentElement.getAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return (
    <NavLink to="/" className={classes.Logo} onDoubleClick={toggleTheme}>
      <i className="fab fa-think-peaks"></i>
    </NavLink>
  );
};

export default Logo;
