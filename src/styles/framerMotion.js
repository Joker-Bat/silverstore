const containerVariants = {
  hidden: {
    x: '100vw',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      mass: 0.6,
    },
  },
  exit: {
    x: '-100vw',
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
};

export default containerVariants;
