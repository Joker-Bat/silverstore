import React, { Component, lazy, Suspense } from "react";

// Components
import Layout from "./hoc/Layout";
import Loading from "./components/UI/Loading/Loading";

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Lazy Loading Products
const lazySingleProduct = lazy(() =>
  import("./containers/SingleProduct/SingleProduct")
);
const lazyProducts = lazy(() => import("./containers/Products/Products"));
const lazyCart = lazy(() => import("./containers/Cart/Cart"));
const lazyLogin = lazy(() => import("./containers/Login/Login"));
const lazySignup = lazy(() => import("./containers/Signup/Signup"));
const lazyUser = lazy(() => import("./containers/User/User"));
const lazyHomepage = lazy(() => import("./containers/Homepage/Homepage"));
const lazyForgotPassword = lazy(() =>
  import("./containers/ForgotPassword/ForgotPassword")
);
const lazyResetPassword = lazy(() =>
  import("./containers/ResetPassword/ResetPassword")
);

class App extends Component {
  render() {
    let routes = (
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/products/:id" exact component={lazySingleProduct} />
          <Route path="/products" component={lazyProducts} />
          <Route path="/forgotpassword" component={lazyForgotPassword} />
          <Route path="/resetpassword/:token" component={lazyResetPassword} />
          <Route path="/cart" component={lazyCart} />
          <Route path="/login" component={lazyLogin} />
          <Route path="/signup" component={lazySignup} />
          <Route path="/user" component={lazyUser} />
          <Route path="/" component={lazyHomepage} />
          <Route path="*" component={lazyHomepage} />
        </Switch>
      </Suspense>
    );

    return (
      <Router>
        <Layout>{routes}</Layout>
      </Router>
    );
  }
}

export default App;
