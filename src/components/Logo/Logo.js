import React from "react";

// styles
import classes from "./Logo.module.scss";

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
    <a
      href="/"
      className={classes.Logo}
      onClick={(e) => e.preventDefault()}
      onDoubleClick={toggleTheme}
    >
      <i class="fab fa-think-peaks"></i>
    </a>
  );
};

export default Logo;
