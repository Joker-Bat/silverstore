import React from "react";

// Styles
import classes from "./Header.module.scss";

// Components
import CarouselSet from "./Carousel/Carousel";
import IntroHeading from "./IntroHeading/IntroHeading";

const Header = ({ bannerImages }) => {
  return (
    <header className={classes.Header}>
      <div className={classes.IntroHeading}>
        <IntroHeading />
      </div>
      <div className={classes.CarouselSet}>
        <CarouselSet bannerImages={bannerImages} />
      </div>
    </header>
  );
};

export default Header;
