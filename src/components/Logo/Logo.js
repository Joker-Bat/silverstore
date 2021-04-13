import React from "react";

// styles
import classes from "./Logo.module.scss";

// Router
import { withRouter } from "react-router-dom";

const Logo = (props) => {
  let timer = null;

  const LogoClass = [classes.Logo, props.shrink && classes.ShrinkLogo];

  const toggleTheme = () => {
    if (!document.documentElement.getAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  const clickHandler = (e) => {
    clearTimeout(timer);
    if (e.detail === 1) {
      timer = setTimeout(() => props.history.push("/"), 300);
    } else if (e.detail === 2) {
      toggleTheme();
    }
  };

  return (
    <div className={LogoClass.join(' ')} onClick={clickHandler}>
      <i className="fab fa-think-peaks"></i>
    </div>
  );
};

export default withRouter(Logo);
