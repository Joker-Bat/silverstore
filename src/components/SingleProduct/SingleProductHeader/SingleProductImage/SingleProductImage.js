import React, { useState, useEffect } from 'react';
// Styles
import classes from './SingleProductImage.module.scss';
// Redux Toolkit
import { useSelector } from 'react-redux';
// Components
import PopupImage from './PopupImage/PopupImage';
import ImageLoader from '../../../UI/ImageLoader/ImageLoader';
import { getImageUrl } from '../../../../utilities/helperFunctions';
/*
  Main Component
*/
const SingleProductImage = (props) => {
  const [imageLoading, setImageLoading] = useState(true);
  const { currentProduct } = useSelector((state) => state.singleProduct);

  const [mainImage, setMainImage] = useState(currentProduct.images[0]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    setMainImage(currentProduct.images[0]);
    window.scrollTo(0, 0);
  }, [currentProduct.images]);

  const handleImageLoading = () => {
    setImageLoading(false);
  };

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
            {imageLoading && <ImageLoader />}
            <img
              src={getImageUrl(`/images/products/${mainImage}`)}
              alt={currentProduct.name}
              onLoad={handleImageLoading}
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
                  {imageLoading && <ImageLoader />}
                  <img
                    src={getImageUrl(`/images/products/${item}`)}
                    alt="smallImage"
                    onLoad={handleImageLoading}
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
