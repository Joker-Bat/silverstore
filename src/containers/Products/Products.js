import React, { useEffect } from 'react';
// components
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import Products from '../../components/Products/Products';
// Redux toolkit
import { useDispatch } from 'react-redux';
import { resetFilter } from '../../store/filter/filterSlice';
import { resetProducts } from '../../store/products/productsSlice';

const ProductsPage = () => {
  const dispatch = useDispatch();

  // Reseting stuff
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetFilter());
    dispatch(resetProducts());
  }, [dispatch]);

  return (
    <section>
      <BreadCrumb title="products" />
      <Products />
    </section>
  );
};

export default ProductsPage;
