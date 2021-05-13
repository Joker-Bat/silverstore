import React from "react";

// Styles
import classes from "./SimpleButton.module.scss";

const SimpleButton = ({
  name,
  small,
  large,
  uppercase,
  capitalize,
  clicked,
}) => {
  const buttonClass = [classes.Button];

  small && buttonClass.push(classes.Small);
  large && buttonClass.push(classes.Large);
  uppercase && buttonClass.push(classes.Uppercase);
  capitalize && buttonClass.push(classes.Capitalize);

  return (
    <button onClick={clicked} className={buttonClass.join(" ")}>
      {name}
    </button>
  );
};

export default SimpleButton;
