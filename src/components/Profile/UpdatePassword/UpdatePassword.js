import React, { useState, useEffect } from "react";
// Styles
import classes from "./UpdatePassword.module.scss";
// Axios
import axios from "axios";
// Components
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../UI/SuccessMessage/SuccessMessage";
import ButtonLoader from "../../UI/ButtonLoader/ButtonLoader";

/**
 * Main Component
 */

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordsEqual, setPasswordsEqual] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const clearInputFields = () => {
    setOldPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirm)
      return setPasswordError("New Passwords not match");

    try {
      setPasswordLoading(true);
      await axios.patch("/api/v1/users/updatepassword", {
        oldPassword,
        newPassword,
      });
      setPasswordLoading(false);
      setPasswordSuccess(true);
      clearInputFields();
    } catch (err) {
      setPasswordLoading(false);
      setPasswordError(err.response.data.message);
    }
  };

  const handlePasswordEqual = (e) => {
    setNewPasswordConfirm(e.target.value);
    if (e.target.value === newPassword) return setPasswordsEqual(true);
    else return setPasswordsEqual(false);
  };

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setPasswordError("");
      setPasswordSuccess(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [passwordError, passwordSuccess]);

  return (
    <div className={classes.UpdatePasswordContainer}>
      <h2>update password</h2>
      {passwordError ? <ErrorMessage message={passwordError} /> : ""}
      {passwordSuccess ? (
        <SuccessMessage message="Password updated try login again" />
      ) : (
        ""
      )}
      <form onSubmit={handlePasswordUpdate}>
        {/* Below input field is for accesability */}
        <input
          type="text"
          style={{ display: "none" }}
          autoComplete="username"
        />
        <div className={classes.InputGroup}>
          <label htmlFor="oldPassword">old password</label>
          <input
            type={showPassword ? "text" : "password"}
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
            type={showPassword ? "text" : "password"}
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
          ].join(" ")}
        >
          <label htmlFor="newPasswordConfirm">new password confirm</label>
          <input
            type={showPassword ? "text" : "password"}
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
        <button
          type="submit"
          className={passwordLoading ? classes.Disabled : ""}
        >
          {passwordLoading ? <ButtonLoader /> : "Update password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
