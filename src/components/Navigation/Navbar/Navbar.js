import React from "react";

// Styles
import classes from "./Navbar.module.scss";

// Components
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import NavbarToggler from "../NavbarToggler/NavbarToggler";

const Navbar = (props) => {
  return (
    <header className={classes.Navbar}>
      <Logo />
      <nav className={classes.NavItems}>
        <div className={classes.NavItemsLinks}>
          <NavigationItems />
        </div>
        <NavbarToggler toggle={props.toggle} open={props.open} />
      </nav>
    </header>
  );
};

export default Navbar;
