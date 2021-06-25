import React, { useState, useEffect } from "react";
// Axios
import axios from "../../../../axios-base";

// Carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";

// Style
import classes from "./Carousel.module.scss";
import "./Carousel.scss";

const CarouselSet = () => {
  const [banners, setBanners] = useState([]);

  const getBannerImages = (products) => {
    const listOfBanners = [];
    products.forEach((item) => {
      item.bannerImage &&
        listOfBanners.push({
          image: `https://freeestoreapi.herokuapp.com/images/products/${item.bannerImage}`,
          name: item.name,
          id: item.id,
        });
    });
    return listOfBanners;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/products", {
        params: {
          fields: "name, id, bannerImage",
        },
      });
      const products = await res.data.data.products;
      const bannerImages = getBannerImages(products);
      setBanners(bannerImages);
    };
    fetchData();
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
      {banners.map((item, index) => {
        return (
          <div className={classes.Slide} key={`banner${item.id}${index}`}>
            <img src={item.image} alt={item.name} className={classes.Banner} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselSet;
