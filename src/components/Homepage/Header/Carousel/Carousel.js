import React, { useState } from 'react';
// Style
import classes from './Carousel.module.scss';
import './Carousel.scss';
// Carousel
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';
// React Router
import { withRouter } from 'react-router-dom';
// React Redux
import { useSelector } from 'react-redux';
// Skeleton-Elements
import ImageLoader from '../../../UI/ImageLoader/ImageLoader';

/**
 * Main Component
 */

const CarouselSet = (props) => {
  const { bannerImages } = useSelector((state) => state.products);

  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoading = () => {
    setImageLoading(false);
  };

  const handleClick = (index) => {
    const currentProductSlug = bannerImages[index].slug;
    props.history.push(`/products/${currentProductSlug}`);
  };

  return (
    <Carousel
      interval="3000"
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      onClickItem={handleClick}
      emulateTouch={true}
      useKeyboardArrows={true}
      autoFocus={true}
    >
      {bannerImages.map((item, index) => {
        return (
          <div className={classes.Slide} key={`banner${item.id}${index}`}>
            {imageLoading && <ImageLoader bannerImage />}
            <img
              src={`https://freeestoreapi.herokuapp.com/images/products/${item.bannerImage}`}
              alt={item.name}
              className={classes.Banner}
              onLoad={handleImageLoading}
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default withRouter(CarouselSet);
