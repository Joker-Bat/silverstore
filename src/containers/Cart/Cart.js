import React, { useEffect } from "react";

// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <BreadCrumb title="cart" />
      <h1>CART</h1>
    </section>
  );
};

export default Cart;
