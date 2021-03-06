import React, { useState, useEffect, useCallback } from 'react';
// Axios
import axios from '../../axios-base';
import pureAxios from 'axios';
// React Router
import { useParams } from 'react-router-dom';
// HelperFunctions
import { truncateWords } from '../../utilities/helperFunctions';
import { updateReviewStructure } from '../../utilities/helperFunctions';
// Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import {
  setAllReviews,
  clearReviews,
  setCurrentProduct,
} from '../../store/singleProduct/singleProductSlice';
import {
  setErrorMessage,
  removeErrorMessage,
} from '../../store/notification/notificationSlice';
// Components
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import SingleProductHeader from '../../components/SingleProduct/SingleProductHeader/SingleProductHeader';
import SingleProductSpecs from '../../components/SingleProduct/SingleProductSpecs/SingleProductSpecs';
import Reviews from '../../components/SingleProduct/Reviews/Reviews';
import Loading from '../../components/UI/Loading/Loading';

/*
  Main Component
*/

const SingleProduct = () => {
  // Redux Toolkit
  const dispatch = useDispatch();
  const { currentProduct } = useSelector((state) => state.singleProduct);
  const { id } = useParams();
  const [curProductId, setCurProductId] = useState(null);

  // Error Message
  const errorMessageInSingleProduct = useCallback(
    (message) => {
      let timer;
      clearTimeout(timer);
      dispatch(setErrorMessage(message));
      timer = setTimeout(() => {
        dispatch(removeErrorMessage());
      }, 2000);
    },
    [dispatch]
  );

  // On initial render
  useEffect(() => {
    // When new id is there then clear reviews state
    dispatch(clearReviews());
    window.scrollTo(0, 0);

    // When unmount clear currentData
    return () => {
      dispatch(setCurrentProduct({}));
    };
  }, [dispatch]);

  // Make a request to public API and get a current product details
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(clearReviews());
        const res = await axios.get(`/api/v1/products/${id}`);
        const product = await res.data.data.product[0];
        dispatch(setCurrentProduct(product));
        // Here id is slug so we need product id to make a request to server
        setCurProductId(product.id);
        dispatch(setAllReviews(product.ratings));
      } catch (err) {
        errorMessageInSingleProduct('Something went wrong');
      }
    };
    fetchData();
  }, [id, dispatch, errorMessageInSingleProduct]);

  // Get Reviews from server
  useEffect(() => {
    if (curProductId) {
      const fetchData = async () => {
        try {
          const res = await pureAxios.get(`/api/v1/reviews/${curProductId}`);
          const curReviews = res.data.data.reviews;
          if (curReviews.length !== 0) {
            // Update review data from server as we need and delete old one
            const updatedReviews = updateReviewStructure(curReviews);
            dispatch(setAllReviews(updatedReviews));
          }
        } catch (err) {
          errorMessageInSingleProduct('Something went wrong');
        }
      };
      fetchData();
    }
  }, [curProductId, dispatch, errorMessageInSingleProduct]);

  return (
    <div>
      {Object.keys(currentProduct).length !== 0 ? (
        <>
          <BreadCrumb title={truncateWords(currentProduct.name, 18)} product />
          <main>
            <SingleProductHeader />
            <SingleProductSpecs />
            <Reviews />
          </main>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SingleProduct;
