import React, { useEffect } from "react";

// Components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import CartItems from "../../components/Cart/Cart";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <BreadCrumb title="cart" />
      <CartItems />
    </section>
  );
};

export default Cart;
