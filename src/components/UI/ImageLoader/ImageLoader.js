import React from 'react';
// Styles
import classes from './ImageLoader.module.scss';

const ImageLoader = ({ bgDark, bannerImage }) => {
  const styles = [classes.SearchingAnimation];

  bgDark && styles.push(classes.BgDark);
  bannerImage && styles.push(classes.BannerImage);
  return (
    <div className={styles.join(' ')}>
      <div></div>
    </div>
  );
};

export default ImageLoader;
