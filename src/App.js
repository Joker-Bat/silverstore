import React, { Component } from "react";

// Components
import Layout from "./hoc/Layout";
import Homepage from "./containers/Homepage/Homepage";
import Cart from "./containers/Cart/Cart";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import Products from "./containers/Products/Products";
import SingleProduct from "./containers/SingleProduct/SingleProduct";
import User from "./containers/User/User";

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/products/:id" exact component={SingleProduct} />
        <Route path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/user" component={User} />
        <Route path="/" component={Homepage} />
        <Route path="*" component={Homepage} />
      </Switch>
    );

    return (
      <Router>
        <Layout>{routes}</Layout>
      </Router>
    );
  }
}

export default App;
