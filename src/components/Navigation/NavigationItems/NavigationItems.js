import React from "react";
// Components
import NavigationItem from "./NavigationItem/NavigationItem";
import SearchBar from "../SearchBar/SearchBar";
// Styles
import classes from "./NavigationItems.module.scss";
// Redux toolkit
import { useSelector } from "react-redux";

const NavigationItems = (props) => {
  const { authToken } = useSelector((state) => state.auth);

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        path="/products"
        name="Products"
        closeBackdrop={props.closeBackdrop}
        shrink={props.shrink}
      />

      {authToken ? (
        <>
          <NavigationItem
            path="/cart"
            name="Cart"
            closeBackdrop={props.closeBackdrop}
            shrink={props.shrink}
          />

          <NavigationItem
            path="/profile"
            name="Profile"
            closeBackdrop={props.closeBackdrop}
            shrink={props.shrink}
          />
        </>
      ) : (
        <NavigationItem
          path="/login"
          name="Login"
          closeBackdrop={props.closeBackdrop}
          shrink={props.shrink}
        />
      )}

      {/* {authToken ? (
        <NavigationItem
          path="/profile"
          name="Profile"
          closeBackdrop={props.closeBackdrop}
          shrink={props.shrink}
        />
      ) : (
        ""
      )} */}

      <SearchBar closeBackdrop={props.closeBackdrop} shrink={props.shrink} />
    </ul>
  );
};

export default NavigationItems;
