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
  capitalize,
  tabIndex,
}) => {
  const buttonClass = [classes.ButtonWithLoader];
  loading && buttonClass.push(classes.Disabled);
  uppercase && buttonClass.push(classes.Uppercase);
  capitalize && buttonClass.push(classes.Capitalize);

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
