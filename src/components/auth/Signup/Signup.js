import React, { useState, useEffect } from "react";
// Style
import classes from "../Authentication.module.scss";
// React Router
import { Link } from "react-router-dom";
// Components
import ButtonLoader from "../../UI/ButtonLoader/ButtonLoader";
// Axios
import axios from "axios";
// Redux toolkit
import { useDispatch } from "react-redux";
import { setToken } from "../../../store/auth/authSlice";

/**
 * Main Component
 */

const Signup = (props) => {
  const dispatch = useDispatch();

  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [passwordEqual, setPasswordEqual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  let timer;

  const setTokenToLocalAndState = (token) => {
    timer = setTimeout(() => {
      dispatch(setToken({ token }));
    }, 2000);
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const clearInputFields = () => {
    setEmailInput("");
    setUsernameInput("");
    setPasswordInput("");
    setPasswordConfirmInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordInput !== passwordConfirmInput) {
      return setError("Passwords not matching");
    }
    try {
      setSignedUp(false);
      setError("");
      setLoading(true);
      const user = {
        name: usernameInput,
        email: emailInput,
        password: passwordInput,
      };
      const res = await axios.post("/api/v1/users/signup", user);
      setTokenToLocalAndState(res.data.token);
      setSignedUp(true);
      setLoading(false);
      clearInputFields();
    } catch (err) {
      setError(err.response.data.error.message);
      setLoading(false);
    }
  };

  const checkIsPasswordEqual = (e) => {
    setPasswordConfirmInput(e.target.value);
    if (e.target.value === passwordInput) {
      setPasswordEqual(true);
    } else setPasswordEqual(false);
  };

  useEffect(() => {
    clearInputFields();
    return () => clearTimeout(timer);
  }, [timer]);

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

        {signedUp ? (
          <div className={classes.SuccessMessage}>
            <p>Successfully Created Account</p>
          </div>
        ) : (
          ""
        )}

        <div className={classes.InputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            name="email"
            autoComplete="off"
            placeholder="Email"
            required
          />
        </div>

        <div className={classes.InputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            name="username"
            autoComplete="off"
            placeholder="Username"
            required
          />
        </div>

        <div className={classes.InputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            name="password"
            autoComplete="off"
            placeholder="Password"
            required
          />
        </div>

        <div
          className={[classes.InputGroup, !passwordEqual && classes.Error].join(
            " "
          )}
        >
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="passwordConfirm"
            value={passwordConfirmInput}
            onChange={checkIsPasswordEqual}
            name="password"
            autoComplete="off"
            placeholder="Confirm Password"
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
          {loading ? <ButtonLoader /> : "Sign Up"}
        </button>
      </form>

      <div className={classes.BottomText}>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
