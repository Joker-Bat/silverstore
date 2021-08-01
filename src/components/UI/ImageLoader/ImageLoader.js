import React from 'react';
// Styles
import classes from './ImageLoader.module.scss';

const ImageLoader = ({ bgDark }) => {
  const styles = [classes.SearchingAnimation];

  bgDark && styles.push(classes.BgDark);
  return (
    <div className={styles.join(' ')}>
      <div></div>
    </div>
  );
};

export default ImageLoader;
