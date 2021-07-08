import React, { useState, useEffect } from "react";
// Style
import classes from "../Authentication.module.scss";
// React Router
import { Link, withRouter, useParams } from "react-router-dom";
// Components
import ButtonLoader from "../../UI/ButtonLoader/ButtonLoader";
// Axios
import axios from "axios";

/**
 * Main Component
 */

const ResetPassword = (props) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [passwordEqual, setPasswordEqual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetedPassword, setResetedPassword] = useState(false);

  const { token } = useParams();

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const clearInputFields = () => {
    setPasswordInput("");
    setPasswordConfirmInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordInput !== passwordConfirmInput) {
      return setError("Passwords not matching");
    }

    if (!token) return setError("Not a valid token");

    try {
      setResetedPassword(false);
      setError("");
      setLoading(true);
      const user = {
        password: passwordInput,
      };
      await axios.patch(`/api/v1/users/resetpassword/${token}`, user);
      setResetedPassword(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
    clearInputFields();
  };

  const checkIsPasswordEqual = (e) => {
    setPasswordConfirmInput(e.target.value);
    if (e.target.value === passwordInput) {
      setPasswordEqual(true);
    } else setPasswordEqual(false);
  };

  useEffect(() => {
    let timer;
    if (resetedPassword) {
      timer = setTimeout(() => {
        props.history.push("/login");
      }, [2000]);
    }
    return () => clearTimeout(timer);
  }, [resetedPassword, props.history]);

  return (
    <div className={classes.AuthContainer}>
      <form className={classes.FormContainer} onSubmit={handleSubmit}>
        {error ? (
          <div className={classes.ErrorMessage}>
            <p>{error}</p>
          </div>
        ) : (
          ""
        )}

        {resetedPassword ? (
          <div className={classes.SuccessMessage}>
            <p>Successfully Changed your password</p>
          </div>
        ) : (
          ""
        )}

        <div className={classes.InputGroup}>
          <label htmlFor="password">New password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            name="password"
            autoComplete="off"
            placeholder="New password"
            required
          />
        </div>

        <div
          className={[classes.InputGroup, !passwordEqual && classes.Error].join(
            " "
          )}
        >
          <label htmlFor="passwordConfirm">Confirm new password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="passwordConfirm"
            value={passwordConfirmInput}
            onChange={checkIsPasswordEqual}
            name="password"
            autoComplete="off"
            placeholder="Confirm new password"
            required
          />
        </div>

        <div className={classes.ShowPassword}>
          <input
            checked={showPassword}
            onChange={handleShowPassword}
            type="checkbox"
            name="showPassword"
            id="showPassword"
            className={classes.Checkbox}
          />

          <label htmlFor="showPassword" className={classes.Label}>
            <span className={classes.Checkmark}></span>
            Show password
          </label>
        </div>

        <button type="submit" className={loading ? classes.Disabled : ""}>
          {loading ? <ButtonLoader /> : "Reset Password"}
        </button>
      </form>

      <div className={classes.BottomText}>
        <p>
          Remember your password now? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default withRouter(ResetPassword);
