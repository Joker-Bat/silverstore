import React, { useState, useCallback } from 'react';
// Styles
import classes from './UpdatePassword.module.scss';
// Axios
import axios from 'axios';
// Components
import ButtonWithLoader from '../../UI/ButtonWithLoader/ButtonWithLoader';
// Redux Toolkit
import { useDispatch } from 'react-redux';
import {
  setErrorMessage,
  setSuccessMessage,
  removeSuccessMessage,
  removeErrorMessage,
} from '../../../store/notification/notificationSlice';

/**
 * Main Component
 */

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordsEqual, setPasswordsEqual] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Success Message
  const successMessageInProfile = useCallback(
    (message) => {
      let timer;
      clearTimeout(timer);
      dispatch(setSuccessMessage(message));
      timer = setTimeout(() => {
        dispatch(removeSuccessMessage());
      }, 2000);
    },
    [dispatch]
  );
  // Error Message
  const errorMessageInProfile = useCallback(
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
  // Show password
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  // Clear input fields after update
  const clearInputFields = () => {
    setOldPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');
  };
  // Update password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm)
      return errorMessageInProfile('New Passwords not match');

    try {
      setPasswordLoading(true);
      await axios.patch('/api/v1/users/updatepassword', {
        oldPassword,
        newPassword,
      });
      setPasswordLoading(false);
      successMessageInProfile('Password updated successfully try login again');
      clearInputFields();
    } catch (err) {
      setPasswordLoading(false);
      errorMessageInProfile(err.response.data.error.message);
    }
  };
  // Check if passwords equal while typing
  const handlePasswordEqual = (e) => {
    setNewPasswordConfirm(e.target.value);
    if (e.target.value === newPassword) return setPasswordsEqual(true);
    else return setPasswordsEqual(false);
  };

  return (
    <div className={classes.UpdatePasswordContainer}>
      <h2>update password</h2>
      <form onSubmit={handlePasswordUpdate}>
        {/* Below input field is for accesability */}
        <input
          type="text"
          style={{ display: 'none' }}
          autoComplete="username"
        />
        <div className={classes.InputGroup}>
          <label htmlFor="oldPassword">old password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password"
            id="oldPassword"
            placeholder="Old password..."
            required
          />
        </div>
        <div className={classes.InputGroup}>
          <label htmlFor="newPassword">new password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="newPassword"
            placeholder="New password..."
            autoComplete="new-password"
          />
        </div>
        <div
          className={[
            classes.InputGroup,
            !passwordsEqual && classes.Error,
          ].join(' ')}
        >
          <label htmlFor="newPasswordConfirm">new password confirm</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={newPasswordConfirm}
            onChange={handlePasswordEqual}
            id="newPasswordConfirm"
            placeholder="Confirm new password..."
            autoComplete="new-password"
          />
        </div>
        <div className={classes.ShowPassword}>
          <input
            type="checkbox"
            value={showPassword}
            onChange={handleShowPassword}
            name="showPassword"
            id="showPassword"
            className={classes.Checkbox}
          />

          <label htmlFor="showPassword" className={classes.Label}>
            <span className={classes.Checkmark}></span>
            Show password
          </label>
        </div>
        <ButtonWithLoader
          name="update password"
          capitalize
          loading={passwordLoading}
          submit
        />
      </form>
    </div>
  );
};

export default UpdatePassword;
