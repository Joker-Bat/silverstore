import React, { useState } from 'react';
// Style
import classes from './Product.module.scss';
// React Router
import { withRouter } from 'react-router-dom';
// NumberFormat
import NumberFormat from 'react-number-format';
// HelperFunction
import { truncateWords } from '../../../utilities/helperFunctions';

import ImageLoader from '../../UI/ImageLoader/ImageLoader';

/**
 * Main component
 */

const Product = ({
  name,
  image,
  price,
  searchingAnimation,
  id,
  history,
  skeleton,
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleClick = (curID) => {
    history.push(`/products/${curID}`);
  };

  const handleImageLoading = () => {
    setImageLoading(false);
  };

  return (
    <div className={classes.Product} onClick={() => handleClick(id)}>
      {!skeleton ? (
        <>
          <div className={classes.ImageContainer}>
            {imageLoading && <ImageLoader />}
            <img src={image} alt={name} onLoad={handleImageLoading} />
          </div>
          <div className={classes.ProductDetails}>
            <h1>{truncateWords(name, 18)}</h1>
            <h3>
              <NumberFormat
                displayType={'text'}
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                prefix={'₹'}
                value={price}
              />
            </h3>
          </div>
          {searchingAnimation && <ImageLoader bgDark />}
        </>
      ) : (
        <ImageLoader />
      )}
    </div>
  );
};

export default withRouter(Product);
