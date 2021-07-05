import React from "react";
// Styles
import classes from "./NavigationItem.module.scss";
// Router
import { NavLink } from "react-router-dom";
// Redux toolkit
import { useSelector } from "react-redux";
// Icons
import { FaShoppingBag } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const NavigationItem = (props) => {
  // Redux toolkit
  const { products } = useSelector((state) => state.cart);
  const noOfProducts = products?.length;

  const NavItemClass = [classes.NavItem, props.shrink && classes.ShrinkNavItem];

  const cartCount = <span className={classes.CartCount}>{noOfProducts}</span>;

  let icon = null;
  switch (props.name) {
    case "Products":
      icon = <FaShoppingBag />;
      break;
    case "Cart":
      icon = <FaShoppingCart />;
      break;
    case "Login":
      icon = <FaSignInAlt />;
      break;
    case "Profile":
      icon = <FaUser />;
      break;
    default:
      break;
  }

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
          {icon}
        </div>
        <p>{props.name}</p>
      </NavLink>
    </li>
  );
};

export default NavigationItem;
