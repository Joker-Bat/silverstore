import React, { useEffect } from "react";

// components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Products from "../../components/Products/Products";
import Loading from "../../components/UI/Loading/Loading";

// Redux toolkit
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../store/filter/filterSlice";
import { resetProducts } from "../../store/products/productsSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { globalLoading } = useSelector((state) => state.products);

  // Reseting stuff
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetFilter());
    dispatch(resetProducts());
  }, [dispatch]);

  return (
    <section>
      {globalLoading ? <Loading /> : null}
      <BreadCrumb title="products" />
      <Products />
    </section>
  );
};

export default ProductsPage;
