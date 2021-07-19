import React from 'react';
// Components
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import ProfileContainer from '../../components/Profile/Profile';
// Framer motion
import { motion } from 'framer-motion';
import containerVariants from '../../styles/framerMotion';

const Profile = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <BreadCrumb title="profile" />
      <ProfileContainer />
    </motion.section>
  );
};

export default Profile;
