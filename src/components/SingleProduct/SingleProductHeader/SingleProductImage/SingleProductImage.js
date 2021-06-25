import React, { useState, useEffect } from "react";

// Styles
import classes from "./SingleProductImage.module.scss";

// Components
import PopupImage from "./PopupImage/PopupImage";

/*
  Main Component
*/
const SingleProductImage = (props) => {
  // const id = props.match.params.id;
  // const currentProduct = data.filter((item) => item.id === id)[0];

  const [mainImage, setMainImage] = useState(props?.images[0]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.SingleProductImageContainer}>
      <PopupImage
        mainImage={mainImage}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
      />
      <div className={classes.SingleProductImage}>
        <div className={classes.ImageContainer}>
          <div className={classes.MainImage} onClick={() => setPopupOpen(true)}>
            <img
              src={`https://freeestoreapi.herokuapp.com/images/products/${mainImage}`}
              alt={props.name}
            />
          </div>
          <div className={classes.SmallImageContainer}>
            {props.images.map((item, index) => {
              return (
                <div
                  key={`smallImage${index}`}
                  className={[
                    classes.SmallImage,
                    mainImage === item ? classes.Active : "",
                  ].join(" ")}
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
