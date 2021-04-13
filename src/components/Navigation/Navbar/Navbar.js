import React, { useState, useEffect } from "react";

// Styles
import classes from "./Navbar.module.scss";

// Components
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import NavbarToggler from "../NavbarToggler/NavbarToggler";

const Navbar = (props) => {
  const [shrinkedNavbar, setShrinkedNavbar] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        setShrinkedNavbar(true);
      } else {
        setShrinkedNavbar(false);
      }
    };
  }, [setShrinkedNavbar]);

  const NavbarClass = [classes.Navbar, shrinkedNavbar && classes.ShrinkNavbar];

  return (
    <header className={NavbarClass.join(" ")}>
      <Logo shrink={shrinkedNavbar} />
      <nav className={classes.NavItems}>
        <div className={classes.NavItemsLinks}>
          <NavigationItems shrink={shrinkedNavbar} />
        </div>
        <NavbarToggler toggle={props.toggle} open={props.open} />
      </nav>
    </header>
  );
};

export default Navbar;
