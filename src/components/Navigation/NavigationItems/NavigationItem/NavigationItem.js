import React from "react";

// Styles
import classes from "./NavigationItem.module.scss";

// Router
import { NavLink } from "react-router-dom";

export const NavigationItem = (props) => {
  // console.log(props);
  const NavItemClass = [classes.NavItem, props.shrink && classes.ShrinkNavItem];

  return (
    <li className={NavItemClass.join(" ")} onClick={props.closeBackdrop}>
      <NavLink
        to={props.path}
        exact
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
