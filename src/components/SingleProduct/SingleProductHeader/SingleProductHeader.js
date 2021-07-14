import React from 'react';
// Style
import classes from './SingleProductHeader.module.scss';
// Components
import SingleProductImage from './SingleProductImage/SingleProductImage';
import SingleProductDetails from './SingleProductDetails/SingleProductDetails';

/**
 * Main Component
 */

const SingleProductHeader = () => {
  return (
    <header className={classes.SingleProductHeader}>
      <SingleProductImage />
      <SingleProductDetails />
    </header>
  );
};

export default SingleProductHeader;
