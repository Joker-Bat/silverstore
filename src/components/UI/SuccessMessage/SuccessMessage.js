import React from 'react';
// Styles
import classes from './SuccessMessage.module.scss';

const SuccessMessage = ({ message, show }) => {
  return (
    <div
      className={[classes.SuccessMessage, show ? classes.Show : ''].join(' ')}
    >
      <p>{message}</p>
    </div>
  );
};

export default SuccessMessage;
