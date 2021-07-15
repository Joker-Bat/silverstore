import React from 'react';
// Styles
import classes from './ErrorMessage.module.scss';

const ErrorMessage = ({ message, show }) => {
  return (
    <div className={[classes.ErrorMessage, show ? classes.Show : ''].join(' ')}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
