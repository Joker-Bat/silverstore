import React from "react";

// Styles
import classes from "./NavigationItem.module.scss";

// Router
import { NavLink } from "react-router-dom";

// Redux toolkit
import { useSelector } from "react-redux";

const NavigationItem = (props) => {
  // Redux toolkit
  const { products } = useSelector((state) => state.cart);
  const noOfProducts = products?.length;

  const NavItemClass = [classes.NavItem, props.shrink && classes.ShrinkNavItem];

  const cartCount = <span className={classes.CartCount}>{noOfProducts}</span>;

  return (
    <li className={NavItemClass.join(" ")} onClick={props.closeBackdrop}>
      <NavLink
        to={props.path}
        exact
        activeClassName={classes.ActiveLink}
        className={classes.NavLink}
      >
        <div className={classes.IconContainer}>
          {props.name === "Cart" ? cartCount : ""}
          <i className={props.icon}></i>
        </div>
        <p>{props.name}</p>
      </NavLink>
    </li>
  );
};

export default NavigationItem;
