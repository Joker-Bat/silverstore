import React from 'react';
// Styles
import classes from './ImageLoader.module.scss';

const ImageLoader = ({ bgDark }) => {
  return (
    <div
      className={[
        classes.SearchingAnimation,
        bgDark ? classes.BgDark : '',
      ].join(' ')}
    >
      <div></div>
    </div>
  );
};

export default ImageLoader;
