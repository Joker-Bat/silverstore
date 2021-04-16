import React, { useState, useEffect } from "react";

// Data
import data from "../../../data/data";

// Carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";

// Style
import classes from "./Carousel.module.scss";
import "./Carousel.scss";

const CarouselSet = () => {
  const [banners, setBanners] = useState([]);

  const listOfBanners = [];

  const getBannerImages = () => {
    data.forEach((item) => {
      item.bannerImage && listOfBanners.push(item);
    });
    setBanners(listOfBanners);
  };

  useEffect(() => {
    getBannerImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {banners.map((item) => {
        return (
          <div className={classes.Slide} key={item.id}>
            <img
              src={item.bannerImage}
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
