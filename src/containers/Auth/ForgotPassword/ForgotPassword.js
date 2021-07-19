import React from 'react';
// Components
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb';
import ForgotPasswordContainer from '../../../components/auth/ForgotPassword/ForgotPassword';
// Framer motion
import { motion } from 'framer-motion';
import containerVariants from '../../../styles/framerMotion';

const ForgotPassword = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <BreadCrumb title="forgot password" />
      <ForgotPasswordContainer />
    </motion.section>
  );
};

export default ForgotPassword;
