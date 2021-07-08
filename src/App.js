import React, { lazy, Suspense, useEffect } from "react";
// Components
import Layout from "./hoc/Layout";
import Loading from "./components/UI/Loading/Loading";
// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// Redux toolkit
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./store/auth/authSlice";

// Lazy Loading Products
const lazySingleProduct = lazy(() =>
  import("./containers/SingleProduct/SingleProduct")
);
const lazyProducts = lazy(() => import("./containers/Products/Products"));
const lazyCart = lazy(() => import("./containers/Cart/Cart"));
const lazyLogin = lazy(() => import("./containers/Auth/Login/Login"));
const lazySignup = lazy(() => import("./containers/Auth/Signup/Signup"));
const lazyProfile = lazy(() => import("./containers/Profile/Profile"));
const lazyHomepage = lazy(() => import("./containers/Homepage/Homepage"));
const lazyForgotPassword = lazy(() =>
  import("./containers/Auth/ForgotPassword/ForgotPassword")
);
const lazyResetPassword = lazy(() =>
  import("./containers/Auth/ResetPassword/ResetPassword")
);

/**
 * Main Component
 */

const App = () => {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("silvertoken");
    if (token) {
      dispatch(setToken({ token }));
    }
  }, [dispatch]);

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
      <Layout>{routes}</Layout>
    </Router>
  );
};

export default App;
