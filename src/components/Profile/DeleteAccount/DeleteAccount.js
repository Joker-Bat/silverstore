import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
// Styles
import classes from './DeleteAccount.module.scss';
// Redux toolkit
import { useDispatch } from 'react-redux';
import {
  setSuccessMessage,
  removeSuccessMessage,
  setErrorMessage,
  removeErrorMessage,
} from '../../../store/notification/notificationSlice';
import { removeToken } from '../../../store/auth/authSlice';
// Components
import Button from '../../Button/Button';
import Backdrop from '../../UI/Backdrop/Backdrop';

const DeleteAccount = ({ isActive, showForm }) => {
  const dispatch = useDispatch();

  const oldPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Success Message
  const successMessageInDeleteAccount = useCallback(
    (message) => {
      let timer;
      clearTimeout(timer);
      dispatch(setSuccessMessage(message));
      timer = setTimeout(() => {
        dispatch(removeSuccessMessage());
        showForm(false);
        dispatch(removeToken());
      }, 2000);
    },
    [dispatch, showForm]
  );
  // Error Message
  const errorMessageInDeleteAccount = useCallback(
    (message) => {
      let timer;
      clearTimeout(timer);
      dispatch(setErrorMessage(message));
      timer = setTimeout(() => {
        dispatch(removeErrorMessage());
      }, 2000);
    },
    [dispatch]
  );

  useEffect(() => {
    setOldPassword('');
    if (isActive) {
      oldPasswordRef.current.focus();
    }
  }, [isActive]);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleDeleteAccount = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.delete('/api/v1/users/deleteaccount', {
        data: { oldPassword },
      });
      setOldPassword('');
      setLoading(false);
      // All other logic in this function
      successMessageInDeleteAccount(res.data.message);
    } catch (err) {
      setLoading(false);
      errorMessageInDeleteAccount(err.response.data.error.message);
    }
  };

  return (
    <>
      <Backdrop isOpen={isActive} close={() => showForm(false)} />
      <div
        className={[classes.DeleteAccount, isActive ? classes.Active : ''].join(
          ' '
        )}
      >
        <p>Provide your password for confirmation</p>
        <form className={classes.FormContainer}>
          {/* Below input field is for accesability */}
          <input
            type="text"
            style={{ display: 'none' }}
            autoComplete="username"
          />
          <input
            type={showPassword ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="new-password"
            ref={oldPasswordRef}
          />
          <div className={classes.ShowPassword}>
            <input
              checked={showPassword}
              onChange={handleShowPassword}
              type="checkbox"
              name="showPassword"
              id="showPasswordForDelete"
              className={classes.Checkbox}
            />

            <label htmlFor="showPasswordForDelete" className={classes.Label}>
              <span className={classes.Checkmark}></span>
              Show password
            </label>
          </div>
          <Button
            name="delete"
            loading={loading}
            small
            clicked={handleDeleteAccount}
          />
        </form>
      </div>
    </>
  );
};

export default DeleteAccount;
