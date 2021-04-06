import React from "react";

// Styles
import classes from "./NavigationItem.module.scss";

export const NavigationItem = (props) => {
  return (
    <li className={classes.NavItem} onClick={props.closeBackdrop}>
      <a href="##" className={classes.NavLink}>
        <i className={props.icon}></i>
        <p>{props.name}</p>
      </a>
    </li>
  );
};

export default NavigationItem;
