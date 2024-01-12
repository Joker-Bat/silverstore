import React from 'react';

// Styles
import classes from './PopupImage.module.scss';

// Components
import Backdrop from '../../../../UI/Backdrop/Backdrop';
import { getImageUrl } from '../../../../../utilities/helperFunctions';

const PopupImage = ({ popupOpen, setPopupOpen, mainImage }) => {
  return (
    <div>
      <Backdrop isOpen={popupOpen} close={() => setPopupOpen(false)} />
      <div
        className={[
          classes.PopupImageContainer,
          popupOpen && classes.OpenPopup,
        ].join(' ')}
      >
        <div className={classes.CloseIcon} onClick={() => setPopupOpen(false)}>
          <i className="fas fa-times"></i>
        </div>
        <img
          src={getImageUrl(`/images/products/${mainImage}`)}
          alt="mainImage"
          className={classes.PopupImage}
        />
      </div>
    </div>
  );
};

export default PopupImage;
