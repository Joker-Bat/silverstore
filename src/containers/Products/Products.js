import React, { useEffect } from 'react';
// Redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '../../store/filter/filterSlice';
import { resetProducts } from '../../store/products/productsSlice';
// components
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import Products from '../../components/Products/Products';
import Loading from '../../components/UI/Loading/Loading';

// Framer motion
import { motion } from 'framer-motion';
import containerVariants from '../../styles/framerMotion';
/**
 * Main component
 */

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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {globalLoading ? <Loading /> : null}
      <BreadCrumb title="products" />
      <Products />
    </motion.section>
  );
};

export default ProductsPage;
