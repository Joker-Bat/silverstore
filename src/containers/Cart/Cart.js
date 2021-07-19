import React, { useEffect } from 'react';
// Components
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import CartItems from '../../components/Cart/Cart';
// Framer motion
import { motion } from 'framer-motion';
import containerVariants from '../../styles/framerMotion';

/**
 * Main Component
 */
const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <BreadCrumb title="cart" />
      <CartItems />
    </motion.section>
  );
};

export default Cart;
