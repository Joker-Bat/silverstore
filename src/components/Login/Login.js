import React, { useState } from "react";

// Styles
import classes from "./Login.module.scss";

// React Router
import { Link } from "react-router-dom";

// Redux Toolkit
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/user/userSlice";

// Firebase
import { auth } from "../../firebase";

const Login = () => {
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = await auth.signInWithEmailAndPassword(
        emailInput,
        passwordInput
      );
      console.log(user);
      // dispatch(loginUser(user));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }

    // Clear Input Fields
    setEmailInput("");
    setPasswordInput("");
  };

  return (
    <div className={classes.LoginContainer}>
      {loading && <h1>Processing...</h1>}
      <form className={classes.FormContainer} onSubmit={handleSubmit}>
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

        <button type="submit">Log In</button>
      </form>

      <div className={classes.BottomText}>
        <p>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
