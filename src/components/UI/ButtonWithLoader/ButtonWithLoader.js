import React from 'react';
// Styles
import classes from './ButtonWithLoader.module.scss';
// Components
import ButtonLoader from '../ButtonLoader/ButtonLoader';
/**
 * Main Component
 */
const ButtonWithLoader = ({
  loading,
  name,
  submit,
  clicked,
  uppercase,
  disabled,
  capitalize,
  tabIndex,
  shine,
}) => {
  const buttonClass = [classes.ButtonWithLoader];
  (loading || disabled) && buttonClass.push(classes.Disabled);
  uppercase && buttonClass.push(classes.Uppercase);
  capitalize && buttonClass.push(classes.Capitalize);
  shine && buttonClass.push(classes.Shine);

  return (
    <button
      tabIndex={tabIndex ? tabIndex : ''}
      type={submit ? 'submit' : 'button'}
      className={buttonClass.join(' ')}
      onClick={clicked}
    >
      {loading ? <ButtonLoader /> : name}
    </button>
  );
};

export default ButtonWithLoader;
