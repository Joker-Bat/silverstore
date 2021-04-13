import React from "react";

// Components
import NavigationItem from "./NavigationItem/NavigationItem";
import SearchBar from "../SearchBar/SearchBar";

// Styles
import classes from "./NavigationItems.module.scss";

const NavigationItems = (props) => {
  // console.log(props.shrink);
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        path="products"
        icon="fab fa-product-hunt"
        name="Products"
        closeBackdrop={props.closeBackdrop}
        shrink={props.shrink}
      />

      <NavigationItem
        path="cart"
        icon="fas fa-shopping-cart"
        name="Cart"
        closeBackdrop={props.closeBackdrop}
        shrink={props.shrink}
      />

      <NavigationItem
        path="login"
        icon="fas fa-sign-in-alt"
        name="Login"
        closeBackdrop={props.closeBackdrop}
        shrink={props.shrink}
      />

      <SearchBar closeBackdrop={props.closeBackdrop} shrink={props.shrink} />
    </ul>
  );
};

export default NavigationItems;
