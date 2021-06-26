import React, { useState, useEffect } from "react";
// Axios
import axios from "../../axios-base";
// React Router
import { useParams } from "react-router-dom";
// HelperFunctions
import { truncateWords } from "../../utilities/helperFunctions";
import { getLocalReviews } from "./model/getLocalReviews";
// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SingleProductHeader from "../../components/SingleProduct/SingleProductHeader/SingleProductHeader";
import SingleProductSpecs from "../../components/SingleProduct/SingleProductSpecs/SingleProductSpecs";
import Reviews from "../../components/SingleProduct/Reviews/Reviews";

/*
  Main Component
*/

const SingleProduct = (props) => {
  // const id = props.match.params.id;
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});

  const [ratings, setRatings] = useState([]);
  // A simple dummy state for render when localstorage changes
  const [localReviews, setLocalReviews] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/products/${id}`);
      const product = await res.data.data.product[0];
      setCurrentProduct(product);
      setRatings((prev) => {
        return [...product.ratings, ...prev];
      });
    };
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (Object.keys(currentProduct).length !== 0) {
      const currentLocalReviewsList = getLocalReviews(currentProduct.id);

      if (currentLocalReviewsList) {
        // Add current localReviews to the state
        const currentReviews = [...ratings, ...currentLocalReviewsList];
        // Prevent from adding same local reviews again again when render
        const filteredLocalReviews = currentReviews.filter(
          (item, index, arr) => {
            if (item.reviewId) {
              return (
                arr.findIndex((i) => i.reviewId === item.reviewId) === index
              );
            } else {
              return item;
            }
          }
        );

        // Set filtered local reviews
        setRatings(filteredLocalReviews);
      }
    }
    //eslint-disable-next-line
  }, [currentProduct, localReviews]);

  return (
    <div>
      {Object.keys(currentProduct).length !== 0 ? (
        <>
          <BreadCrumb title={truncateWords(currentProduct.name, 18)} product />
          <main>
            <SingleProductHeader
              id={currentProduct.id}
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
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default SingleProduct;
