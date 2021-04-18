import React from "react";

// Styles
import classes from "./Header.module.scss";

// Components
import CarouselSet from "./Carousel/Carousel";
import IntroHeading from "./IntroHeading/IntroHeading";

const Header = () => {
  return (
    <header className={classes.Header}>
      <IntroHeading />
      <CarouselSet />
    </header>
  );
};

export default Header;
