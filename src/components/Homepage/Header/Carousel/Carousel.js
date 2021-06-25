import React from "react";

// Carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";

// Style
import classes from "./Carousel.module.scss";
import "./Carousel.scss";

// React Redux
import { useSelector } from "react-redux";

const CarouselSet = () => {
  const { bannerImages } = useSelector((state) => state.products);

  return (
    <Carousel
      interval="3000"
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      emulateTouch={true}
      useKeyboardArrows={true}
      autoFocus={true}
    >
      {bannerImages.map((item, index) => {
        return (
          <div className={classes.Slide} key={`banner${item.id}${index}`}>
            <img
              src={`https://freeestoreapi.herokuapp.com/images/products/${item.bannerImage}`}
              alt={item.name}
              className={classes.Banner}
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselSet;
