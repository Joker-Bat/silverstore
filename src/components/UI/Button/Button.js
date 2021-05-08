import React from "react";

// Styles
import classes from "./Button.module.scss";

// React Router
import { Link } from "react-router-dom";

const Button = ({ small, large, uppercase, name, route, clicked }) => {
  const buttonClass = [classes.Button];

  small && buttonClass.push(classes.Small);
  large && buttonClass.push(classes.Large);
  uppercase && buttonClass.push(classes.Uppercase);

  return (
    <Link
      to={route ? route : ""}
      className={buttonClass.join(" ")}
      onClick={clicked}
    >
      {name}
    </Link>
  );
};

export default Button;
