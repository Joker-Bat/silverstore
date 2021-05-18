import React, { useState, useEffect } from "react";

// data
import data from "../../data/data";
// React Router
import { useParams } from "react-router-dom";

// HelperFunctions
import { truncateWords } from "../../utilities/helperFunctions";

// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SingleProductHeader from "../../components/SingleProduct/SingleProductHeader/SingleProductHeader";
import SingleProductSpecs from "../../components/SingleProduct/SingleProductSpecs/SingleProductSpecs";
import Reviews from "../../components/SingleProduct/Reviews/Reviews";

const SingleProduct = (props) => {
  // const id = props.match.params.id;
  const { id } = useParams();
  const currentProduct = data.filter((item) => item.id === id)[0];

  const [ratings, setRatings] = useState(currentProduct.ratings);
  // A simple dummy state for render when localstorage changes
  const [localReviews, setLocalReviews] = useState(0);

  useEffect(() => {
    const currentLocalReviewsList = JSON.parse(
      localStorage.getItem("localReviews")
    );
    if (currentLocalReviewsList) {
      // Filter reviews for current product
      const currentLocalReviews = currentLocalReviewsList?.filter(
        (item) => item.id === currentProduct.id
      );
      const currentReviews = [...ratings, ...currentLocalReviews];
      // Prevent from adding same local reviews again again when render
      const filteredLocalReviews = currentReviews.filter((item, index, arr) => {
        if (item.reviewId) {
          return arr.findIndex((i) => i.reviewId === item.reviewId) === index;
        } else {
          return item;
        }
      });

      // Set filtered local reviews
      setRatings(filteredLocalReviews);
    }
    //eslint-disable-next-line
  }, [localReviews]);

  return (
    <div>
      <BreadCrumb title={truncateWords(currentProduct.name, 18)} product />
      <main>
        <SingleProductHeader
          name={currentProduct.name}
          images={currentProduct.images}
          ratings={currentProduct.ratings}
          price={currentProduct.price}
          realPrice={currentProduct.realPrice}
          brand={currentProduct.brand}
          type={currentProduct.type}
        />
        <SingleProductSpecs
          highlights={currentProduct.highlights}
          specs={currentProduct.specs}
        />
        <Reviews
          id={currentProduct.id}
          ratings={ratings}
          updateLocalReviews={setLocalReviews}
        />
      </main>
    </div>
  );
};

export default SingleProduct;
