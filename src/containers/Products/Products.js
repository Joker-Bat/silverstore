import React, { useEffect } from "react";

// components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Products from "../../components/Products/Products";

// Redux toolkit
import { useDispatch } from "react-redux";
import { closeFilter } from "../../store/filter/filterSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(closeFilter());
  }, [dispatch]);

  return (
    <section>
      <BreadCrumb title="products" />
      <Products />
    </section>
  );
};

export default ProductsPage;
