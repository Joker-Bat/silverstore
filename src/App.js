import React, { lazy, Suspense, useEffect, useCallback } from 'react';
// Components
import Layout from './hoc/Layout';
import Loading from './components/UI/Loading/Loading';
// Axios
import axios from './axios-base';
import pureAxios from 'axios';
// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
// Redux toolkit
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './store/auth/authSlice';
import { setPrice, setCategory } from './store/filter/filterSlice';
import { setAllProducts, setCartProducts } from './store/cart/cartSlice';
import { setProducts, setGlobalLoading } from './store/products/productsSlice';
import {
  removeErrorMessage,
  setErrorMessage,
} from './store/notification/notificationSlice';
import { removeToken } from './store/auth/authSlice';
// Helper function
import { arrayToObjectState } from './utilities/helperFunctions';
// Components
import ErrorMessage from './components/UI/ErrorMessage/ErrorMessage';

// Lazy Loading Products
const lazySingleProduct = lazy(() =>
  import('./containers/SingleProduct/SingleProduct')
);
const lazyProducts = lazy(() => import('./containers/Products/Products'));
const lazyCart = lazy(() => import('./containers/Cart/Cart'));
const lazyLogin = lazy(() => import('./containers/Auth/Login/Login'));
const lazySignup = lazy(() => import('./containers/Auth/Signup/Signup'));
const lazyProfile = lazy(() => import('./containers/Profile/Profile'));
const lazyHomepage = lazy(() => import('./containers/Homepage/Homepage'));
const lazyForgotPassword = lazy(() =>
  import('./containers/Auth/ForgotPassword/ForgotPassword')
);
const lazyResetPassword = lazy(() =>
  import('./containers/Auth/ResetPassword/ResetPassword')
);

/**
 * Main Component
 */

const App = () => {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  const { productRef } = useSelector((state) => state.products);
  const { errorMessage } = useSelector((state) => state.notification);

  // Get auth token if available
  useEffect(() => {
    const token = localStorage.getItem('silvertoken');
    if (token) {
      dispatch(setToken({ token }));
    }
  }, [dispatch]);

  // At first render check if token is not expired
  useEffect(() => {
    const fetchData = async () => {
      let timer;
      try {
        await pureAxios.get('/api/v1/users/isloggedin');
      } catch (err) {
        clearTimeout(timer);
        dispatch(setErrorMessage('You are not logged in'));
        timer = setTimeout(() => {
          dispatch(removeErrorMessage());
        }, 3000);
        dispatch(removeToken());
      }
    };
    fetchData();
  }, [dispatch]);

  // Get Category State
  const getProductsPageDetails = useCallback(
    (products) => {
      // Categorys
      const categroryList = [...new Set(products.map((item) => item.type))];
      const categoryState = arrayToObjectState(categroryList, false);
      //Max price
      const maxPrice = Math.max(...products.map((item) => +item.price));
      const minPrice = Math.min(...products.map((item) => +item.price));
      dispatch(setPrice({ maxPrice, minPrice }));
      dispatch(setCategory(categoryState));
    },
    [dispatch]
  );

  // Get all products from API and store in state
  useEffect(() => {
    if (productRef.length === 0) {
      const fetchData = async () => {
        let timer;
        try {
          dispatch(setGlobalLoading(true));
          const res = await axios.get('/api/v1/products');
          const products = res.data.data.products;
          if (productRef.length === 0) {
            dispatch(setProducts(products));
          }
          // For Single Product page
          getProductsPageDetails(products);
          // For Cart
          dispatch(setAllProducts(products));
          dispatch(setGlobalLoading(false));
        } catch (err) {
          clearTimeout(timer);
          dispatch(setErrorMessage('Something went wrong with connection'));
          timer = setTimeout(() => {
            dispatch(removeErrorMessage());
          }, 3000);
        }
      };
      fetchData();
    }
  }, [productRef, dispatch, getProductsPageDetails]);

  // To fetch Cart item from server and set to state
  useEffect(() => {
    let timer;
    if (authToken) {
      const fetchData = async () => {
        try {
          const res = await pureAxios.get('/api/v1/carts/getall');
          dispatch(setCartProducts(res.data.data.carts));
        } catch (err) {
          clearTimeout(timer);
          dispatch(setErrorMessage('Something went wrong with connection'));
          timer = setTimeout(() => {
            dispatch(removeErrorMessage());
          }, 3000);
        }
      };

      fetchData();
    }

    // Here i am using productRef from productSlice but this wont do any change both are same states
  }, [productRef, authToken, dispatch]);

  let routes = (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/products/:id" exact component={lazySingleProduct} />
        <Route path="/products" component={lazyProducts} />
        <Route path="/forgotpassword" component={lazyForgotPassword} />
        <Route path="/resetpassword/:token" component={lazyResetPassword} />
        <Route path="/login" component={lazyLogin} />
        <Route path="/signup" component={lazySignup} />
        <Route exact path="/" component={lazyHomepage} />
        <Redirect to="/login" />
      </Switch>
    </Suspense>
  );

  if (authToken) {
    routes = (
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/products/:id" exact component={lazySingleProduct} />
          <Route path="/products" component={lazyProducts} />
          <Route path="/cart" component={lazyCart} />
          <Route path="/profile" component={lazyProfile} />
          <Route path="/" exact component={lazyHomepage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }

  return (
    <Router>
      <Layout>
        <ErrorMessage
          message={errorMessage}
          show={errorMessage ? true : false}
        />
        {routes}
      </Layout>
    </Router>
  );
};

export default App;
