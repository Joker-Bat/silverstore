import React from 'react';

// Styles
import classes from "./Button.module.scss";

const Button = (props) => {

  const buttonClass = [classes.Button];

  props.small && buttonClass.push(classes.Small)
  props.large && buttonClass.push(classes.Large)
  props.uppercase && buttonClass.push(classes.Uppercase)

  return (
    <button className={buttonClass.join(' ')}>
      {props.name}
    </button>
  )
}

export default Button
