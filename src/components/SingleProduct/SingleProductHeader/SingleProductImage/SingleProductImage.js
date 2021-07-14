import React, { useState, useEffect } from 'react';
// Styles
import classes from './SingleProductImage.module.scss';
// Redux Toolkit
import { useSelector } from 'react-redux';
// Components
import PopupImage from './PopupImage/PopupImage';
/*
  Main Component
*/
const SingleProductImage = (props) => {
  const { currentProduct } = useSelector((state) => state.singleProduct);

  const [mainImage, setMainImage] = useState(currentProduct.images[0]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    setMainImage(currentProduct.images[0]);
    window.scrollTo(0, 0);
  }, [currentProduct.images]);

  return (
    <div className={classes.SingleProductImageContainer}>
      <PopupImage
        mainImage={mainImage ? mainImage : currentProduct.images[0]}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
      />
      <div className={classes.SingleProductImage}>
        <div className={classes.ImageContainer}>
          <div className={classes.MainImage} onClick={() => setPopupOpen(true)}>
            <img
              src={`https://freeestoreapi.herokuapp.com/images/products/${mainImage}`}
              alt={currentProduct.name}
            />
          </div>
          <div className={classes.SmallImageContainer}>
            {currentProduct.images.map((item, index) => {
              return (
                <div
                  key={`smallImage${index}`}
                  className={[
                    classes.SmallImage,
                    mainImage === item ? classes.Active : '',
                  ].join(' ')}
                  onClick={() => setMainImage(item)}
                >
                  <img
                    src={`https://freeestoreapi.herokuapp.com/images/products/${item}`}
                    alt="smallImage"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductImage;
