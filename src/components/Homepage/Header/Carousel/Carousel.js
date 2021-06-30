import React from "react";

// Carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";

// Style
import classes from "./Carousel.module.scss";
import "./Carousel.scss";

// React Router
import { withRouter } from "react-router-dom";

// React Redux
import { useSelector } from "react-redux";

const CarouselSet = (props) => {
  const { bannerImages } = useSelector((state) => state.products);

  const handleClick = (index) => {
    const currentProductSlug = bannerImages[index].slug;
    console.log(currentProductSlug);
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

export default withRouter(CarouselSet);
