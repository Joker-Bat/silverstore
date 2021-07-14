import React, { useEffect } from 'react';
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
  // const [currentProduct, setCurrentProduct] = useState({});

  // On initial render clear productId in state because when we change another product it wont cause rerender
  useEffect(() => {
    // When new id is there then clear reviews state
    dispatch(clearReviews());
    window.scrollTo(0, 0);
  }, [dispatch]);

  // Make a request to public API and get a current product details
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/products/${id}`);
      const product = await res.data.data.product[0];
      dispatch(setCurrentProduct(product));
      dispatch(setAllReviews(product.ratings));
    };
    fetchData();
  }, [id, dispatch]);

  // Get Reviews from server
  useEffect(() => {
    // if (productId) {
    const fetchData = async () => {
      try {
        const res = await pureAxios.get(`/api/v1/reviews/${currentProduct.id}`);
        const curReviews = res.data.data.reviews;
        console.log(curReviews);
        if (curReviews.length !== 0) {
          // Update review data from server as we need and delete old one
          const updatedReviews = updateReviewStructure(curReviews);
          dispatch(setAllReviews(updatedReviews));
        }
      } catch (err) {
        console.log('Error', err.response);
      }
    };
    fetchData();
    // }
  }, [currentProduct.id, dispatch]);

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
            <Reviews id={currentProduct.id} />
          </main>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SingleProduct;
