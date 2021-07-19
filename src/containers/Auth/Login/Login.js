import React from 'react';
// Components
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb';
import LoginContainer from '../../../components/auth/Login/Login';
// Framer motion
import { motion } from 'framer-motion';
import containerVariants from '../../../styles/framerMotion';

const Login = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <BreadCrumb title="login" />
      <LoginContainer />
    </motion.section>
  );
};

export default Login;
