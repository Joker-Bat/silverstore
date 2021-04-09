import React from "react";

// Styles
import classes from "./NavigationItem.module.scss";

// Router
import { NavLink } from "react-router-dom";

export const NavigationItem = (props) => {
  return (
    <li className={classes.NavItem} onClick={props.closeBackdrop}>
      <NavLink
        to={props.path}
        activeClassName={classes.ActiveLink}
        className={classes.NavLink}
      >
        <i className={props.icon}></i>
        <p>{props.name}</p>
      </NavLink>
    </li>
  );
};

export default NavigationItem;
