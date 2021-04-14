import React, { useState, useEffect } from "react";

// Emoji
import eyeClick from "../../images/emoji/eyeClick.webp";

// styles
import classes from "./Logo.module.scss";

// Router
import { withRouter } from "react-router-dom";

const Logo = (props) => {
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    let startPopup = setTimeout(() => {
      setPopup(true);
    }, 2000);
    let endPopup = setTimeout(() => {
      setPopup(false);
    }, 5000);
    return () => {
      clearTimeout(startPopup);
      clearTimeout(endPopup);
    };
  }, []);

  let timer = null;

  const LogoClass = [classes.Logo, props.shrink && classes.ShrinkLogo];
  const PopupClass = [classes.Popup, popup && classes.ActivePopup];

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
      timer = setTimeout(() => {
        props.closeSidebar();
        props.history.push("/");
      }, 300);
    } else if (e.detail === 2) {
      toggleTheme();
    }
  };

  return (
    <div className={LogoClass.join(" ")} onClick={clickHandler}>
      <p className={PopupClass.join(" ")}>
        Try Double Tap <img src={eyeClick} alt="emoji" width="20px" />
      </p>
      <i className="fab fa-think-peaks"></i>
    </div>
  );
};

export default withRouter(Logo);
