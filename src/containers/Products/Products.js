import React, { Component } from "react";

// components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Products from "../../components/Products/Products";

class ProductsPage extends Component {
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
