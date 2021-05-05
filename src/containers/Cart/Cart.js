import React, { Component } from 'react';

// Components 
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

export class Cart extends Component {
  render() {
    return (
      <section>
        <BreadCrumb title="cart" />
        <h1>CART</h1>
      </section>
    )
  }
}

export default Cart
