import React from 'react';
// Styles
import classes from './PriceCard.module.scss';
// Components
import NumberFormat from 'react-number-format';
import Button from '../../Button/Button';

/*
Main Component
*/

const PriceCard = ({ totalPrice, totalProducts }) => {
  return (
    <div className={classes.PriceCard}>
      <div className={classes.TotalProducts}>
        <p>no of products:</p>
        <p className={classes.Count}>{totalProducts}</p>
      </div>
      <div className={classes.TotalPrice}>
        <p>total price:</p>
        <p className={classes.Price}>
          <NumberFormat
            value={totalPrice}
            displayType={'text'}
            prefix={'₹'}
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
          />
        </p>
      </div>
      <Button name="continue" uppercase large />
    </div>
  );
};

export default PriceCard;
