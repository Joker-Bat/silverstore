import React, { useState } from "react";
// Styles
import classes from "./Login.module.scss";
// React Router
import { Link, withRouter } from "react-router-dom";
// Components
import ButtonLoader from "../UI/ButtonLoader/ButtonLoader";
// Axios
import axios from "axios";

/**
 * Main Component
 */

const Login = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const clearInputFields = () => {
    setEmailInput("");
    setPasswordInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email: emailInput, password: passwordInput };
      const res = await axios.post("http://localhost:8000/", user);
      console.log(res.data);
    } catch (err) {
      console.log("Error", err.message);
    }
    clearInputFields();
  };

  return (
    <div className={classes.LoginContainer}>
      <form className={classes.FormContainer} onSubmit={handleSubmit}>
        {error ? (
          <div className={classes.ErrorMessage}>
            <p>{error}</p>
          </div>
        ) : (
          ""
        )}

        {loggedIn ? (
          <div className={classes.SuccessMessage}>
            <p>Successfully Logged In</p>
          </div>
        ) : (
          ""
        )}
        <div className={classes.InputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            required
          />
        </div>

        <div className={classes.InputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
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
          {loading ? <ButtonLoader /> : "Log In"}
        </button>
      </form>

      <div className={classes.BottomText}>
        <p>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default withRouter(Login);
