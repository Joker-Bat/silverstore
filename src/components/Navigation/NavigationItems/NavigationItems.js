import React from "react";

// Components
import NavigationItem from "./NavigationItem/NavigationItem";
import SearchBar from "../SearchBar/SearchBar";

// Styles
import classes from "./NavigationItems.module.scss";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        path="products"
        icon="fab fa-product-hunt"
        name="Products"
        closeBackdrop={props.closeBackdrop}
      />

      <NavigationItem
        path="cart"
        icon="fas fa-shopping-cart"
        name="Cart"
        closeBackdrop={props.closeBackdrop}
      />

      <NavigationItem
        path="login"
        icon="fas fa-sign-in-alt"
        name="Login"
        closeBackdrop={props.closeBackdrop}
      />

      <SearchBar closeBackdrop={props.closeBackdrop} />
    </ul>
  );
};

export default NavigationItems;
