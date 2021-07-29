import React from 'react';

// Styles
import classes from './SimpleButton.module.scss';

const SimpleButton = ({
  name,
  small,
  large,
  uppercase,
  capitalize,
  clicked,
  shine,
}) => {
  const buttonClass = [classes.Button];

  small && buttonClass.push(classes.Small);
  large && buttonClass.push(classes.Large);
  uppercase && buttonClass.push(classes.Uppercase);
  capitalize && buttonClass.push(classes.Capitalize);
  shine && buttonClass.push(classes.Shine);

  return (
    <button onClick={clicked} type="button" className={buttonClass.join(' ')}>
      {name}
    </button>
  );
};

export default SimpleButton;
