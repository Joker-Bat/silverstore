import React from 'react';
// Styles
import classes from './Button.module.scss';
// React Router
import { Link } from 'react-router-dom';

const Button = ({
  loading,
  submit,
  disabled,
  tabIndex,
  small,
  large,
  uppercase,
  name,
  route,
  clicked,
  capitalize,
  shine,
  fixedWidth,
  danger,
}) => {
  const buttonClass = [classes.Button];

  (loading || disabled) && buttonClass.push(classes.Disabled);
  small && buttonClass.push(classes.Small);
  large && buttonClass.push(classes.Large);
  uppercase && buttonClass.push(classes.Uppercase);
  capitalize && buttonClass.push(classes.Capitalize);
  shine && buttonClass.push(classes.Shine);
  fixedWidth && buttonClass.push(classes.FixedWidth);
  danger && buttonClass.push(classes.Danger);

  let button = (
    <button
      tabIndex={tabIndex ? tabIndex : ''}
      type={submit ? 'submit' : 'button'}
      className={buttonClass.join(' ')}
      onClick={clicked}
    >
      {loading ? <span className={classes.Spinner}></span> : name}
    </button>
  );

  if (route) {
    button = (
      <Link to={route} className={buttonClass.join(' ')} onClick={clicked}>
        {name}
      </Link>
    );
  }

  return button;
};

export default Button;
