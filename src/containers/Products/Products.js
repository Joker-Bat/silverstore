import React, { Component } from "react";

// components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Products from "../../components/Products/Products";

class ProductsPage extends Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <section>
        <BreadCrumb title="products" />
        <Products />
      </section>
    );
  }
}

export default ProductsPage;
