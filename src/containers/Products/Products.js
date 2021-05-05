import React, { Component } from "react";

// components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

export class Products extends Component {
  render() {
    return (
      <section>
        <BreadCrumb title="products" />
        <h1>This is products page</h1>
      </section>
    );
  }
}

export default Products;
