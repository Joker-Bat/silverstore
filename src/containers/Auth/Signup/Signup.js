import React from 'react';
// Components
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb';
import SignupContainer from '../../../components/auth/Signup/Signup';
// Framer motion
import { motion } from 'framer-motion';
import containerVariants from '../../../styles/framerMotion';

const Signup = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <BreadCrumb title="signup" />
      <SignupContainer />
    </motion.section>
  );
};

export default Signup;
