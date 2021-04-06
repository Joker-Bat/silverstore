import React, { useRef } from "react";

// styles
import classes from "./NavbarToggler.module.scss";

const NavbarToggler = (props) => {
  const togglerClasses = [classes.NavbarToggler];
  if (props.open) {
    togglerClasses.push(classes.Active);
  }
  const toggler = useRef();
  const toggleNavbar = () => {
    props.toggle();
  };

  return (
    <div
      className={togglerClasses.join(" ")}
      ref={toggler}
      onClick={toggleNavbar}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default NavbarToggler;
