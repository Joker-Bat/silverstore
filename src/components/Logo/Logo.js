import React, { useState, useEffect } from "react";
// Emoji
import eyeClick from "../../images/emoji/eyeClick.webp";
// styles
import classes from "./Logo.module.scss";
// Router
import { withRouter } from "react-router-dom";
// Icons
import { FaThinkPeaks } from "react-icons/fa";

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

  const LogoClass = [classes.Logo, props.shrink && classes.ShrinkLogo];
  const PopupClass = [classes.Popup, popup && classes.ActivePopup];

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (!document.documentElement.getAttribute("data-theme")) {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.removeAttribute("data-theme");
    }
  };

  let timer = null;

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
      <FaThinkPeaks />
    </div>
  );
};

export default withRouter(Logo);
