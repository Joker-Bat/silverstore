import React from 'react';
// Components
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb';
import ResetPasswordContainer from '../../../components/auth/ResetPassword/ResetPassword';
// Framer motion
import { motion } from 'framer-motion';
import containerVariants from '../../../styles/framerMotion';

const ResetPassword = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <BreadCrumb title="reset password" />
      <ResetPasswordContainer />
    </motion.section>
  );
};

export default ResetPassword;
