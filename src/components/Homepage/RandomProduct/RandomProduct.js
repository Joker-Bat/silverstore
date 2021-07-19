import React, { useState, useEffect } from 'react';
// Axios
import axios from '../../../axios-base';
// Style
import classes from './RandomProduct.module.scss';
// Redux toolkit
import { useDispatch } from 'react-redux';
import {
  setErrorMessage,
  removeErrorMessage,
} from '../../../store/notification/notificationSlice';
// Components
import Title from '../../UI/Title/Title';
import Product from '../../UI/Product/Product';
import SimpleButton from '../../UI/SimpleButton/SimpleButton';

/**
 * Main component
 */

const RandomProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState('');
  const [searching, setSearching] = useState(false);

  const errorMessageInRandomProduct = (message) => {
    let timer;
    clearTimeout(timer);
    dispatch(setErrorMessage(message));
    timer = setTimeout(() => {
      dispatch(removeErrorMessage());
    }, 2000);
  };

  const getRandomProduct = async () => {
    // If already searching then return
    if (searching) return;
    try {
      setSearching(true);
      const res = await axios.get('/api/v1/products/random');
      setProduct(res.data.data.product[0]);
      setSearching(false);
    } catch (err) {
      errorMessageInRandomProduct('Something went wrong');
    }
  };

  useEffect(() => {
    getRandomProduct();
    //eslint-disable-next-line
  }, []);

  return (
    <section className={classes.RandomProduct}>
      <Title name={'dont know where to start'} />
      {product ? (
        <Product
          id={product.slug}
          image={`https://freeestoreapi.herokuapp.com/images/products/${product.images[0]}`}
          name={product.name}
          price={product.price}
          searchingAnimation={searching}
        />
      ) : null}
      <SimpleButton
        name={'get random'}
        clicked={getRandomProduct}
        large
        uppercase
      />
    </section>
  );
};

export default RandomProduct;

// const getRandomProduct = () => {

//   let searchTimer;
//   let loadingTimer;
//   setSearching(true);
//   for (let i = 0; i <= 10; i++) {
//     searchTimer = setTimeout(() => {
//       const randomNumberFromList = Math.floor(Math.random() * totalProducts);
//       const currentProduct = data[randomNumberFromList];
//       setProduct(currentProduct);
//     }, i * 100);
//     loadingTimer = setTimeout(() => {
//       setSearching(false);
//     }, 1000);
//   }
//   clearTimeout(searchTimer);
//   clearTimeout(loadingTimer);
// };
